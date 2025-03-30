'use client'

import { useState, useEffect } from 'react'

const TOTAL_IMAGES = 25

export default function Home() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(new Set())

  const fetchImages = async () => {
    setLoading(true)
    const res = await fetch(`/api/random-photos?count=${TOTAL_IMAGES}`)
    const data = await res.json()
    setImages(data)
    setLoading(false)
  }

  const toggleExpanded = (index: number) => {
    setExpandedIndexes((prev) => {
      const next = new Set(prev)
      next.has(index) ? next.delete(index) : next.add(index)
      return next
    })
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

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
          {images.map((url, i) => {
            const isExpanded = expandedIndexes.has(i)

            return (
              <div
                key={i}
                onClick={() => toggleExpanded(i)}
                className="relative w-full overflow-hidden rounded cursor-pointer transition-all duration-500 group"
              >
                <img
                  src={url}
                  alt={`Unsplash ${i}`}
                  className={`w-full object-cover rounded transition-all duration-500 ease-in-out
          ${isExpanded ? 'h-auto' : 'h-48'} group-hover:h-auto`}
                />
              </div>
            )
          })}

        </div>
      </div>
    </main>
  )
}
