'use client'

import { useEffect, useState, useCallback } from 'react'
import ImageGrid from './components/ImageGrid'
import ImageControls from './components/ImageControls'

const TOTAL_IMAGES = 25
const CACHE_THRESHOLD = 50
const CACHE_KEY = 'unsplashImageCache'

interface ImageData {
  small: string
  full: string
  tags: string[]
}

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [imageCache, setImageCache] = useState<ImageData[]>([])

  // 🧠 Load cached images from localStorage
  useEffect(() => {
    const cachedJson = localStorage.getItem(CACHE_KEY)
    if (cachedJson) {
      try {
        const parsed = JSON.parse(cachedJson)
        if (Array.isArray(parsed)) {
          setImageCache(parsed)
        }
      } catch (e) {
        console.warn('Failed to parse image cache:', e)
      }
    }
  }, [])

  // 💾 Save cache to localStorage when updated
  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(imageCache.slice(0, 200)))
  }, [imageCache])

  const fetchImages = useCallback(
    async (tag = '') => {
      setLoading(true)
      const isQuerying = tag.trim().length > 0

      // Serve from cache if not querying
      if (!isQuerying && imageCache.length >= TOTAL_IMAGES) {
        console.log('Serving from localStorage cache...')
        const shuffled = [...imageCache].sort(() => 0.5 - Math.random())
        setImages(shuffled.slice(0, TOTAL_IMAGES))
        setLoading(false)
        return
      }

      try {
        const res = await fetch(
          `/api/random-photos?count=${CACHE_THRESHOLD}${tag ? `&query=${encodeURIComponent(tag)}` : ''}`
        )
        const data = await res.json()
        console.log('Fetched image data:', data)

        const safeData = Array.isArray(data)
          ? data.filter(
            (img) =>
              typeof img?.small === 'string' &&
              typeof img?.full === 'string' &&
              Array.isArray(img?.tags)
          )
          : []

        if (!isQuerying) {
          const updatedCache = [...imageCache, ...safeData].slice(0, 200)
          setImageCache(updatedCache)
        }

        setImages(isQuerying ? safeData : safeData.slice(0, TOTAL_IMAGES))
      } catch (e) {
        console.error('Failed to fetch images:', e)
        setImages([])
      } finally {
        setLoading(false)
      }
    },
    [imageCache]
  )

  useEffect(() => {
    const fetchInitialImages = async () => {
      setLoading(true)

      if (imageCache.length >= TOTAL_IMAGES) {
        console.log('Serving from localStorage cache...')
        const shuffled = [...imageCache].sort(() => 0.5 - Math.random())
        setImages(shuffled.slice(0, TOTAL_IMAGES))
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/random-photos?count=${CACHE_THRESHOLD}`)
        const data = await res.json()
        console.log('Fetched image data:', data)

        const safeData = Array.isArray(data)
          ? data.filter(
            (img) =>
              typeof img?.small === 'string' &&
              typeof img?.full === 'string' &&
              Array.isArray(img?.tags)
          )
          : []

        const updatedCache = [...imageCache, ...safeData].slice(0, 200)
        setImageCache(updatedCache)
        setImages(safeData.slice(0, TOTAL_IMAGES))
      } catch (e) {
        console.error('Failed to fetch images:', e)
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchInitialImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // ✅ run only once on mount



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
