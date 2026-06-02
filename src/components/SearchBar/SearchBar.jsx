import { useState } from 'react'
import toast from 'react-hot-toast'
import styles from './SearchBar.module.css'

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      toast.error('Please enter a search term for images.')
      return
    }

    onSubmit(trimmedQuery)
  }

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button} aria-label="Search images">
          Search
        </button>

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  )
}

export default SearchBar
