'use client'

import { useEffect, useState } from 'react'
import ImageGrid from './components/ImageGrid'

const TOTAL_IMAGES = 25

export default function Home() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const fetchImages = async () => {
    setLoading(true)
    const res = await fetch(`/api/random-photos?count=${TOTAL_IMAGES}`)
    const data = await res.json()
    setImages(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <main className="h-screen w-screen flex flex-col">
      <div className="p-4 bg-white shadow-md z-10">
        <button
          onClick={fetchImages}
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <ImageGrid images={images} />
    </main>
  )
}
