import styles from './Documentation.module.css';

function Documentation() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Documentation</h1>
            <p className={styles.description}>
                Welcome to the documentation page for this project. Here you will find all the necessary information to understand, use, and contribute to the project.
            </p>
            
            <h2 className={styles.subtitle}>Table of Contents</h2>
            <ul className={styles.list}>
                <li><a href="#introduction" className={styles.link}>Introduction</a></li>
                <li><a href="#installation" className={styles.link}>Installation</a></li>
                <li><a href="#test" className={styles.link}>Test</a></li>
                <li><a href="#contributing" className={styles.link}>Contributing</a></li>
                <li><a href="#license" className={styles.link}>License</a></li>
            </ul>

            <h2 id="introduction" className={styles.subtitle}>Introduction</h2>
            <p className={styles.text}>
            This project is designed to support student projects tied to the Department of Statistics & Computer Science, Faculty of Science, University of Peradeniya. 
            It aims to provide a robust platform for students to collaborate, document, and showcase their work in statistics and computer science, 
            fostering innovation and academic excellence.
            </p>

            <h2 id="installation" className={styles.subtitle}>Installation</h2>
            <p className={styles.text}>Follow these steps to set up the project locally:</p>
            <ol className={styles.orderedList}>
                <li>Clone the repository: <code className={styles.code}>git clone https://github.com/Sivothajan/projects.scs.pdn.ac.lk.git</code></li>
                <li>Navigate to the project directory: <code className={styles.code}>cd projects.scs.pdn.ac.lk</code></li>
                <li>Install dependencies: <code className={styles.code}>npm install</code></li>
                <li>Start the development server: <code className={styles.code}>npm run dev</code></li>
            </ol>

            <h2 id="test" className={styles.subtitle}>Test</h2>
            <p className={styles.text}>
                After setting up the project, you can Test the project by visiting, 
                <code className={styles.code}>http://localhost:xxxx</code> in your web browser.<br/>
                Visit the bellow links to check pages:
            </p>
            <ol className={styles.orderedList}>
                <li><a href='/'>Home</a></li>
                <li><a href='/about'>About</a></li>
                <li><a href='/documentation'>Documentation</a></li>
                <li><a href='/404'>Error Page</a></li>
            </ol>

            <h2 id="contributing" className={styles.subtitle}>Contributing</h2>
            <p className={styles.text}>We welcome contributions! To contribute: <a href='https://gh.sivothajan.me/projects.scs.sivothajan.me' target="_blank" rel="noopener noreferrer" >projects.scs.sivothajan.me</a></p>

            <h2 id="license" className={styles.subtitle}>License</h2>
            <p className={styles.text}>
                This project is licensed under the <code>MIT</code>. See the <a href='/LICENCE'><code className={styles.code}>LICENSE</code></a> file for more details.
            </p>
            <p className={styles.authorStamp}>
                <br/><br/>
                The project is open-source and you can find it from <a href="https://gh.sivothajan.me/projects.scs.pdn.ac.lk">here.</a><br/>
                © 2025 Author: <a href='https://sivothajan.me/#from-scs.projects.site'>Sivothayan</a>. All rights reserved.
            </p>
        </div>
    );
};

export default Documentation;