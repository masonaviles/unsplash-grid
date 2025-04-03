'use client'

import { motion, AnimatePresence } from 'framer-motion'

const COLLAPSED_HEIGHT = 192

interface Props {
    index: number
    url: string
    isHovered: boolean
    tags?: string[]
    onHoverEnter: () => void
    onHoverLeave: () => void
    onOpenModal: () => void
}

export default function ImageCard({
    url,
    tags = [],
    isHovered,
    onHoverEnter,
    onHoverLeave,
    onOpenModal,
}: Props) {
    return (
        <div
            className="relative w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 cursor-pointer"
            style={{ height: COLLAPSED_HEIGHT }}
            onClick={onOpenModal}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
        >
            {/* Base cropped image */}
            <img
                src={url}
                alt=""
                className="w-full h-full object-cover"
            />

            {/* Tags overlay */}
            <AnimatePresence>
                {isHovered && tags.length > 0 && (
                    <motion.div
                        key="tags"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-0 left-0 w-full px-2 py-1 bg-black/60 text-white text-xs z-40 rounded-t"
                    >
                        <div className="flex flex-wrap gap-1">
                            {tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-white/10 px-2 py-0.5 rounded"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hovered full-ratio image exactly over original */}
            <AnimatePresence>
                {isHovered && (
                    <motion.img
                        key="hover-image"
                        src={url}
                        alt=""
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-0 left-0 w-full h-auto z-30 object-contain rounded shadow-lg"
                        style={{ pointerEvents: 'none' }}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
