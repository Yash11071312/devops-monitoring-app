# DevOps Monitoring App

A simple Node.js application containerized using Docker, automated using GitHub Actions, and deployed on Render.

## 1. Project Overview

This project demonstrates basic DevOps practices:

- Docker containerization
- Environment variables
- Docker image creation
- GitHub version control
- GitHub Actions CI pipeline
- Cloud deployment using Render
- Application logging
- Crash simulation and recovery

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Application runtime |
| Express.js | Web framework |
| Docker | Containerization |
| Git | Version control |
| GitHub | Code repository |
| GitHub Actions | CI automation |
| Render | Cloud deployment |

## 3. Project Structure

```text
devops-monitoring-app/
├── .github/
│   └── workflows/
│       └── docker-build.yml
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── server.js
```

## 4. Dockerization

A Dockerfile was created to package the application and its dependencies.

Docker builds an image using the Dockerfile, and a container is created from that image.

### Build the image

```bash
docker build -t devops-monitoring-app .
```

### Run the container

```bash
docker run -d -p 3000:3000 --name devops-app devops-monitoring-app
```

### Check running containers

```bash
docker ps
```

### Stop the container

```bash
docker stop devops-app
```

### Start the container

```bash
docker start devops-app
```

## 5. Environment Variables

Environment variables are used to separate application configuration from source code.

Examples:

- APP_NAME
- PORT
- NODE_ENV

The application accesses these variables through `process.env`.

The `.env` file is excluded from Git and Docker using `.gitignore` and `.dockerignore`.

## 6. Application Endpoints

| Endpoint | Description |
|---|---|
| `/` | Displays the application homepage |
| `/health` | Displays application health information |
| `/info` | Displays application configuration information |
| `/crash` | Simulates an application crash |

## 7. Logging

Docker collects the application's standard output and error streams.

### View container logs

```bash
docker logs devops-app
```

### Continuously monitor logs

```bash
docker logs -f devops-app
```

Logs help identify errors, application activity, and potential issues.

## 8. Crash Simulation

The `/crash` endpoint was created to deliberately terminate the Node.js process.

The application uses:

```javascript
process.exit(1);
```

Exit code `1` indicates abnormal termination.

### Identify stopped containers

```bash
docker ps -a
```

### Investigate the failure

```bash
docker logs devops-app
```

### Restart the container manually

```bash
docker start devops-app
```

## 9. Docker Restart Policies

Docker supports restart policies to automatically restart containers under certain conditions.

| Policy | Description |
|---|---|
| `no` | No automatic restart |
| `on-failure` | Restart when the container exits with a failure |
| `always` | Restart whenever it stops |
| `unless-stopped` | Restart automatically unless manually stopped |

The `unless-stopped` policy was tested.

Example:

```bash
docker run -d -p 3000:3000 --name devops-app --restart unless-stopped devops-monitoring-app
```

Restart policies help improve availability, but they do not replace application health monitoring.

## 10. GitHub Actions

A GitHub Actions workflow was created to automate Docker build validation.

The workflow is triggered when code is pushed to the `main` branch or when a pull request targets `main`.

Workflow steps:

1. Checkout the repository.
2. Build the Docker image.
3. Verify whether the build succeeds.

A successful workflow execution confirms that the Docker image can be built using the committed source code and Dockerfile.

## 11. Cloud Deployment

The application was deployed to Render using the Docker runtime.

Deployment process:

1. Connect the GitHub repository to Render.
2. Configure the service to use Docker.
3. Configure environment variables.
4. Build the Docker image.
5. Start the application.
6. Verify that the public application URL is accessible.

## 12. Troubleshooting

### Application is inaccessible

Possible causes:

- Container is stopped.
- Application crashed.
- Incorrect port mapping.
- Deployment failure.

Commands:

```bash
docker ps -a
docker logs devops-app
```

### Container has stopped

Restart it:

```bash
docker start devops-app
```

### Docker build failure

Review the build output and check:

- Dockerfile syntax.
- Dependency installation.
- Files being copied.
- Docker availability.

### Application crashes

1. Inspect container status.
2. Review application logs.
3. Identify the error.
4. Correct the application or configuration.
5. Restart the container.
6. Verify that the application is working.

### Cloud deployment failure

Check the deployment and runtime logs in Render.

Investigate:

- Build errors.
- Missing environment variables.
- Application startup errors.
- Port configuration.

## 13. Deployment Verification

The deployed application was verified using its public URL.

The following endpoints were tested:

- Homepage
- Health endpoint
- Information endpoint

Successful access confirms that the application is deployed and accessible.

## 14. Conclusion

This project demonstrates a basic DevOps lifecycle by containerizing a Node.js application, managing source code through GitHub, automating Docker build validation using GitHub Actions, deploying the application on Render, and exploring logging, crash simulation, and container recovery.