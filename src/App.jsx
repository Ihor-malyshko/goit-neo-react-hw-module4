import { useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import ImageGallery from './components/ImageGallery/ImageGallery.jsx'
import Loader from './components/Loader/Loader.jsx'
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx'
import ImageModal from './components/ImageModal/ImageModal.jsx'
import styles from './App.module.css'

const IMAGES_PER_PAGE = 12

function App() {
  const [images, setImages] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [totalPages, setTotalPages] = useState(0)

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

  const fetchImages = async (searchTerm, pageNumber) => {
    if (!accessKey) {
      setError('Missing Unsplash access key. Add VITE_UNSPLASH_ACCESS_KEY to .env.')
      setStatus('rejected')
      return
    }

    setStatus('pending')

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: searchTerm,
          page: pageNumber,
          per_page: IMAGES_PER_PAGE,
          orientation: 'landscape',
          client_id: accessKey,
        },
      })

      const { results, total } = response.data

      if (!results.length) {
        toast('No images found for this search term.', { icon: '🔍' })
      }

      setImages(prevImages => (pageNumber === 1 ? results : [...prevImages, ...results]))
      setTotalPages(Math.ceil(total / IMAGES_PER_PAGE))
      setStatus('resolved')
    } catch (requestError) {
      setError(
        requestError.response?.data?.errors?.[0] ||
          requestError.message ||
          'Failed to load images. Please try again later.',
      )
      setStatus('rejected')
    }
  }

  const handleSearchSubmit = async searchTerm => {
    if (searchTerm === query) {
      return
    }

    setQuery(searchTerm)
    setPage(1)
    setImages([])
    setError('')
    setStatus('idle')

    await fetchImages(searchTerm, 1)
  }

  const handleLoadMore = async () => {
    const nextPage = page + 1
    setPage(nextPage)
    await fetchImages(query, nextPage)
  }

  const handleImageClick = image => {
    setSelectedImage(image)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <SearchBar onSubmit={handleSearchSubmit} />
      </header>

      <main className={styles.main}>
        {status === 'rejected' && <ErrorMessage message={error} />}
        {status === 'idle' && !images.length && (
          <p className={styles.message}>Start by searching for images above.</p>
        )}
        <ImageGallery images={images} onImageClick={handleImageClick} />
        {status === 'pending' && <Loader />}
        {images.length > 0 && page < totalPages && status !== 'pending' && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      </main>

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <ImageModal image={selectedImage} onClose={handleCloseModal} />
    </div>
  )
}

export default App
