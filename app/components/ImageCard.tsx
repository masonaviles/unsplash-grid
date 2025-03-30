'use client'

import { motion, AnimatePresence } from 'framer-motion'

const COLLAPSED_HEIGHT = 192

interface Props {
    index: number
    url: string
    isHovered: boolean
    onHoverEnter: () => void
    onHoverLeave: () => void
    onOpenModal: () => void
}

export default function ImageCard({
    url,
    isHovered,
    onHoverEnter,
    onHoverLeave,
    onOpenModal,
}: Props) {
    return (
        <div
            className="relative flex-1 cursor-pointer"
            style={{ maxWidth: '20%', height: COLLAPSED_HEIGHT }}
            onClick={onOpenModal}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
        >
            {/* Base cropped image */}
            <img
                src={url}
                alt=""
                className="w-full h-full object-cover rounded"
            />


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
                        className="absolute top-0 left-0 w-full h-auto z-50 object-contain rounded shadow-lg"
                        style={{ pointerEvents: 'none' }}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
