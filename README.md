# Department of Computer Science Projects Portal

## Overview
A centralized platform for managing and showcasing student projects from the Department of Computer Science, University of Peradeniya.

## Repository Structure
```
.
├── backend/     # Node.js/Express backend application
├── data/        # Project data storage (JSON)
└── frontend/    # React/Vite frontend application
```

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cepdnaclk/projects.scs.pdn.ac.lk-monorepo.git
cd projects.scs.pdn.ac.lk-monorepo
```

2. Install all dependencies (backend, frontend, and root):
```bash
npm run install:all
```

3. Environment Setup:
- Copy `.env.example` to `.env` in both frontend and backend directories
- Configure the environment variables as needed

4. Start Development Servers:

To start both frontend and backend servers simultaneously:
```bash
npm run dev
```

Alternatively, you can start servers individually:
- Backend only: `npm run dev:backend`
- Frontend only: `npm run dev:frontend`

## Features
- Project showcase and management
- Course information management
- Student project portfolio
- Search and filter capabilities
- Responsive design

## Documentation
- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Data Structure Documentation](./data/README.md)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
