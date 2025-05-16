# Backend Documentation

## Technology Stack
- Node.js
- Express.js
- MongoDB
- Vercel (Deployment)

## Project Structure
```
backend/
├── api/              # API routes and controllers
├── config/           # Configuration files
├── middleware/       # Custom middleware
├── models/          # Database models
├── services/        # Business logic
└── utils/           # Utility functions
```

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Development Setup
1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Required environment variables:
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)

3. Start development server:
```bash
npm run dev
```

## API Documentation

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://api.projects.scs.pdn.ac.lk`

### Available Endpoints

#### Projects
- `GET /projects` - List all projects
- `GET /projects/:id` - Get project by ID
- `POST /projects` - Create new project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

#### Courses
- `GET /courses` - List all courses
- `GET /courses/:code` - Get course by code

#### Students
- `GET /students` - List all students
- `GET /students/:id` - Get student by ID

### Response Format
```json
{
  "status": "success|error",
  "data": {},
  "message": "Optional message"
}
```

## Error Handling
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Testing
Run tests using:
```bash
npm test
```

## Deployment
The backend is configured for deployment on Vercel:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

## Security
- CORS protection
- Rate limiting
- Request validation
- Security headers
- Environment variable protection

## Maintenance
- Regular dependency updates
- Security patches
- Performance monitoring
- Error logging

## License
This project is licensed under the MIT License - see the LICENSE file for details.
