'use client'

import { useState } from 'react'
import ImageRow from './ImageRow'
import FullscreenModal from './FullscreenModal'

const IMAGES_PER_ROW = 5

function chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size))
    }
    return result
}

export default function ImageGrid({
    images,
}: {
    images: { small: string; full: string; tags: string[] }[]
}) {

    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [modalImage, setModalImage] = useState<string | null>(null)

    return (
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
            {chunkArray(images, IMAGES_PER_ROW).map((row, rowIndex) => (
                <ImageRow
                    key={rowIndex}
                    rowImages={row}
                    rowIndex={rowIndex}
                    hoverIndex={hoverIndex}
                    setHoverIndex={setHoverIndex}
                    setModalImage={setModalImage}
                />
            ))}

            {modalImage && (
                <FullscreenModal image={modalImage} onClose={() => setModalImage(null)} />
            )}
        </div>
    )
}
