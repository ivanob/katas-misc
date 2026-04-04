
# Bounded Contexts (DDD)
- coverage-analysis: Detects low-coverage TypeScript files and evaluates thresholds.
- improvements-jobs: Interacts with the AI CLI in isolation and produces candidate test files.
- delivery: delivers changes back to GitHub.


# API

```
POST /repos/analyze
POST /repos/improve
GET /jobs/:jobId or GET /repos/:repoId/status
```

### Requests / Responses

#### POST /repos/analyze

Request
```
{
  "repositoryUrl": "https://github.com/org/repo",
  "branch": "main",
  "coverageThreshold": 80
}
```

Response (Async)
```
{
  "repositoryId": "repo_123",
  "analysisJobId": "job_456",
  "status": "queued"
}
```

#### POST /repos/improve

Request
```
{
  "repositoryId": "repo_123",
  "filePath": "src/foo.ts"
}
```
Response
```
{
  "jobId": "job_789",
  "status": "queued"
}
```