# SCS Projects Portal

A centralized platform for managing and showcasing student projects from the Department of Statistics & Computer Science, University of Peradeniya.

## Quick Start

### Prerequisites

- Node.js (v18.16 or higher)
- npm (v9.5 or higher)
- Git

### Installation

1. Clone and Install Dependencies:

   ```bash
   git clone https://github.com/pdn-scs/projects.scs.pdn.ac.lk-monorepo.git
   cd projects.scs.pdn.ac.lk-monorepo
   npm run install:all
   ```

2. Environment Setup:

   ```bash
   # Setup frontend environment
   cd frontend
   cp .env.example .env

   # Setup backend environment
   cd ../backend
   cp .env.example .env
   ```

Required environment variables:

Frontend (.env):

- `VITE_API_URL` - Backend API URL (Default: <http://localhost:3000>)

Backend (.env):

- `PORT` - Server port (Default: 3000)
- `USE_LOCAL_DATA` - Use local JSON files (Default: false)
- `GITHUB_TOKEN` - GitHub Personal Access Token (Only if USE_LOCAL_DATA=false)

### Development

Start all services:

```bash
npm run dev
```

Or individual services:

```bash
npm run dev:frontend  # Frontend only
npm run dev:backend   # Backend only
```

Access your local instance:

- Frontend: <http://localhost:5173>
- Backend API: <http://localhost:3000>
- API Docs: <http://localhost:3000/docs>

## Documentation

- [Backend API Documentation](./backend/README.md)
- [Frontend Development](./frontend/README.md)
- [Data Structure](./data/README.md)

## License

MIT License - See [LICENSE](./LICENSE) file
