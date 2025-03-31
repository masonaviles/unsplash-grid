'use client'

import ImageCard from './ImageCard'

interface Props {
    rowImages: {
        small: string
        full: string
        tags: string[]
    }[]
    rowIndex: number
    hoverIndex: number | null
    setHoverIndex: (index: number | null) => void
    setModalImage: (url: string) => void
}


const IMAGES_PER_ROW = 5

export default function ImageRow({
    rowImages,
    rowIndex,
    hoverIndex,
    setHoverIndex,
    setModalImage,
}: Props) {
    return (
        <div className="flex gap-2 items-center">
            {rowImages.map((img, i) => {
                const globalIndex = rowIndex * IMAGES_PER_ROW + i
                const isHovered = hoverIndex === globalIndex

                return (
                    <ImageCard
                        key={globalIndex}
                        index={globalIndex}
                        url={img.small}
                        isHovered={isHovered}
                        onHoverEnter={() => setHoverIndex(globalIndex)}
                        onHoverLeave={() => setHoverIndex(null)}
                        onOpenModal={() => setModalImage(img.full)}
                        tags={img.tags}
                    />

                )
            })}
        </div>
    )
}
