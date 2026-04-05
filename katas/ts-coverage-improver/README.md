
# Bounded Contexts (DDD)
- coverage-analysis: Detects low-coverage TypeScript files and evaluates thresholds.
- improvements-jobs: Interacts with the AI CLI in isolation and produces candidate test files.
- repos: handles github repos:
  - reads files
  - delivers changes back to GitHub.


# API

```
POST /repos/analyze
POST /repos/improve
GET /repos/:repoID/analyze/:jobID
GET /repos/:repoID/improve/:jobID
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

#### GET /repos/:repoID/analyze/:jobID

Response
```
{
  "status: "READY",
  "files": [
    {
      "path": "...",
      "coverage": 30
    },
    {
      "path": "...",
      "coverage": 40
    },
    ...
  ]
}
```

```
{
  "status: "WORKING",
  "files": []
}
```

#### GET /repos/:repoID/improve/:jobID

Response
```
{
  "status": "READY",
  "pr": "url-of-PR"
}
```