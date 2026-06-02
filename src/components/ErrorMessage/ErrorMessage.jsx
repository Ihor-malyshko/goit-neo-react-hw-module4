import styles from './ErrorMessage.module.css'

function ErrorMessage({ message }) {
  return (
    <div className={styles.message} role="alert">
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
