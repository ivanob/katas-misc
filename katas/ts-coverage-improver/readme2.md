Assignment
Technical Task — TS Coverage Improver


Objective
Develop a NestJS service using Node.js and SQLite that automatically improves TypeScript test coverage in GitHub repositories by generating *.test.ts files via any AI CLI and submitting them as pull requests.



Requirements


Functional
The system should connect to a GitHub repository and analyze its existing test coverage to identify TypeScript files that need better test coverage (for example, those below 80%).

It should provide a clear and simple way to display this information, either through a command-line interface or a minimal web dashboard using React.js. The display should include each file’s coverage percentage, the progress of any ongoing improvements, and a link to the resulting pull request when available.

When a user requests to improve a file’s coverage, the system should automatically perform all necessary actions to create a proposed improvement. This includes preparing a copy of the repository, generating or enhancing the tests with an AI tool, and suggesting the changes back to GitHub as a pull request.

The improvement process should run in the background, allowing the user to check on its progress and see results once the process is complete.

Architecture & Design (DDD)
Follow Domain-Driven Design (DDD) principles:

Separate Domain, Application, and Infrastructure layers.

Keep business logic framework-independent.

Model entities, value objects, and domain services for coverage scanning and improvement jobs.

Non‑Functional
Security: isolate AI CLI runs; secure tokens and secrets.

Scalability: serialize jobs per repository.

Technical Stack
NestJS

React

Node.js

SQLite

Deliverables
Backend service implementing coverage parsing, AI CLI integration, job handling, and persistence (SQLite) with DDD layering.

Frontend application (CLI or minimal React.js dashboard) displaying each file’s coverage percentage, the progress of ongoing improvements, and a link to the resulting pull request when available.

Documentation: setup instructions, optional .env.example, step‑by‑step guide, and short domain glossary/diagram.

Evaluation Criteria
Correctness: meets all functional goals.

DDD Implementation: clear separation of layers, well-defined domain model.

Code Quality: modular, readable, maintainable.

GitHub Automation: successfully creates PRs with generated tests.

Reliability: resilient job handling and error recovery.

Tools & Assistance
AI POLICY - please read:
Our coding assessments are designed to simulate real-world engineering challenges at Kraken. We acknowledge the transparent use of generative AI tools, such as ChatGPT and Co-pilot however, we expect you to be able to discuss the technical decisions you make.

Clarifications
If any part of the task is unclear, the candidate may define their own assumptions or additional requirements, as long as the main objective remains clear — to improve coverage for third-party TypeScript repositories by generating meaningful automated tests.

Acceptance & Submission
Working demo showing:

Low-coverage file detection.

Test generation flow producing a PR.

Job progress and PR link output.

Candidates unable to complete all requirements must document encountered issues and proposed solutions.

Candidate should present their outcome and reasoning in a short demo session.

Submit via:

GitHub repo with backend/ folder, README.md, and at least one example PR showing improved coverage

Zip. file
