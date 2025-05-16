# Frontend Documentation

## Technology Stack

- React 18
- Vite
- TailwindCSS
- React Router DOM
- React Query

## Project Structure

```
frontend/
├── public/          # Static assets
│   ├── favicon/     # Favicon files
│   └── images/      # Image assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components
│   ├── hooks/       # Custom React hooks
│   ├── context/     # React context providers
│   ├── services/    # API services
│   ├── utils/       # Utility functions
│   ├── styles/      # Global styles
│   └── types/       # TypeScript type definitions
```

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

- `VITE_API_URL`: Backend API URL
- `VITE_GA_ID`: Google Analytics ID (optional)

3. Start development server:

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

## State Management

- React Query for server state
- Context API for application state
- Local storage for user preferences

## Testing

Run tests using:

```bash
npm test
```

## Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies

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

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
