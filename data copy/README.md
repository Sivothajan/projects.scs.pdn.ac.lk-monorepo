# Project Portal Data Structure

## File Structure

```
data/
├── v1/                  # Legacy data structure (flat JSON files)
└── v2/                  # Current data structure (hierarchical)
    ├── common/          # Shared resources
    ├── course/         # Course data
    ├── instructor/     # Instructor data
    ├── project/        # Project data
    └── student/        # Student data
```

## Schemas

### Project Structure (v2)

- Projects: `/v2/project/{department}/{year}/{category}/{courseCode}-{year}-{projectId}.json`
  - Example: `/v2/project/csc/2025/2000/csc2012-2025-002.json`

```json
{
  "id": "CSC2012-2025-002",
  "name": "Project Name",
  "courseCode": "CSC2012",
  "instructor": "instructor-username",
  "academicYear": 2025,
  "description": "Project description",
  "projectLink": "https://github.com/...",
  "coverImageUrl": "/images/...",
  "authors": [{ "name": "Full Name", "sNumber": "S12345" }]
}
```

### Data Validation Rules

- Project IDs: `{COURSECODE}-{YEAR}-{###}` (e.g., CSC2012-2025-002)
- Student IDs: `S{##}{###}` (batch number + sequence)
- Course codes: `{DEPT}{#}{###}` (e.g., CSC2012)
- File extensions must be lowercase (.json)
- Directory codes must be lowercase
- Year directories must be 4-digit format
- Category directories must be in thousands (1000, 2000, etc.)

## API Endpoints (v2)

- `GET /v2/courses` - List all courses
- `GET /v2/courses/{courseCode}` - Get course by code
- `GET /v2/projects/cc/{courseCode}` - Get projects by course
- `GET /v2/projects/id/{projectId}` - Get project by ID
- `GET /v2/student/{studentId}` - Get student details
- `GET /v2/instructor/{instructorId}` - Get instructor details

All endpoints return JSON with HTTP 200 for success or 4xx/5xx for errors.

## License

MIT License - see LICENSE file for details.
