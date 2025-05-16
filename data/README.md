# Data Structure Documentation

## Overview

This directory contains the structured data files for the Projects Portal, storing information about courses, projects, students, and instructors in JSON format.

## File Structure

```
data/
├── courses.json     # Course information
├── instructors.json # Instructor details
├── projects.json    # Project details
└── students.json    # Student information
```

## Data Schemas

### projects.json

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "course": "string",
  "year": "number",
  "semester": "number",
  "batch": "string",
  "tags": ["string"],
  "github": "string",
  "demo": "string",
  "image": "string",
  "team": ["string"],
  "supervisors": ["string"],
  "status": "string"
}
```

### courses.json

```json
{
  "code": "string",
  "name": "string",
  "description": "string",
  "credits": "number",
  "semester": "number",
  "department": "string"
}
```

### students.json

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "batch": "string",
  "department": "string",
  "projects": ["string"]
}
```

### instructors.json

```json
{
  "id": "string",
  "name": "string",
  "title": "string",
  "email": "string",
  "department": "string",
  "projects": ["string"]
}
```

## Data Management Guidelines

### Adding New Data

1. Follow the schema structures defined above
2. Ensure all required fields are filled
3. Validate JSON syntax before committing
4. Use UTF-8 encoding

### Updating Existing Data

1. Maintain data consistency across related files
2. Update related references when modifying IDs
3. Keep historical data for completed projects

### Data Validation

- All JSON files must be valid
- Required fields cannot be null/empty
- IDs must be unique
- References must exist
- Dates should follow ISO 8601 format

### Backup Procedures

1. Regular automated backups
2. Version control through Git
3. Backup validation checks

## Tools and Scripts

- JSON validators
- Data migration scripts
- Backup utilities
- Schema validation tools

## Best Practices

1. Keep data normalized
2. Maintain consistent formatting
3. Use descriptive IDs
4. Include relevant metadata
5. Document any special cases

## Data Privacy

- No sensitive personal information
- Follow university data policies
- Comply with privacy regulations

## License

This data is licensed under the MIT License - see the LICENSE file for details.
