import './about-page.scss';

export function AboutPage() {
  return (
    <div className="about-page">
      <h1 className="about-page__title">About the Project</h1>
      <p>
        RickVerse Search is a React application that allows users to explore characters from the Rick and Morty
        universe. It fetches character data from the Rick and Morty API and displays it in a user-friendly interface.
        Users can browse through characters, view their details, and navigate through different pages of results.
      </p>
      <div className="about-page__sections-wrapper">
        <div className="about-page__section">
          <h3 className="about-page__section-title">Author</h3>
          <p className="about-page__section-description">
            Frontend developer and student building this project as part of a React learning journey. Focused on clean
            UI, reusable components and async data handling.
          </p>
          <a
            className="about-page__section-link"
            href="https://github.com/whaleisajoy"
            target="_blank"
            rel="noreferrer"
          >
            Github: WhaleisaJoy
          </a>
        </div>

        <div className="about-page__section">
          <h3 className="about-page__section-title">Mentor</h3>
          <p className="about-page__section-description">
            Guided the project architecture, shared best practices and helped improve code quality and component
            structure.
          </p>
          <a className="about-page__section-link" href="https://github.com/aleks6699" target="_blank" rel="noreferrer">
            Github: aleks6699
          </a>
        </div>
      </div>

      <div className="about-page__section">
        <h3 className="about-page__section-title">Course</h3>
        <p className="about-page__section-description">
          This project was created during a frontend course focused on modern React development, component-based
          architecture and practical application building.
        </p>
        <a
          className="about-page__section-link"
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          Course link: rs.school/courses/reactjs
        </a>
      </div>
    </div>
  );
}
