# Quick Start - CI/CD Pipeline

This guide helps you get started with the CI/CD pipeline quickly.

## Prerequisites

- Git installed
- GitHub account with push access to the repository
- Docker installed (for local testing)
- Node.js 18+ installed

## 🚀 Quick Start

### 1. Test Locally First

Before pushing to any branch, test everything locally:

```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Run tests
npm test                    # Frontend tests
cd backend && npm test      # Backend tests

# Build to ensure no errors
npm run build
cd backend && npm run build
```

### 2. Test with Docker Compose

```bash
# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f

# Test health endpoint
curl http://localhost:3001/api/health

# Stop services
docker-compose down
```

### 3. Push to Development

```bash
# Create/switch to develop branch
git checkout -b develop

# Push your changes
git push origin develop
```

**What happens:**
- ✅ CI tests run automatically
- ✅ If tests pass, Docker images are built
- ✅ Images are pushed to GitHub Container Registry
- ✅ Ready for deployment to dev environment

### 4. Promote to UAT

```bash
# Merge to UAT branch
git checkout uat
git merge develop
git push origin uat
```

**What happens:**
- ✅ Full test suite runs
- ✅ Docker images built and tagged for UAT
- ✅ Smoke tests run
- ✅ Stakeholders notified

### 5. Release to Production

```bash
# Create a release tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

**What happens:**
- ✅ Release validation
- ✅ Complete test suite
- ✅ Docker images with semantic versioning
- ✅ Post-deployment tests
- ✅ GitHub Release created automatically

## 📋 GitHub Secrets Setup

Before deployment works, configure these secrets in GitHub:

**Go to:** Repository Settings → Secrets and variables → Actions → New repository secret

### For Development:
```
DEV_API_URL=https://api-dev.yourcompany.com/api
DEV_MONGODB_URI=mongodb://dev-mongodb:27017/warehouse-admin-dev
DEV_JWT_SECRET=your-dev-secret-here
```

### For UAT:
```
UAT_API_URL=https://api-uat.yourcompany.com/api
UAT_MONGODB_URI=mongodb://uat-mongodb:27017/warehouse-admin-uat
UAT_JWT_SECRET=your-uat-secret-here
```

### For Production:
```
PROD_API_URL=https://api.yourcompany.com/api
PROD_MONGODB_URI=mongodb://prod-mongodb:27017/warehouse-admin-prod
PROD_JWT_SECRET=your-very-strong-prod-secret
```

## 🔍 Monitoring Workflow Runs

1. Go to your GitHub repository
2. Click "Actions" tab
3. See all workflow runs
4. Click on any run to see details
5. Click on jobs to see logs

## 🐛 Common Issues and Solutions

### Issue: Tests Fail in CI but Pass Locally

**Solution:**
```bash
# Clear caches and reinstall
rm -rf node_modules package-lock.json
rm -rf backend/node_modules backend/package-lock.json
npm install
cd backend && npm install
```

### Issue: Docker Build Fails

**Solution:**
```bash
# Test Docker build locally
docker build -f Dockerfile.frontend -t test-frontend .
docker build -f backend/Dockerfile -t test-backend ./backend

# Check logs
docker logs <container-id>
```

### Issue: Environment Variables Not Set

**Solution:**
- Verify secrets are configured in GitHub Settings
- Check secret names match exactly
- Secrets are case-sensitive

### Issue: Deployment Not Triggering

**Solution:**
- Ensure you're pushing to the correct branch
- Check workflow file triggers
- Verify branch protection rules

## 📊 Workflow Status Badges

Add these to your README to show build status:

```markdown
![CI](https://github.com/somkheartk/admin-template-nextjs-mui/workflows/CI%20-%20Build%20and%20Test/badge.svg)
![Deploy Dev](https://github.com/somkheartk/admin-template-nextjs-mui/workflows/Deploy%20to%20Development/badge.svg)
```

## 🎯 Best Practices

### 1. Branch Strategy
```
main (protected)
  └── develop (auto-deploy to dev)
       └── feature/new-feature
       └── feature/another-feature
  
  uat (auto-deploy to uat)
  
  tags: v1.0.0, v1.1.0 (prod deployment)
```

### 2. Commit Messages
```bash
# Good commit messages
git commit -m "Add user authentication feature"
git commit -m "Fix: Resolve login timeout issue"
git commit -m "Update: Improve dashboard performance"

# Bad commit messages
git commit -m "update"
git commit -m "fix stuff"
git commit -m "WIP"
```

### 3. Testing Before Push
```bash
# Always run before pushing
npm test && cd backend && npm test && cd ..
npm run lint
```

### 4. Pull Request Process
1. Create feature branch from `develop`
2. Make changes
3. Run tests locally
4. Push and create PR
5. Wait for CI checks
6. Request review
7. Merge after approval

## 🔄 Rollback Strategy

### If Production Deployment Fails:

1. **Quick Rollback:**
   ```bash
   # Deploy previous version
   git tag -a v1.0.1 -m "Rollback to v1.0.0"
   git push origin v1.0.1
   ```

2. **Using Docker:**
   ```bash
   # Pull previous version
   docker pull ghcr.io/{owner}/admin-template-nextjs-mui/backend:v1.0.0
   docker pull ghcr.io/{owner}/admin-template-nextjs-mui/frontend:v1.0.0
   
   # Deploy previous images
   # (deployment commands depend on your infrastructure)
   ```

## 📚 Additional Resources

- **Full Documentation:** [CI-CD-GUIDE.md](./CI-CD-GUIDE.md)
- **Architecture:** [CI-CD-ARCHITECTURE.md](./CI-CD-ARCHITECTURE.md)
- **Implementation Details:** [IMPLEMENTATION-SUMMARY.md](./IMPLEMENTATION-SUMMARY.md)
- **Main README:** [README.md](./README.md)

## 🆘 Getting Help

If you encounter issues:

1. Check the workflow logs in GitHub Actions
2. Review the documentation files
3. Test locally with Docker Compose
4. Check GitHub Issues
5. Contact the DevOps team

## ✅ Checklist for First Deployment

- [ ] All tests passing locally
- [ ] Docker Compose works locally
- [ ] GitHub secrets configured
- [ ] Branch strategy understood
- [ ] Created `develop` branch
- [ ] First push to develop successful
- [ ] CI workflow passed
- [ ] Docker images in registry
- [ ] Health endpoint responds
- [ ] Documentation reviewed

## 🎉 You're Ready!

Your CI/CD pipeline is now ready to use. Start by pushing to the `develop` branch and watch the magic happen!

```bash
git checkout -b develop
git push origin develop
```

Happy deploying! 🚀
