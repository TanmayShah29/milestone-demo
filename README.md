# milestone-demo

A demo repository for [Milestone](https://github.com/TanmayShah29/milestone-ai-escrow): pay-on-proof escrow on PayPal.

How a funded pull request is checked:

1. The client and the worker sign a contract on Milestone. Its acceptance tests are locked by a SHA-256 fingerprint.
2. The worker opens a PR whose description contains `Milestone-Terms: <fingerprint>`.
3. The **milestone** workflow downloads the locked contract, checks its hash, writes the acceptance tests
   (overwriting anything the PR put in `acceptance/`), and runs one job per criterion: `acceptance (C1)`, `acceptance (C2)`, ...
4. Milestone reads those checks, has an AI review only the criteria code can't test, and fixed rules decide
   whether the PayPal hold is captured and the worker paid.
