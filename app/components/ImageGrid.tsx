'use client'

import { useState } from 'react'
import FullscreenModal from './FullscreenModal'
import ImageCard from './ImageCard'

export default function ImageGrid({
    images,
}: {
    images: { small: string; full: string; tags: string[] }[]
}) {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [modalImage, setModalImage] = useState<string | null>(null)

    return (
        <div className="flex flex-wrap gap-2 px-2 py-4">
            {images.map((img, index) => (
                <ImageCard
                    key={index}
                    index={index}
                    url={img.small}
                    isHovered={hoverIndex === index}
                    onHoverEnter={() => setHoverIndex(index)}
                    onHoverLeave={() => setHoverIndex(null)}
                    onOpenModal={() => setModalImage(img.full)}
                    tags={img.tags}
                />
            ))}

            {modalImage && (
                <FullscreenModal image={modalImage} onClose={() => setModalImage(null)} />
            )}
        </div>
    )
}
