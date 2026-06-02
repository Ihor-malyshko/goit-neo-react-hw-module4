import styles from './ImageCard.module.css'

function ImageCard({ image, onClick }) {
  const { urls, alt_description, user, likes } = image

  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0} onKeyDown={event => event.key === 'Enter' && onClick()}>
      <img className={styles.image} src={urls.small} alt={alt_description || 'Photo'} />
      <div className={styles.overlay}>
        <p className={styles.author}>{user.name}</p>
        <span className={styles.likes}>❤️ {likes}</span>
      </div>
    </div>
  )
}

export default ImageCard
