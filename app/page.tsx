'use client'

import { useEffect, useState, useCallback } from 'react'
import ImageGrid from './components/ImageGrid'
import ImageControls from './components/ImageControls'

const TOTAL_IMAGES = 25

export default function Home() {
  const [images, setImages] = useState<{ small: string; full: string; tags: string[] }[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const fetchImages = useCallback(
    async (tag = '') => {
      setLoading(true)
      const res = await fetch(
        `/api/random-photos?count=${TOTAL_IMAGES}${tag ? `&query=${encodeURIComponent(tag)}` : ''}`
      )
      const data = await res.json()
      setImages(data)
      setLoading(false)
    },
    []
  )

  useEffect(() => {
    fetchImages()
  }, [fetchImages])


  const handleSearch = () => {
    setQuery(searchInput)
    fetchImages(searchInput)
  }

  const handleRefresh = () => {
    fetchImages(query)
  }


  return (
    <main className="w-screen flex flex-col">
      <ImageControls
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
        onRefresh={handleRefresh}
        loading={loading}
      />

      <ImageGrid images={images} />
      {loading && (
        <div className="text-center py-4 text-white text-sm">Loading more images...</div>
      )}

    </main>
  )
}
