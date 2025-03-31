import { NextResponse } from 'next/server'

interface UnsplashImage {
  id: string
  urls: {
    small: string
    full: string
  }
}

interface UnsplashTag {
  title: string
}

interface UnsplashDetailResponse {
  tags?: UnsplashTag[]
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const count = searchParams.get('count') || '20'
  const query = searchParams.get('query') || ''
  const accessKey = process.env.UNSPLASH_ACCESS_KEY

  const baseUrl = query
    ? `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}`
    : `https://api.unsplash.com/photos/random?count=${count}`

  const res = await fetch(baseUrl, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }

  const data = await res.json()
  const images: UnsplashImage[] = query ? data.results : Array.isArray(data) ? data : [data]

  const enrichedImages = await Promise.all(
    images.map(async (img) => {
      const detailRes = await fetch(`https://api.unsplash.com/photos/${img.id}`, {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      })

      if (!detailRes.ok) return null

      const details: UnsplashDetailResponse = await detailRes.json()

      return {
        small: img.urls.small,
        full: img.urls.full,
        tags: details.tags?.map((tag) => tag.title) || [],
      }
    })
  )

  return NextResponse.json(enrichedImages.filter(Boolean))
}
