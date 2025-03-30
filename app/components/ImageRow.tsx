'use client'

import ImageCard from './ImageCard'

interface Props {
    rowImages: string[]
    rowIndex: number
    expandedIndexes: Set<number>
    toggleExpanded: (index: number) => void
    hoverIndex: number | null
    setHoverIndex: (index: number | null) => void
}

const IMAGES_PER_ROW = 5

export default function ImageRow({
    rowImages,
    rowIndex,
    expandedIndexes,
    toggleExpanded,
    hoverIndex,
    setHoverIndex,
}: Props) {
    return (
        <div className="flex gap-2 items-center">
            {rowImages.map((url, i) => {
                const globalIndex = rowIndex * IMAGES_PER_ROW + i
                const isExpanded = expandedIndexes.has(globalIndex)
                const isHovered = hoverIndex === globalIndex

                return (
                    <ImageCard
                        key={globalIndex}
                        index={globalIndex}
                        url={url}
                        isExpanded={isExpanded}
                        isHovered={isHovered}
                        onClick={() => toggleExpanded(globalIndex)}
                        onHoverEnter={() => setHoverIndex(globalIndex)}
                        onHoverLeave={() => setHoverIndex(null)}
                    />
                )
            })}
        </div>
    )
}
