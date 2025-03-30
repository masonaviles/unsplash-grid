'use client'

import { motion } from 'framer-motion'

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
    isExpanded,
    isHovered,
    onClick,
    onHoverEnter,
    onHoverLeave,
    onOpenModal,
}: Props) {
    return (
        <motion.div
            layout
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={() => {
                onOpenModal()
            }}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            className="relative flex-1 overflow-hidden rounded cursor-pointer group"
            style={{ maxWidth: '20%' }}
        >
            <motion.img
                layout
                src={url}
                alt=""
                className="w-full rounded object-cover"
                animate={{
                    height: isExpanded || isHovered ? 'auto' : COLLAPSED_HEIGHT,
                    scale: isExpanded || isHovered ? 1.03 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
        </motion.div>
    )
}
