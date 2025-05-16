import styles from './Documentation.module.css';

function Documentation() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Documentation</h1>
            <p className={styles.description}>
                Welcome to the comprehensive documentation for the SCS Projects Portal. This guide provides detailed information about the project structure, setup procedures, and usage guidelines.
            </p>
            
            <h2 className={styles.subtitle}>Table of Contents</h2>
            <ul className={styles.list}>
                <li><a href="#introduction" className={styles.link}>Introduction</a></li>
                <li><a href="#installation" className={styles.link}>Installation</a></li>
                <li><a href="#development" className={styles.link}>Development</a></li>
                <li><a href="#api-documentation" className={styles.link}>API Documentation</a></li>
                <li><a href="#testing" className={styles.link}>Testing</a></li>
                <li><a href="#contributing" className={styles.link}>Contributing</a></li>
                <li><a href="#license" className={styles.link}>License</a></li>
            </ul>

            <h2 id="introduction" className={styles.subtitle}>Introduction</h2>
            <p className={styles.text}>
                The SCS Projects Portal is a comprehensive platform designed for the Department of Statistics & Computer Science, 
                Faculty of Science, University of Peradeniya. It serves as a central hub for student projects, 
                facilitating collaboration, documentation, and showcase of academic work in statistics and computer science.
                The platform consists of a React-based frontend and a Node.js backend, providing a modern and scalable architecture.
            </p>

            <h2 id="installation" className={styles.subtitle}>Installation</h2>
            <p className={styles.text}>Follow these steps to set up the project locally:</p>
            <h3 className={styles.subsubtitle}>Prerequisites</h3>
            <ul className={styles.list}>
                <li>Node.js (v18 or higher)</li>
                <li>npm (v9 or higher)</li>
                <li>Git</li>
            </ul>
            <h3 className={styles.subsubtitle}>Setup Steps</h3>
            <ol className={styles.orderedList}>
                <li>Clone the repository:
                    <code className={styles.code}>git clone https://github.com/Sivothajan/projects.scs.pdn.ac.lk.git</code>
                </li>
                <li>Navigate to the project directory:
                    <code className={styles.code}>cd projects.scs.pdn.ac.lk</code>
                </li>
                <li>Install root dependencies:
                    <code className={styles.code}>npm install</code>
                </li>
                <li>Setup frontend:
                    <code className={styles.code}>cd frontend && npm install</code>
                </li>
                <li>Setup backend:
                    <code className={styles.code}>cd ../backend && npm install</code>
                </li>
                <li>Create environment files:
                    <code className={styles.code}>cp .env.example .env</code>
                </li>
            </ol>

            <h3 className={styles.subsubtitle}>Environment Variables</h3>
            <div className={styles.apiEndpoints}>
                <h4 className={styles.envTitle}>Frontend Environment Variables (.env)</h4>
                <ul className={styles.list}>
                    <li>
                        <code className={styles.code}>VITE_API_URL</code>
                        <span className={styles.envDescription}>Base URL for backend API (Default: http://localhost:3000)</span>
                    </li>
                    <li>
                        <code className={styles.code}>VITE_GITHUB_CLIENT_ID</code>
                        <span className={styles.envDescription}>GitHub OAuth client ID (Required)</span>
                    </li>
                    <li>
                        <code className={styles.code}>VITE_PUBLIC_URL</code>
                        <span className={styles.envDescription}>Public URL of the frontend (Default: http://localhost:5173)</span>
                    </li>
                </ul>

                <h4 className={styles.envTitle}>Backend Environment Variables (.env)</h4>
                <ul className={styles.list}>
                    <li>
                        <code className={styles.code}>PORT</code>
                        <span className={styles.envDescription}>Server port number (Default: 3000)</span>
                    </li>
                    <li>
                        <code className={styles.code}>NODE_ENV</code>
                        <span className={styles.envDescription}>Node environment (Default: development)</span>
                    </li>
                    <li>
                        <code className={styles.code}>MONGODB_URI</code>
                        <span className={styles.envDescription}>MongoDB connection string (Required)</span>
                    </li>
                    <li>
                        <code className={styles.code}>JWT_SECRET</code>
                        <span className={styles.envDescription}>Secret key for JWT tokens (Required)</span>
                    </li>
                    <li>
                        <code className={styles.code}>GITHUB_CLIENT_SECRET</code>
                        <span className={styles.envDescription}>GitHub OAuth client secret (Required)</span>
                    </li>
                    <li>
                        <code className={styles.code}>CORS_ORIGIN</code>
                        <span className={styles.envDescription}>Allowed CORS origins (Default: http://localhost:5173)</span>
                    </li>
                    <li>
                        <code className={styles.code}>SESSION_SECRET</code>
                        <span className={styles.envDescription}>Session secret key (Required)</span>
                    </li>
                </ul>
            </div>

            <h2 id="development" className={styles.subtitle}>Development</h2>
            <p className={styles.text}>To start the development environment:</p>
            <ol className={styles.orderedList}>
                <li>Start the frontend:
                    <code className={styles.code}>cd frontend && npm run dev</code>
                </li>
                <li>In a separate terminal, start the backend:
                    <code className={styles.code}>cd backend && npm run dev</code>
                </li>
            </ol>
            <p className={styles.text}>The development server supports hot reloading for both frontend and backend changes.</p>

            <h2 id="api-documentation" className={styles.subtitle}>API Documentation</h2>
            <p className={styles.text}>The backend provides the following main API endpoints:</p>
            <div className={styles.apiEndpoints}>
                <h3 className={styles.subsubtitle}>Projects API</h3>
                <ul className={styles.list}>
                    <li><code className={styles.code}>GET /api/projects</code> - List all projects</li>
                    <li><code className={styles.code}>GET /api/projects/:id</code> - Get project details</li>
                    <li><code className={styles.code}>POST /api/projects</code> - Create new project</li>
                </ul>
                <h3 className={styles.subsubtitle}>Users API</h3>
                <ul className={styles.list}>
                    <li><code className={styles.code}>GET /api/users</code> - List all users</li>
                    <li><code className={styles.code}>GET /api/users/:id</code> - Get user details</li>
                </ul>
            </div>

            <h2 id="testing" className={styles.subtitle}>Testing</h2>
            <p className={styles.text}>
                The project includes comprehensive testing suites for both frontend and backend:
            </p>
            <h3 className={styles.subsubtitle}>Frontend Tests</h3>
            <code className={styles.code}>cd frontend && npm test</code>
            <h3 className={styles.subsubtitle}>Backend Tests</h3>
            <code className={styles.code}>cd backend && npm test</code>
            <p className={styles.text}>
                For manual testing, access these URLs after starting the development servers:
            </p>
            <ul className={styles.list}>
                <li>Frontend: <code className={styles.code}>http://localhost:5173</code></li>
                <li>Backend API: <code className={styles.code}>http://localhost:3000</code></li>
                <li>API Documentation: <code className={styles.code}>http://localhost:3000/api-docs</code></li>
            </ul>

            <h2 id="contributing" className={styles.subtitle}>Contributing</h2>
            <p className={styles.text}>
                We welcome contributions! Please follow these steps:
            </p>
            <ol className={styles.orderedList}>
                <li>Fork the repository</li>
                <li>Create a feature branch: <code className={styles.code}>git checkout -b feature/your-feature-name</code></li>
                <li>Commit your changes: <code className={styles.code}>git commit -m 'Add some feature'</code></li>
                <li>Push to the branch: <code className={styles.code}>git push origin feature/your-feature-name</code></li>
                <li>Submit a pull request</li>
            </ol>
            <p className={styles.text}>
                For more details, visit our repository at:
                <a href='https://gh.sivothajan.me/projects.scs.sivothajan.me' target="_blank" rel="noopener noreferrer" className={styles.link}>
                    projects.scs.sivothajan.me
                </a>
            </p>

            <h2 id="license" className={styles.subtitle}>License</h2>
            <p className={styles.text}>
                This project is licensed under the MIT License. See the <a href='/LICENSE' className={styles.link}>LICENSE</a> file for details.
            </p>
            
            <footer className={styles.footer}>
                <p className={styles.authorStamp}>
                    © 2025 Developed and maintained by <a href='https://sivothajan.me/#from-scs.projects.site' className={styles.link}>Sivothayan</a>
                    <br/>
                    Source code available on <a href="https://gh.sivothajan.me/projects.scs.pdn.ac.lk" className={styles.link}>GitHub</a>
                </p>
            </footer>
        </div>
    );
};

export default Documentation;