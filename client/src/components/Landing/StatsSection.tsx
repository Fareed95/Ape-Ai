import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
import { useAnimation } from "framer-motion";
// Stats section with animated counters
const StatsSection = () => {
    interface Stat {
      value: string;
      label: string;
      startValue: number;
      endValue: number;
      suffix: string;
      color: string;
      precision?: number;
    }
  
    const stats: Stat[] = [
      { 
        value: "50+", 
        label: "AI Courses", 
        startValue: 0,
        endValue: 50,
        suffix: "+",
        color: "text-ai-blue-400"
      },
      { 
        value: "100K+", 
        label: "Active Learners", 
        startValue: 0,
        endValue: 100,
        suffix: "K+",
        color: "text-ai-teal-400"
      },
      { 
        value: "95%", 
        label: "Completion Rate", 
        startValue: 0,
        endValue: 95,
        suffix: "%",
        color: "text-ai-purple-400"
      },
      { 
        value: "4.8", 
        label: "Average Rating", 
        startValue: 0,
        endValue: 4.8,
        suffix: "",
        precision: 1,
        color: "text-rose-400"
      },
    ];
  
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });
  
    // Custom counter component with animation
    interface CounterProps {
      startValue: number;
      endValue: number;
      suffix: string;
      precision?: number;
      color: string;
    }
  
    const Counter: React.FC<CounterProps> = ({ startValue, endValue, suffix = "", precision = 0, color }) => {
      const controls = useAnimation();
      const [count, setCount] = React.useState(startValue);
      
      React.useEffect(() => {
        if (inView) {
          let startTimestamp: number | undefined;
          const duration = 2000; // 2 seconds animation
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = progress * (endValue - startValue) + startValue;
            
            setCount(currentCount);
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          window.requestAnimationFrame(step);
          controls.start({ opacity: 1, scale: 1 });
        }
      }, [inView, startValue, endValue]);
      
      return (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          transition={{ duration: 0.5 }}
          className={`text-4xl md:text-5xl font-bold ${color} font-heading`}
        >
          {precision > 0 ? count.toFixed(precision) : Math.floor(count)}
          {suffix}
        </motion.span>
      );
    };
  
    return (
      <div className="py-20 bg-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-900/20 via-transparent to-ai-purple-900/20 z-0" />
        
        <div className="absolute inset-0 z-0">
          {/* Animated light beams */}
          <motion.div
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: [0.1, 0.2, 0.1], rotate: -45, scale: 1 }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-t from-ai-blue-500/0 to-ai-blue-500/10 blur-lg"
          />
          <motion.div
            initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
            animate={{ opacity: [0.1, 0.2, 0.1], rotate: 45, scale: 1 }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-b from-ai-teal-500/0 to-ai-teal-500/10 blur-lg"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-heading text-3xl md:text-4xl font-bold mb-4 font-heading">
              Trusted by <span className="ai-gradient-text">Thousands</span> of Learners
            </h2>
            <p className="text-neutral-accent max-w-xl mx-auto font-sans">
              Join our growing community of AI enthusiasts and professionals building the future.
            </p>
          </motion.div>
          
          <motion.div
            ref={ref}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10 group"
              >
                <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                  <div className="mb-2 relative">
                    <Counter 
                      startValue={stat.startValue} 
                      endValue={stat.endValue} 
                      suffix={stat.suffix} 
                      precision={stat.precision} 
                      color={stat.color} 
                    />
                    <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
                  </div>
                  <div className="text-neutral-accent font-medium uppercase tracking-wider text-sm font-sans">
                    {stat.label}
                  </div>
                </div>
                
                {/* Connector lines */}
                {index < stats.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[1px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  };
  
  export default StatsSection;