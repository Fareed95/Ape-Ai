import { motion } from 'framer-motion';
import { GlowingBorder } from './GlowingBorder';

interface UserDetails {
  name?: string;
  email?: string;
  phone_number?: string;
  about?: string;
}

interface AIHeroProps {
  userDetails: UserDetails;
}

export const AIHero = ({ userDetails }: AIHeroProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative pt-16 xs:pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-6 xs:pb-8 sm:pb-12 md:pb-14 lg:pb-16 overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10"
  >
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"
          animate={{
            x: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
    <div className="max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <GlowingBorder>
          <div className="bg-neutral-900/50 backdrop-blur-xl p-3 xs:p-4 sm:p-6 md:p-7 lg:p-8 rounded-lg">
            <motion.h1
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 mb-2 xs:mb-3 sm:mb-4"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              {userDetails.name || 'AI Portfolio'}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-1 xs:space-y-2 sm:space-y-3 md:space-y-4"
            >
              <p className="text-xs xs:text-sm sm:text-base md:text-lg text-neutral-400">{userDetails.email}</p>
              <p className="text-xs xs:text-sm sm:text-base md:text-lg text-neutral-400">{userDetails.phone_number}</p>
              <p className="text-xs xs:text-sm sm:text-base md:text-lg text-neutral-400 max-w-full mx-auto">{userDetails.about}</p>
            </motion.div>
          </div>
        </GlowingBorder>
      </motion.div>
    </div>
  </motion.div>
);