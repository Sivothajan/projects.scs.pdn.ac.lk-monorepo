import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import projectStyle from './Project.module.css';
import getProjectDetails from '../../scripts/getProjectDetails';
import getProjectDetailsWithName from '../../scripts/getProjectDetailsWithName';

function Project() {
    const { projectId, projectName } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);

    useEffect(() => {
        async function fetchDetails() {
            let details;
            if (projectId && projectName) {
                details = await getProjectDetailsWithName(projectId, projectName);
            } else if (projectId) {
                details = await getProjectDetails(projectId);
            }
            setProjectDetails(details);
        }
        fetchDetails();
    }, [projectId, projectName]);

    if (!projectDetails) {
        return <div className={projectStyle.loading}>Loading...</div>;
    }

    return (
        <div className={projectStyle.project}>
            <h1 className={projectStyle.title}>{projectDetails.name}</h1>
            <p className={projectStyle.description}>{projectDetails.description}</p>
            <div className={projectStyle.details}>
                <h2 className={projectStyle.detailsTitle}>Project Details</h2>
                <ul className={projectStyle.detailsList}>
                    <li className={projectStyle.detailItem}><strong>Project ID:</strong> {projectDetails.id}</li>
                    {projectDetails.name && (
                        <li className={projectStyle.detailItem}><strong>Project Name:</strong> {projectDetails.name}</li>
                    )}
                    <li className={projectStyle.detailItem}><strong>Course Code:</strong> {projectDetails.courseCode}</li>
                    <li className={projectStyle.detailItem}>
                        {Array.isArray(projectDetails.instructor) ? (
                            <>
                                <strong>Instructor:</strong>{' '}
                                {projectDetails.instructor.map((instructor, index) => (
                                    <span key={index} className={projectStyle.instructor}>
                                        <a href={instructor.link} target="_blank" rel="noopener noreferrer">{instructor.name}</a>
                                        {index < projectDetails.instructor.length - 1 && ', '}
                                    </span>
                                ))}
                            </>
                        ) : (
                            <>
                                <strong>Instructors:</strong>{'\n'}
                                <a href={projectDetails.instructorLink} target="_blank" rel="noopener noreferrer" className={projectStyle.instructor}>
                                    {projectDetails.instructor}
                                </a>
                            </>
                        )}
                    </li>
                    <li className={projectStyle.detailItem}><strong>Academic Year:</strong> {projectDetails.academicYear}</li>
                    <li className={projectStyle.detailItem}><strong>Project Description:</strong> {projectDetails.description}</li>
                    <li className={projectStyle.detailItem}>
                        <strong>Project Link:</strong>{' '}
                        <a href={projectDetails.projectLink} target="_blank" rel="noopener noreferrer" className={projectStyle.projectLink}>
                            View Project
                        </a>
                    </li>
                </ul>
            </div>
            <div className={projectStyle.authors}>
                <h2 className={projectStyle.authorsTitle}>Authors / Contributors</h2>
                <ul className={projectStyle.authorsList}>
                    {projectDetails.authors.map((author, index) => (
                        <li key={index} className={projectStyle.authorItem}>
                            <a href={author.link} target="_blank" rel="noopener noreferrer" className={projectStyle.authorLink}>
                                {author.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Project;