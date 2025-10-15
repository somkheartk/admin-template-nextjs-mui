# CI/CD Pipeline Architecture

## Pipeline Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Developer Workflow                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
            ┌──────────────┐ ┌──────────┐ ┌──────────────┐
            │ Push/PR to   │ │ Push to  │ │   Create     │
            │ main/develop │ │ develop  │ │   Git Tag    │
            │   /feature   │ │  branch  │ │   v*.*.*     │
            └──────────────┘ └──────────┘ └──────────────┘
                    │               │               │
                    ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Continuous Integration (CI)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────────┐   │
│  │ Frontend Workflow   │  │ Backend Workflow    │  │  E2E Tests       │   │
│  │                     │  │                     │  │                  │   │
│  │ • Install deps      │  │ • Install deps      │  │ • Start MongoDB  │   │
│  │ • Run ESLint        │  │ • Start MongoDB     │  │ • Start Backend  │   │
│  │ • Run unit tests    │  │ • Run unit tests    │  │ • Start Frontend │   │
│  │ • Build Next.js     │  │ • Build NestJS      │  │ • Run Playwright │   │
│  │ • Upload artifacts  │  │ • Upload artifacts  │  │ • Upload results │   │
│  └─────────────────────┘  └─────────────────────┘  └──────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      Security Scanning                               │   │
│  │  • npm audit (Frontend) • npm audit (Backend)                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Environment Deployments                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │   Development    │  │       UAT        │  │      Production           │ │
│  │                  │  │                  │  │                           │ │
│  │ Trigger:         │  │ Trigger:         │  │ Trigger:                  │ │
│  │ • Push to develop│  │ • Push to uat    │  │ • Git tag v*.*.*          │ │
│  │ • Manual         │  │ • Manual         │  │ • Manual (with approval)  │ │
│  │                  │  │                  │  │                           │ │
│  │ Process:         │  │ Process:         │  │ Process:                  │ │
│  │ 1. Run tests     │  │ 1. Run tests     │  │ 1. Validate release tag   │ │
│  │ 2. Build images  │  │ 2. Build images  │  │ 2. Run tests              │ │
│  │ 3. Push to GHCR  │  │ 3. Push to GHCR  │  │ 3. Build images           │ │
│  │ 4. Deploy        │  │ 4. Deploy        │  │ 4. Push to GHCR           │ │
│  │                  │  │ 5. Smoke tests   │  │ 5. Deploy                 │ │
│  │                  │  │ 6. Notify        │  │ 6. Post-deploy tests      │ │
│  │                  │  │                  │  │ 7. Create GitHub Release  │ │
│  │                  │  │                  │  │ 8. Notify stakeholders    │ │
│  │                  │  │                  │  │                           │ │
│  │ Tags:            │  │ Tags:            │  │ Tags:                     │ │
│  │ • develop        │  │ • uat            │  │ • v1.0.0                  │ │
│  │ • dev-{sha}      │  │ • uat-{sha}      │  │ • 1.0, 1, latest          │ │
│  └──────────────────┘  └──────────────────┘  └──────────────────────────┘ │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Container Registry                                  │
│                   GitHub Container Registry (ghcr.io)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Frontend Images:                                                            │
│  • ghcr.io/{owner}/admin-template-nextjs-mui/frontend:dev-{sha}            │
│  • ghcr.io/{owner}/admin-template-nextjs-mui/frontend:uat-{sha}            │
│  • ghcr.io/{owner}/admin-template-nextjs-mui/frontend:v1.0.0               │
│                                                                               │
│  Backend Images:                                                             │
│  • ghcr.io/{owner}/admin-template-nextjs-mui/backend:dev-{sha}             │
│  • ghcr.io/{owner}/admin-template-nextjs-mui/backend:uat-{sha}             │
│  • ghcr.io/{owner}/admin-template-nextjs-mui/backend:v1.0.0                │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Deployment Targets                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐   │
│  │  Kubernetes  │  │    Docker    │  │   Cloud Run  │  │    VM/VPS   │   │
│  │              │  │   Swarm      │  │              │  │             │   │
│  │  • kubectl   │  │  • docker    │  │  • gcloud    │  │  • docker   │   │
│  │    deploy    │  │    stack     │  │              │  │    pull     │   │
│  │              │  │    deploy    │  │              │  │  • docker   │   │
│  │              │  │              │  │              │  │    run      │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────┘   │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Testing Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Testing Pyramid                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│                              ┌─────────────┐                                 │
│                              │   E2E Tests │                                 │
│                              │  Playwright │                                 │
│                              │   Slowest   │                                 │
│                              └─────────────┘                                 │
│                         ┌───────────────────────┐                            │
│                         │  Integration Tests    │                            │
│                         │   API Tests (Future)  │                            │
│                         │      Moderate         │                            │
│                         └───────────────────────┘                            │
│                  ┌────────────────────────────────────┐                      │
│                  │         Unit Tests                 │                      │
│                  │  Jest + React Testing Library      │                      │
│                  │  Jest + NestJS Testing             │                      │
│                  │         Fastest & Most             │                      │
│                  └────────────────────────────────────┘                      │
│                                                                               │
│  Frontend Unit Tests:                                                        │
│  • Component rendering                                                       │
│  • User interactions                                                         │
│  • State management                                                          │
│  • Utility functions                                                         │
│                                                                               │
│  Backend Unit Tests:                                                         │
│  • Service logic                                                             │
│  • Controller endpoints                                                      │
│  • Data validation                                                           │
│  • Authentication/Authorization                                              │
│                                                                               │
│  E2E Tests:                                                                  │
│  • User workflows                                                            │
│  • Cross-browser compatibility                                               │
│  • Responsive design                                                         │
│  • Critical user journeys                                                    │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Environment Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Environment Promotion Flow                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Feature Branch                                                              │
│       │                                                                       │
│       │ (PR + CI checks)                                                     │
│       ▼                                                                       │
│  ┌──────────────┐                                                            │
│  │  Development │  ◄─── Auto-deploy on merge to develop                     │
│  │     (dev)    │       • Fast iteration                                     │
│  │              │       • Latest features                                    │
│  └──────────────┘       • May be unstable                                    │
│       │                                                                       │
│       │ (Testing + Validation)                                               │
│       ▼                                                                       │
│  ┌──────────────┐                                                            │
│  │     UAT      │  ◄─── Promoted from dev after testing                     │
│  │  (Staging)   │       • User acceptance testing                            │
│  │              │       • Pre-production validation                          │
│  └──────────────┘       • Stable features                                    │
│       │                                                                       │
│       │ (Approval + Tag)                                                     │
│       ▼                                                                       │
│  ┌──────────────┐                                                            │
│  │  Production  │  ◄─── Tag-based release (v1.0.0)                          │
│  │    (prod)    │       • Manual approval                                    │
│  │              │       • Full testing                                       │
│  └──────────────┘       • Versioned releases                                 │
│                         • Rollback capability                                │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Local Development

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Local Development Setup                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Option 1: Docker Compose (Recommended)                                      │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  $ docker-compose up -d                                             │    │
│  │                                                                      │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │    │
│  │  │  MongoDB    │  │   Backend   │  │  Frontend   │                │    │
│  │  │  :27017     │  │   :3001     │  │   :3000     │                │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │    │
│  │         │                 │                 │                       │    │
│  │         └─────────────────┴─────────────────┘                       │    │
│  │                  warehouse-network                                  │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  Option 2: Traditional Setup                                                 │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  Terminal 1:                                                        │    │
│  │  $ mongod                                                           │    │
│  │                                                                      │    │
│  │  Terminal 2:                                                        │    │
│  │  $ cd backend && npm run start:dev                                 │    │
│  │                                                                      │    │
│  │  Terminal 3:                                                        │    │
│  │  $ npm run dev                                                      │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  Testing:                                                                    │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  $ npm test              # Frontend unit tests                     │    │
│  │  $ cd backend && npm test # Backend unit tests                     │    │
│  │  $ npm run test:e2e      # End-to-end tests                        │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Monitoring and Health Checks

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Health Monitoring                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Backend Health Endpoint: /api/health                                        │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  GET http://localhost:3001/api/health                               │    │
│  │                                                                      │    │
│  │  Response:                                                          │    │
│  │  {                                                                  │    │
│  │    "status": "healthy",                                            │    │
│  │    "timestamp": "2025-10-15T09:41:15.103Z",                        │    │
│  │    "uptime": 123.456,                                              │    │
│  │    "database": {                                                   │    │
│  │      "status": "connected",                                        │    │
│  │      "name": "warehouse-admin"                                     │    │
│  │    },                                                              │    │
│  │    "environment": "production"                                     │    │
│  │  }                                                                 │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  Docker Health Checks:                                                       │
│  • Backend: HTTP check on /api/health every 30s                             │
│  • MongoDB: mongosh ping every 10s                                           │
│  • Frontend: None (proxies to backend for health)                            │
│                                                                               │
│  Monitoring Integration:                                                     │
│  • Prometheus/Grafana                                                        │
│  • CloudWatch                                                                │
│  • Datadog                                                                   │
│  • Custom monitoring solutions                                               │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```
