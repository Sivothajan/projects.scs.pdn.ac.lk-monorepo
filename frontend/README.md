# Frontend Documentation

## Technology Stack

- React with JavaScript
- Vite for build tooling
- Module CSS for styling
- React Router DOM for routing
- ESLint and Prettier for code quality

## Setup and Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Required environment variables:

- `VITE_API_URL`: Backend API URL (Default: https://api.projects.scs.pdn.ac.lk)

1. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Features

- Responsive design
- Dark/Light theme support
- Advanced search and filtering
- Project categorization
- Course-wise project views
- Student portfolios

## Component Documentation

### Page Components

- `Home.jsx`: Landing page with featured projects
- `Projects.jsx`: Project listing and search
- `ProjectDetail.jsx`: Individual project view
- `Courses.jsx`: Course listing page
- `About.jsx`: About page

### Reusable Components

- `Navbar.jsx`: Main navigation
- `ProjectCard.jsx`: Project preview card
- `SearchBar.jsx`: Search functionality
- `FilterPanel.jsx`: Advanced filtering
- `Pagination.jsx`: Page navigation

### Linting and Type Checking
```bash
# Run ESLint
npm run lint
```
## Deployment

The frontend is configured for Vercel deployment:

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
