'use client'

import { useState } from 'react'
import ImageRow from './ImageRow'

const IMAGES_PER_ROW = 5

function chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size))
    }
    return result
}

export default function ImageGrid({ images }: { images: string[] }) {
    const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(new Set())
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)

    const toggleExpanded = (index: number) => {
        setExpandedIndexes((prev) => {
            const next = new Set(prev)
            next.has(index) ? next.delete(index) : next.add(index)
            return next
        })
    }

    return (
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
            {chunkArray(images, IMAGES_PER_ROW).map((row, rowIndex) => (
                <ImageRow
                    key={rowIndex}
                    rowImages={row}
                    rowIndex={rowIndex}
                    expandedIndexes={expandedIndexes}
                    toggleExpanded={toggleExpanded}
                    hoverIndex={hoverIndex}
                    setHoverIndex={setHoverIndex}
                />
            ))}
        </div>
    )
}
