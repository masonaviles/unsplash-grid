'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FullscreenModal({
    image,
    onClose,
}: {
    image: string
    onClose: () => void
}) {
    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onEsc)
        return () => document.removeEventListener('keydown', onEsc)
    }, [onClose])


    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.img
                    src={image}
                    alt="Full screen"
                    className="max-h-full max-w-full object-contain rounded shadow-lg"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </AnimatePresence>
    )
}
