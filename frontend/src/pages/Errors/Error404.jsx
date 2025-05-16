import errorStyles from "./Error.module.css";

function Error404() {
  return (
    <div className={errorStyles.errorContainer}>
      <div className={errorStyles.errorCode}>404</div>
      <div className={errorStyles.errorMessage}>Page Not Found</div>
      <div className={errorStyles.errorDescription}>
        The page you are looking for does not exist.
      </div>
      <div className={errorStyles.errorDescription}>
        Please visit: <a href="/">Home page</a>
      </div>
    </div>
  );
}

export default Error404;
