import { motion } from "framer-motion";

const AIEffect = () => {
    return (
        <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-neutral-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent animate-pulse" />
            <div className="absolute inset-0 bg-grid-small-white/[0.05] -z-10" />
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] xs:h-[2px] sm:h-[3px] w-[1px] xs:w-[2px] sm:w-[3px] bg-cyan-500/50 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default AIEffect;