import { motion } from "framer-motion";


// Animated card for quick stats or info
const StatCard = ({ icon: Icon, title, value, color }: { icon: React.ElementType, title: string, value: string, color: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-gradient-to-br from-black/80 to-${color}-950/30 p-3 sm:p-4 border border-${color}-800/30 rounded-xl backdrop-blur-sm`}
    >
      <div className="flex items-center">
        <div className={`p-2 sm:p-3 rounded-lg bg-${color}-900/20 mr-3 sm:mr-4`}>
          <Icon className={`w-4 h-4 sm:w-6 sm:h-6 text-${color}-400`} />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">{title}</h3>
          <p className="text-base sm:text-xl font-bold text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );

  export default StatCard;