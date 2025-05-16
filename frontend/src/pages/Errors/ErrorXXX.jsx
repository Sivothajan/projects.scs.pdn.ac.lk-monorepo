import errorStyles from "./Error.module.css";

function ErrorXXX({ errorCode, errorMessage, errorDescription = "" }) {
  if (!errorCode || !errorMessage) {
    throw new Error("errorCode and errorMessage are required.");
  }

  return (
    <div className={errorStyles.errorContainer}>
      <div className={errorStyles.errorCode}>{errorCode}</div>
      <div className={errorStyles.errorMessage}>{errorMessage}</div>
      {errorDescription && (
        <div className={errorStyles.errorDescription}>{errorDescription}</div>
      )}
      <div className={errorStyles.errorDescription}>
        Please visit: <a href="/">Home page</a>
      </div>
    </div>
  );
}

export default ErrorXXX;
