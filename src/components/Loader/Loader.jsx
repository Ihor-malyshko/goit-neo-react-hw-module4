import { ClipLoader } from 'react-spinners'
import styles from './Loader.module.css'

function Loader() {
  return (
    <div className={styles.loader}>
      <ClipLoader size={40} color="#3b82f6" />
    </div>
  )
}

export default Loader
