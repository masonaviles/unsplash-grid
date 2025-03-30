'use client'

import { useEffect, useState } from 'react'
import ImageGrid from './components/ImageGrid'
import ImageControls from './components/ImageControls'

const TOTAL_IMAGES = 25

export default function Home() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const fetchImages = async (tag?: string) => {
    setLoading(true)
    const res = await fetch(`/api/random-photos?count=${TOTAL_IMAGES}&query=${tag || ''}`)
    const data = await res.json()
    setImages(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleSearch = () => {
    setQuery(searchInput)
    fetchImages(searchInput)
  }

  const handleRefresh = () => {
    fetchImages(query)
  }

  return (
    <main className="h-screen w-screen flex flex-col">
      <ImageControls
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
        onRefresh={handleRefresh}
        loading={loading}
      />

      <ImageGrid images={images} />
    </main>
  )
}
