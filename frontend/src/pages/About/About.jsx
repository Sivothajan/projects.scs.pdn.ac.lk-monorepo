import styles from "./About.module.css";

function About() {
  return (
    <div className="about">
      <h1 className={styles.heading}>About the Department</h1>
      <p className={styles.description}>
        The <strong>Department of Statistics and Computer Science</strong> is
        one of the fastest-growing departments within the
        <strong>Faculty of Science, University of Peradeniya</strong>. Since its
        establishment in <strong>1996</strong>, the department has continuously
        expanded its capacity, enhancing both its facilities and the number of
        students it serves.
      </p>

      <p className={styles.description}>
        From its inception, the department has emphasized a{" "}
        <strong>hands-on approach to teaching</strong>, integrating practical
        experiences with theoretical coursework. This methodology ensures that
        students gain <strong>real-world problem-solving skills</strong> under
        expert supervision. Our strong <strong>industry collaborations</strong>{" "}
        further enhance the employability and relevance of our graduates in both
        academic and professional domains.
      </p>

      <h2 className={styles.heading}>Academic Contributions</h2>
      <p className={styles.description}>
        The department plays a pivotal role in undergraduate education within
        the faculty by offering and contributing to{" "}
        <strong>multiple four-year degree programs</strong> in addition to the
        general degree program. These include:
      </p>

      <ul className={styles.table}>
        <li>
          <strong>BSc (Hons) in Statistics</strong>
        </li>
        <li>
          <strong>BSc (Hons) in Computer Science</strong>
        </li>
        <li>
          <strong>BSc (Hons) in Computation and Management</strong>
          <br />
          (in collaboration with the Faculty of Management and Faculty of Arts)
        </li>
        <li>
          <strong>BSc (Hons) in Statistics and Operational Research</strong>
          <br />
          (in collaboration with the Department of Mathematics)
        </li>
        <li>
          <strong>BSc (Hons) in Applied Sciences</strong>
        </li>
      </ul>

      <h2 className={styles.heading}>Research and Innovation</h2>
      <p className={styles.description}>
        Students in the department are required to undertake{" "}
        <strong>final-year research projects</strong>, either individually or in
        teams, to apply their learning in innovative ways. Additionally, the
        department integrates project-based learning across multiple courses, a
        model that has proven highly successful in{" "}
        <strong>developing technical expertise</strong>. This strategy has been
        adopted by several other departments over time.
      </p>

      <p className={styles.description}>
        Efforts have also been made to{" "}
        <strong>preserve and document student projects</strong>, ensuring that
        valuable research and development work remains accessible. This website
        serves as a <strong>repository for such initiatives</strong>,
        facilitating knowledge sharing and collaboration.
      </p>
      <p className={styles.authorStamp}>
        <br />
        <br />
        The project is open-source and you can find it from{" "}
        <a href="https://github.com/sivothajan/projects.scs.pdn.ac.lk-monorepo">
          here.
        </a>
        <br />© 2025 Author:{" "}
        <a href="https://sivothajan.me/#from-scs.projects.site">Sivothayan</a>.
        All rights reserved.
      </p>
    </div>
  );
}

export default About;
