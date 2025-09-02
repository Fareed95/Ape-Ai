import { motion } from "framer-motion";

const FriendCard = ({ friend }: { friend: any }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl flex items-center space-x-4 hover:bg-neutral-800/50 transition-all duration-300 backdrop-blur-sm group"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center text-neutral-200 ring-2 ring-neutral-700/50 group-hover:ring-neutral-600/50 transition-all duration-300">
        {friend.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-neutral-200 font-medium truncate font-heading">{friend.name}</h4>
        <p className="text-sm text-neutral-400 truncate font-sans">{friend.status}</p>
      </div>
      <div className={`flex-shrink-0 w-2 h-2 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-neutral-600'} ring-2 ${friend.isOnline ? 'ring-green-500/20' : 'ring-neutral-600/20'}`} />
    </motion.div>
  );

  export default FriendCard;