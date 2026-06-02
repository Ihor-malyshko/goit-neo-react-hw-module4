import Modal from 'react-modal'
import styles from './ImageModal.module.css'

Modal.setAppElement('#root')

function ImageModal({ image, onClose }) {
  if (!image) {
    return null
  }

  const {
    urls,
    alt_description,
    description,
    user,
    likes,
    created_at,
    location,
  } = image

  return (
    <Modal
      isOpen={Boolean(image)}
      onRequestClose={onClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
      contentLabel="Image preview"
      closeTimeoutMS={150}
    >
      <button type="button" className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <img className={styles.image} src={urls.regular} alt={alt_description || 'Selected photo'} />
      <div className={styles.details}>
        <h2 className={styles.title}>{description || alt_description || 'Photo details'}</h2>
        <p className={styles.info}>
          <strong>Author:</strong> {user.name}
        </p>
        <p className={styles.info}>
          <strong>Likes:</strong> {likes}
        </p>
        {location?.name ? (
          <p className={styles.info}>
            <strong>Location:</strong> {location.name}
          </p>
        ) : null}
        {created_at ? (
          <p className={styles.info}>
            <strong>Created:</strong> {new Date(created_at).toLocaleDateString()}
          </p>
        ) : null}
      </div>
    </Modal>
  )
}

export default ImageModal
