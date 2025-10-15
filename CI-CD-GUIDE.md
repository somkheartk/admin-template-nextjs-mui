# CI/CD and Testing Guide

This document provides comprehensive information about the CI/CD pipeline and testing infrastructure for the Warehouse Management System.

## Table of Contents

1. [Overview](#overview)
2. [CI/CD Workflows](#cicd-workflows)
3. [Environment Setup](#environment-setup)
4. [Testing Strategy](#testing-strategy)
5. [Deployment Process](#deployment-process)
6. [GitHub Secrets Configuration](#github-secrets-configuration)
7. [Docker Deployment](#docker-deployment)
8. [Monitoring and Health Checks](#monitoring-and-health-checks)

## Overview

The project implements a professional CI/CD pipeline with three distinct environments:

- **Development (dev)**: Automatic deployment from `develop` branch
- **UAT (uat)**: Automatic deployment from `uat` branch for user acceptance testing
- **Production (prod)**: Tag-based deployment with manual approval (v*.*.*)

## CI/CD Workflows

### 1. Continuous Integration (ci.yml)

**Triggers:**
- Push to `main`, `develop`, or `feature/**` branches
- Pull requests to `main` or `develop`

**Jobs:**
- **lint-and-test-frontend**: Lints and tests frontend code, builds the application
- **lint-and-test-backend**: Runs backend tests with MongoDB, builds the API
- **e2e-tests**: Runs end-to-end tests with Robot Framework (PR only)
- **security-scan**: Runs npm audit for security vulnerabilities

**Example:**
```bash
# Triggered automatically on push or PR
# View results in GitHub Actions tab
```

### 2. Development Deployment (deploy-dev.yml)

**Triggers:**
- Push to `develop` branch
- Manual workflow dispatch

**Process:**
1. Runs all tests
2. Builds Docker images
3. Pushes images to GitHub Container Registry
4. Tags: `develop`, `dev-{sha}`

**Docker Images:**
- `ghcr.io/{owner}/admin-template-nextjs-mui/frontend:dev-{sha}`
- `ghcr.io/{owner}/admin-template-nextjs-mui/backend:dev-{sha}`

### 3. UAT Deployment (deploy-uat.yml)

**Triggers:**
- Push to `uat` branch
- Manual workflow dispatch

**Process:**
1. Runs all tests
2. Builds Docker images
3. Pushes images to GitHub Container Registry
4. Tags: `uat`, `uat-{sha}`
5. Runs smoke tests
6. Sends notifications to stakeholders

### 4. Production Deployment (deploy-prod.yml)

**Triggers:**
- Git tags matching `v*.*.*` (e.g., v1.0.0)
- Manual workflow dispatch with tag input

**Process:**
1. Validates release tag format
2. Runs all tests
3. Builds Docker images
4. Pushes images with semantic versioning tags
5. Runs post-deployment tests
6. Creates GitHub Release
7. Sends notifications

**Tags:**
- `v1.0.0`, `1.0`, `1`, `latest`

## Environment Setup

### Required GitHub Secrets

Configure these secrets in GitHub Settings > Secrets and variables > Actions:

#### Development Environment
```
DEV_API_URL=https://api-dev.yourcompany.com/api
DEV_MONGODB_URI=mongodb://dev-mongodb:27017/warehouse-admin-dev
DEV_JWT_SECRET=your-dev-jwt-secret
```

#### UAT Environment
```
UAT_API_URL=https://api-uat.yourcompany.com/api
UAT_MONGODB_URI=mongodb://uat-mongodb:27017/warehouse-admin-uat
UAT_JWT_SECRET=your-uat-jwt-secret
```

#### Production Environment
```
PROD_API_URL=https://api.yourcompany.com/api
PROD_MONGODB_URI=mongodb://prod-mongodb:27017/warehouse-admin-prod
PROD_JWT_SECRET=your-prod-jwt-secret-STRONG-PASSWORD
```

### Environment Files

Three environment templates are provided:

1. **`.env.dev`** - Development configuration
2. **`.env.uat`** - UAT configuration
3. **`.env.prod`** - Production configuration

Copy and customize these files for your specific environment.

## Testing Strategy

### 1. Unit Tests

#### Frontend Tests (Jest + React Testing Library)

**Location:** `src/__tests__/`

**Run tests:**
```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report
```

**Example test:**
```typescript
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
  it('should render without crashing', () => {
    render(<Home />)
    expect(document.body).toBeInTheDocument()
  })
})
```

#### Backend Tests (Jest + NestJS Testing)

**Location:** `backend/src/**/*.spec.ts`

**Run tests:**
```bash
cd backend
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:cov         # With coverage report
```

**Example test:**
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

### 2. End-to-End Tests (Robot Framework with Selenium)

**Location:** `tests/robot/`

**Prerequisites:**
```bash
# Install Python dependencies
pip install -r requirements.txt
```

**Run tests:**
```bash
npm run test:e2e                    # Run E2E tests
npm run test:e2e:report             # Generate consolidated report
robot --outputdir test-results tests/robot  # Run with Robot Framework CLI directly
```

**Example test:**
```robot
*** Settings ***
Documentation     Homepage tests
Resource          resources/common.robot
Suite Setup       Open Application
Suite Teardown    Close Application

*** Test Cases ***
Should Load The Homepage
    [Documentation]    Verifies that the homepage loads successfully
    [Tags]    smoke    homepage
    Go To    ${BASE_URL}
    Wait For Page Load
    Location Should Contain    ${BASE_URL}
```

**View test results:**
- Open `test-results/report.html` in a browser for detailed test report
- Open `test-results/log.html` for detailed test execution log

### 3. Coverage Thresholds

Both frontend and backend enforce minimum coverage:
- **Branches:** 50%
- **Functions:** 50%
- **Lines:** 50%
- **Statements:** 50%

Adjust these thresholds in `jest.config.js` files as your project matures.

## Deployment Process

### Development Deployment

```bash
# 1. Create and push to develop branch
git checkout -b develop
git push origin develop

# 2. Deployment triggers automatically
# 3. Monitor in GitHub Actions tab
```

### UAT Deployment

```bash
# 1. Merge to uat branch
git checkout uat
git merge develop
git push origin uat

# 2. Deployment triggers automatically
# 3. Verify in UAT environment
```

### Production Deployment

```bash
# 1. Create a release tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# 2. Deployment triggers automatically
# 3. Monitor deployment
# 4. GitHub Release is created automatically
```

### Manual Deployment

You can also trigger deployments manually:

1. Go to Actions tab in GitHub
2. Select the desired workflow (deploy-dev, deploy-uat, or deploy-prod)
3. Click "Run workflow"
4. Select branch/tag
5. Click "Run workflow"

## Docker Deployment

### Local Development with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

Services:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001/api
- **MongoDB:** localhost:27017

### Building Individual Images

**Frontend:**
```bash
docker build -f Dockerfile.frontend -t warehouse-frontend .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:3001/api \
  warehouse-frontend
```

**Backend:**
```bash
cd backend
docker build -t warehouse-backend .
docker run -p 3001:3001 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/warehouse-admin \
  -e JWT_SECRET=your-secret \
  warehouse-backend
```

### Production Deployment

Pull and run the latest images:

```bash
# Pull images
docker pull ghcr.io/{owner}/admin-template-nextjs-mui/frontend:latest
docker pull ghcr.io/{owner}/admin-template-nextjs-mui/backend:latest

# Run with environment variables
docker run -d -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=$PROD_API_URL \
  ghcr.io/{owner}/admin-template-nextjs-mui/frontend:latest

docker run -d -p 3001:3001 \
  -e MONGODB_URI=$PROD_MONGODB_URI \
  -e JWT_SECRET=$PROD_JWT_SECRET \
  -e NODE_ENV=production \
  ghcr.io/{owner}/admin-template-nextjs-mui/backend:latest
```

## Monitoring and Health Checks

### Backend Health Endpoint

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-15T09:41:15.103Z",
  "uptime": 123.456,
  "database": {
    "status": "connected",
    "name": "warehouse-admin"
  },
  "environment": "production"
}
```

**Check health:**
```bash
curl http://localhost:3001/api/health
```

### Docker Health Checks

The backend Dockerfile includes health checks:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', ...)"
```

**Check container health:**
```bash
docker ps
# Look for "healthy" status
```

### Monitoring Best Practices

1. **Set up monitoring alerts** for health endpoint failures
2. **Track deployment metrics**: success rate, deployment time
3. **Monitor application metrics**: response time, error rate
4. **Database monitoring**: connection pool, query performance
5. **Log aggregation**: Use ELK stack, Datadog, or CloudWatch

## Continuous Improvement

### Adding New Tests

1. **Unit tests:** Add `*.spec.ts` or `*.test.tsx` files
2. **E2E tests:** Add files to `tests/e2e/`
3. Run locally before committing
4. Ensure tests pass in CI

### Updating Workflows

1. Edit workflow files in `.github/workflows/`
2. Test changes on feature branch
3. Review workflow runs in Actions tab
4. Merge when validated

### Deployment Target Configuration

Uncomment and configure deployment steps in workflow files:

```yaml
- name: Deploy to Production Environment
  environment: production
  run: |
    # Add your deployment commands here
    # kubectl apply -f k8s/
    # ssh user@server 'docker-compose pull && docker-compose up -d'
```

## Troubleshooting

### CI Pipeline Failures

1. **Check workflow logs** in Actions tab
2. **Run tests locally** to reproduce
3. **Verify environment variables** in GitHub Secrets
4. **Check Docker image builds** locally

### Deployment Issues

1. **Verify secrets are configured** correctly
2. **Check container registry access**
3. **Review deployment logs**
4. **Test health endpoint** after deployment

### Test Failures

1. **Run tests locally** with same environment
2. **Check test database** connectivity
3. **Review test coverage** reports
4. **Update snapshots** if needed

## Support

For issues or questions:
- Check GitHub Issues
- Review workflow logs
- Contact DevOps team
- See README.md for general documentation

---

**Last Updated:** 2025-10-15
**Version:** 1.0.0
