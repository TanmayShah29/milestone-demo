# milestone-demo

A demo repository for [Milestone](https://github.com/TanmayShah29/milestone-ai-escrow): pay-on-proof escrow on PayPal.

How a funded pull request is checked:

1. The client and the worker sign a contract on Milestone. Its acceptance tests are locked by a SHA-256 fingerprint.
2. The worker opens a PR whose description contains `Milestone-Terms: <fingerprint>`.
3. The **milestone** workflow downloads the locked contract, checks its hash, writes the acceptance tests
   (overwriting anything the PR put in `acceptance/`), and runs one job per criterion: `acceptance (C1) terms <fingerprint>`, ...
   The fingerprint in the job name lets Milestone check that CI ran the signed contract, not some other one.
   The PR description must cite exactly one fingerprint.
   Tests run through `.github/milestone/run-tests.mjs` (from the base branch), which fails the job unless every
   signed test actually ran and passed: code that exits the process early, or stubs out `node:assert`, fails.
4. Milestone reads those checks, has an AI review only the criteria code can't test, and fixed rules decide
   whether the PayPal hold is captured and the worker paid.

## wordCount

`src/wordcount.ts` exports `wordCount(text: string): number`, which counts the words in a string.

Words are separated by any whitespace (spaces, tabs, newlines). Leading and trailing whitespace is
ignored, empty or whitespace-only input returns `0`, and a hyphenated word counts as one word.

```ts
import { wordCount } from "./src/wordcount.ts";

wordCount("A well-known\texample\n"); // 3
wordCount("   ");                     // 0
```
