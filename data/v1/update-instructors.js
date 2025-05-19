const fs = require('fs');
const path = require('path');

// Define the instructor mappings
const instructorMappings = {
    'sachith-sci': {
        username: 'sachith-sci',
        link: '/instructor/sachith-sci'
    },
    'salukak-sci': {
        username: 'salukak-sci',
        link: '/instructor/salukak-sci'
    },
    'roshand-sci': {
        username: 'roshand-sci',
        link: '/instructor/roshand-sci'
    },
    'amalka-sci': {
        username: 'amalka-sci',
        link: '/instructor/amalka-sci'
    },
    'ruwandn-sci': {
        username: 'ruwandn-sci',
        link: '/instructor/ruwandn-sci'
    },
    'hakimu-sci': {
        username: 'hakimu-sci',
        link: '/instructor/hakimu-sci'
    },
    'ruwanpm-sci': {
        username: 'ruwanpm-sci',
        link: '/instructor/ruwanpm-sci'
    },
    'hemalika-sci': {
        username: 'hemalika-sci',
        link: '/instructor/hemalika-sci'
    },
    'lakshikan-sci': {
        username: 'lakshikan-sci',
        link: '/instructor/lakshikan-sci'
    },
    'ruwanthini-sci': {
        username: 'ruwanthini-sci',
        link: '/instructor/ruwanthini-sci'
    },
    'mahasend-sci': {
        username: 'mahasend-sci',
        link: '/instructor/mahasend-sci'
    },
    'erunika-sci': {
        username: 'erunika-sci',
        link: '/instructor/erunika-sci'
    },
    'jagath-sci': {
        username: 'jagath-sci',
        link: '/instructor/jagath-sci'
    },
    'pramuka-sci': {
        username: 'pramuka-sci',
        link: '/instructor/pramuka-sci'
    },
    'pavithra-sci': {
        username: 'pavithra-sci',
        link: '/instructor/pavithra-sci'
    },
    'malima-sci': {
        username: 'malima-sci',
        link: '/instructor/malima-sci'
    },
    'isuru-sci': {
        username: 'isuru-sci',
        link: '/instructor/isuru-sci'
    }
};

// Read and parse projects.json
const projectsPath = path.join(__dirname, 'projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

// Function to get username from instructorLink
function getUsernameFromLink(link) {
    const username = link.replace('/instructor/', '');
    // Handle special cases with incorrect formatting
    const specialCases = {
        'Ruwan-D.-Nawarathna': 'ruwandn-sci',
        'Hemalika-T.K.-Abeysundara': 'hemalika-sci',
        'Ruwanthini-Siyambalapitiya': 'ruwanthini-sci',
        'Jagath-Senarathne': 'jagath-sci',
        'Isuru-Madugalla': 'isuru-sci'
    };
    return specialCases[username] || username;
}

// Update instructor fields
projects.forEach(project => {
    if (project.instructorLink) {
        const username = getUsernameFromLink(project.instructorLink);
        if (instructorMappings[username]) {
            project.instructor = username;
            project.instructorLink = instructorMappings[username].link;
        }
    }
});

// Write back to file with proper formatting
fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
