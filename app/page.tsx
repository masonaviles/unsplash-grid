'use client'

import { useEffect, useState, useCallback } from 'react'
import ImageGrid from './components/ImageGrid'
import ImageControls from './components/ImageControls'

const TOTAL_IMAGES = 25
const CACHE_THRESHOLD = 50
const CACHE_KEY = 'unsplashImageCache'
const LAST_FAILURE_KEY = 'unsplashLastFailure'
const FAILURE_TIMEOUT_MS = 1000 * 60 * 60

interface ImageData {
  small: string
  full: string
  tags: string[]
}

function isRateLimited(): boolean {
  const lastFailure = localStorage.getItem(LAST_FAILURE_KEY)
  if (!lastFailure) return false

  const elapsed = Date.now() - Number(lastFailure)
  return elapsed < FAILURE_TIMEOUT_MS
}


const PLACEHOLDER_IMAGES: ImageData[] = Array.from({ length: TOTAL_IMAGES }).map((_, i) => ({
  small: `https://picsum.photos/400?random=${i + 1}`,
  full: `https://picsum.photos/1200?random=${i + 1}`,
  tags: ['placeholder'],
}))

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [imageCache, setImageCache] = useState<ImageData[]>([])

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

  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(imageCache.slice(0, 200)))
  }, [imageCache])

  const fetchImages = useCallback(
    async (tag = '') => {
      setLoading(true)
      const isQuerying = tag.trim().length > 0

      if (!isQuerying && isRateLimited()) {
        console.warn('API is rate-limited. Using fallback images.')
        setImages(PLACEHOLDER_IMAGES)
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
          : PLACEHOLDER_IMAGES

        if (!isQuerying) {
          const updatedCache = [...imageCache, ...safeData].slice(0, 200)
          setImageCache(updatedCache)
        }

        setImages(isQuerying ? safeData : safeData.slice(0, TOTAL_IMAGES))
      } catch (e) {
        console.error('Failed to fetch images:', e)
        console.warn('Using fallback placeholder images.')
        localStorage.setItem(LAST_FAILURE_KEY, String(Date.now()))

      } finally {
        setLoading(false)
      }
    },
    [imageCache]
  )

  useEffect(() => {
    const fetchInitialImages = async () => {
      if (isRateLimited()) {
        console.warn('API is rate-limited. Using fallback images.')
        setImages(PLACEHOLDER_IMAGES)
        return
      }

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
          : PLACEHOLDER_IMAGES

        const updatedCache = [...imageCache, ...safeData].slice(0, 200)
        setImageCache(updatedCache)
        setImages(safeData.slice(0, TOTAL_IMAGES))
      } catch (e) {
        console.error('Failed to fetch images:', e)
        localStorage.setItem(LAST_FAILURE_KEY, String(Date.now()))
        setImages(PLACEHOLDER_IMAGES)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



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
