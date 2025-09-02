import { motion } from "framer-motion";
import { Briefcase, Clock } from "lucide-react";

const InterviewSlotCard = ({ slot, onJoinMeet }: { slot: any, onJoinMeet: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 15px 30px -8px rgba(0, 0, 0, 0.3)" }}
      className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 border border-neutral-700/50 p-5 rounded-xl backdrop-blur-sm hover:border-neutral-600/80 transition-all duration-300 group"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500/80 ring-2 ring-blue-500/20" />
            <h4 className="text-neutral-200 font-semibold text-lg font-heading">{slot.internship_name}</h4>
          </div>
          <p className="text-neutral-400 text-sm flex items-center font-sans">
            <Briefcase className="w-4 h-4 mr-1 text-neutral-500" />
            {slot.company_name}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <p className="text-neutral-400 text-sm flex items-center font-sans">
            <Clock className="w-4 h-4 mr-1 text-neutral-500" />
            {new Date(slot.interviw_time).toLocaleString()}
          </p>
          {slot.is_selected && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onJoinMeet(slot)}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2 rounded-xl text-white text-sm font-medium hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-900/20 border border-emerald-500/20"
            >
              Join Meet
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );

  export default InterviewSlotCard