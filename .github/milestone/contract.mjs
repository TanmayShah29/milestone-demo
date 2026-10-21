// Fetches the signed contract for the fingerprint in the PR body, verifies its SHA-256, and either prints
// the criteria matrix (`matrix`) or writes one criterion's acceptance test (`write <id>`).
// Runs from the base branch's copy of this file (see the workflow), so a PR can't change it.
import { createHash } from "node:crypto";
import { appendFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const api = process.env.MILESTONE_API;
const hash = (/Milestone-Terms:\s*([0-9a-f]{64})/.exec(process.env.PR_BODY ?? "") ?? [])[1];
if (!hash) {
  console.error("No `Milestone-Terms: <sha256>` line in the PR description.");
  process.exit(1);
}

let res;
for (let i = 0; i < 12; i++) {
  // The demo API sleeps when idle; give it time to wake up.
  res = await fetch(`${api}/api/contracts/${hash}`).catch(() => undefined);
  if (res?.ok || res?.status === 404) break;
  await new Promise((r) => setTimeout(r, 15_000));
}
if (!res?.ok) {
  console.error(`Contract ${hash} not found (${res?.status ?? "no response"}).`);
  process.exit(1);
}
const { document } = await res.json();
if (createHash("sha256").update(document).digest("hex") !== hash) {
  console.error("Contract hash mismatch: refusing to run unverified tests.");
  process.exit(1);
}
const contract = JSON.parse(document);
const tested = contract.criteria.filter((c) => c.test);

const [cmd, id] = process.argv.slice(2);
if (cmd === "matrix") {
  appendFileSync(process.env.GITHUB_OUTPUT, `matrix=${JSON.stringify(tested.map((c) => c.id))}\n`);
  console.log(`Contract ${hash.slice(0, 12)}: ${tested.length} tested criteria.`);
} else if (cmd === "write") {
  const c = tested.find((x) => x.id === id);
  if (!c || !/^acceptance\/[\w.-]+\.test\.(ts|js|mjs)$/.test(c.test.path)) process.exit(1);
  rmSync("acceptance", { recursive: true, force: true }); // the signed tests win over anything in the PR
  mkdirSync(dirname(c.test.path), { recursive: true });
  writeFileSync(c.test.path, c.test.code);
  appendFileSync(process.env.GITHUB_OUTPUT, `path=${c.test.path}\n`);
  console.log(`${c.id}: ${c.text}`);
}
