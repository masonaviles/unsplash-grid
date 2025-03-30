import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const count = searchParams.get('count') || '20'
  const accessKey = process.env.UNSPLASH_ACCESS_KEY

  const res = await fetch(
    `https://api.unsplash.com/photos/random?count=${count}`,
    {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    }
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }

  const data = await res.json()
  const urls = data.map((img: any) => img.urls.small)
  return NextResponse.json(urls)
}
