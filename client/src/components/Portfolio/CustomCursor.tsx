"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const updatePosition = (e: any) => {
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        window.addEventListener('mousemove', updatePosition);
        return () => window.removeEventListener('mousemove', updatePosition);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 pointer-events-none z-50 mix-blend-difference"
            animate={{
                x: position.x - 6,
                y: position.y - 6,
                scale: isPointer ? 1.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            <div className="w-full h-full rounded-full bg-white" />
        </motion.div>
    );
};

export default CustomCursor;