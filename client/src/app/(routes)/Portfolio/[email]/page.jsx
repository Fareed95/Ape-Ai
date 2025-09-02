'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef, use } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Palette, Edit, Star, ChevronRight, ExternalLink, Award, BookOpen, Code, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';

// Custom cursor component
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
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

// Hero section with 3D text effect
const Hero3D = ({ text }) => {
    const letters = Array.from(text);

    return (
        <div className="relative flex flex-wrap justify-center px-4">
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 100
                    }}
                    className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white relative px-0.5 sm:px-1"
                    style={{
                        textShadow: "0 0 20px rgba(255,255,255,0.2)",
                        transform: "perspective(1000px)"
                    }}
                    whileHover={{
                        rotateX: 10,
                        rotateY: 15,
                        scale: 1.1,
                        transition: { duration: 0.2 }
                    }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </div>
    );
};

// Floating animation for background elements
const FloatingElement = ({ children, delay = 0 }) => {
    return (
        <motion.div
            animate={{
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0],
            }}
            transition={{
                duration: 5,
                delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }}
            className="transform-gpu" // Add hardware acceleration
        >
            {children}
        </motion.div>
    );
};

// Section Header component
const SectionHeader = ({ children }) => {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 relative w-full px-4 sm:px-6 md:px-8"
        >
            <span className="relative z-10 block text-center">{children}</span>
            <motion.div
                className="absolute -bottom-2 left-0 right-0 mx-4 sm:mx-6 md:mx-8 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            />
        </motion.h2>
    );
};

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

const AIHero = ({ userDetails }) => (
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

const AISkillCard = ({ toolName }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative overflow-hidden w-full"
    >
        <GlowingBorder>
            <div className="p-3 xs:p-4 sm:p-5 md:p-6 rounded-lg bg-neutral-900/50 backdrop-blur-xl relative z-10">
                <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-neutral-200 mb-2 xs:mb-3 sm:mb-4">{toolName.name}</h3>
                <div className="space-y-2 xs:space-y-3">
                    {toolName.tools?.map((tool) => (
                        <motion.div
                            key={tool.id}
                            className="space-y-1 xs:space-y-2"
                            whileHover={{ x: 5 }}
                        >
                            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-cyan-400 font-medium flex items-center">
                                <span className="mr-1 xs:mr-2">⚡</span>
                                {tool.name}
                            </p>
                            {tool.components?.map((component) => (
                                <p key={component.id} className="text-xs xs:text-sm sm:text-base text-neutral-400 pl-4 xs:pl-6 flex items-center">
                                    <span className="w-1 h-1 bg-cyan-500 rounded-full mr-1 xs:mr-2" />
                                    {component.name}
                                </p>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </GlowingBorder>
    </motion.div>
);

const TextRevealCard = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden rounded-xl w-full"
        >
            <motion.div
                className="relative z-10 w-full"
                animate={{
                    y: isHovered ? -5 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

// Enhanced skill card with 3D hover effect
const SkillCard = ({ skill }) => {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                rotateX: 10,
                rotateY: 15,
                z: 50
            }}
            className="relative group w-full"
        >
            <GlassCard className="p-4 xs:p-5 sm:p-6 transform transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300" />
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2 xs:mb-3 sm:mb-4 flex items-center">
                    <Code className="w-4 h-4 xs:w-5 xs:h-5 mr-1.5 xs:mr-2 text-purple-400" />
                    {skill.name}
                </h3>
                <div className="space-y-1.5 xs:space-y-2">
                    {skill.tools?.map((tool, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center space-x-1.5 xs:space-x-2"
                        >
                            <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 text-purple-400" />
                            <span className="text-sm xs:text-base text-neutral-300">{tool.name}</span>
                        </motion.div>
                    ))}
                </div>
            </GlassCard>
        </motion.div>
    );
};

const GlowingBorder = ({ children }) => (
    <div className="relative group w-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        {children}
    </div>
);

// Project card with advanced hover effects
const ProjectCard = ({ project }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative group w-full"
        >
            <GlassCard className="p-4 xs:p-5 sm:p-6">
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 blur-lg"
                    />
                </div>

                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-2 xs:mb-3">{project.name}</h3>
                <p className="text-sm xs:text-base text-neutral-400 mb-3 xs:mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 xs:gap-2">
                    {project.link?.map((link, idx) => (
                        <motion.a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-purple-500/10 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors flex items-center space-x-1.5 xs:space-x-2 text-xs xs:text-sm"
                        >
                            <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4" />
                            <span>{link.name}</span>
                        </motion.a>
                    ))}
                </div>
            </GlassCard>
        </motion.div>
    );
};

// Main template components with enhanced UI
const TemplateOne = ({ userDetails, portfolioData }) => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    return (
        <div ref={scrollRef} className="min-h-screen relative">
            {/* Background Scene with Particles */}
            <div className="absolute inset-0 z-0">
            </div>
            <CustomCursor />

            {/* Background Decorations with adjusted z-index and blend mode */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none mix-blend-plus-lighter">
                {[...Array(5)].map((_, i) => (
                    <FloatingElement key={i} delay={i * 0.5}>
                        <div
                            className="absolute w-32 sm:w-48 md:w-56 lg:w-64 h-32 sm:h-48 md:h-56 lg:h-64 rounded-full"
                            style={{
                                background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(99,102,241,0.1)' : 'rgba(168,85,247,0.1)'
                                    } 0%, transparent 70%)`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                transform: 'translate(-50%, -50%)',
                                mixBlendMode: 'plus-lighter',
                            }}
                        />
                    </FloatingElement>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-20">
                {/* Hero Section */}
                <div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
                    <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Hero3D text={userDetails?.name || "Portfolio"} />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mt-4 sm:mt-6 md:mt-8 text-center mx-auto px-4"
                        >
                            {userDetails?.about}
                        </motion.p>
                    </AnimatedSection>
                </div>

                {/* Skills Grid */}
                <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                    <SectionHeader>Skills & Expertise</SectionHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {portfolioData?.toolNames?.map((tool, idx) => (
                            <SkillCard key={idx} skill={tool} />
                        ))}
                    </div>
                </AnimatedSection>

                {/* Projects Section */}
                <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                    <SectionHeader>Featured Projects</SectionHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {portfolioData?.userDetails?.project?.map((project, idx) => (
                            <ProjectCard key={idx} project={project} />
                        ))}
                    </div>
                </AnimatedSection>

                {/* Education & Certificates */}
                <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Education */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Education</h2>
                            <div className="space-y-4 sm:space-y-6">
                                {portfolioData?.userDetails?.education?.map((edu, idx) => (
                                    <GlassCard key={idx} className="p-4 sm:p-6">
                                        <h3 className="text-lg sm:text-xl font-bold text-white">{edu.degree}</h3>
                                        <p className="text-purple-400 mt-2">{edu.field_of_study}</p>
                                        <p className="text-neutral-400">{edu.University}</p>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
                                            <p className="text-neutral-500 text-sm sm:text-base">{edu.location}</p>
                                            <p className="text-neutral-500 text-sm sm:text-base mt-2 sm:mt-0">{edu.start_date} - {edu.end_date}</p>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>

                        {/* Certificates */}
                        <div className="mt-8 lg:mt-0">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Certificates</h2>
                            <div className="space-y-4 sm:space-y-6">
                                {portfolioData?.userDetails?.certificate?.map((cert, idx) => (
                                    <GlassCard key={idx} className="p-4 sm:p-6">
                                        <h3 className="text-lg sm:text-xl font-bold text-white">{cert.name}</h3>
                                        <p className="text-purple-400 mt-2">{cert.issuing_organization}</p>
                                        <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
                                            <p className="text-neutral-500 text-sm sm:text-base">Battles: {cert.competition_battled}</p>
                                            <p className="text-neutral-500 text-sm sm:text-base mt-2 sm:mt-0">Wins: {cert.competition_won}</p>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

const TemplateTwo = ({ userDetails, portfolioData }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse movement for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-transparent text-white relative overflow-hidden"
        >
            {/* Background Scene with Particles */}
            <div className="absolute inset-0 z-0">
            </div>
            <CustomCursor />

            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-10">
                <motion.div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] mix-blend-soft-light"
                    style={{
                        x: mousePosition.x * -0.5,
                        y: mousePosition.y * -0.5,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
            </div>

            {/* Floating Orbs with adjusted z-index */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full z-10"
                    style={{
                        background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(99,102,241,0.1)' : 'rgba(168,85,247,0.1)'} 0%, transparent 70%)`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: 'translate(-50%, -50%)',
                        mixBlendMode: 'plus-lighter',
                    }}
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-center mb-12 sm:mb-16 md:mb-20 relative"
                        >
                            {/* Glowing effect behind name */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                                animate={{
                                    filter: ["blur(40px)", "blur(60px)", "blur(40px)"],
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            >
                                <div className="w-full h-full bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30" />
                            </motion.div>

                            <Hero3D text={userDetails?.name || "Portfolio"} />

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mt-6 sm:mt-8 px-4"
                            >
                                {userDetails?.about}
                            </motion.p>
                        </motion.div>

                        {/* Skills Grid with Enhanced Cards */}
                        <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
                            <SectionHeader>Technical Expertise</SectionHeader>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {portfolioData?.toolNames?.map((tool, index) => (
                                    <motion.div
                                        key={tool.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative"
                                    >
                                        <GlassCard className="p-4 sm:p-6">
                                            <motion.div
                                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 opacity-0 transition-opacity duration-300"
                                                style={{ padding: '1px' }}
                                            >
                                                <div className="w-full h-full bg-neutral-900 rounded-xl" />
                                            </motion.div>

                                            <div className="relative z-10">
                                                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center">
                                                    <Code className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-400" />
                                                    {tool.name}
                                                </h3>
                                                <div className="space-y-2">
                                                    {tool.tools?.map((t, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="flex items-center space-x-2"
                                                        >
                                                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                                            <span className="text-sm sm:text-base text-neutral-300">{t.name}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatedSection>

                        {/* Projects Section */}
                        <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
                            <SectionHeader>Featured Projects</SectionHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {portfolioData?.userDetails?.project?.map((proj, idx) => (
                                    <ProjectCard key={idx} project={proj} />
                                ))}
                            </div>
                        </AnimatedSection>

                        {/* Education & Certificates Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                            <AnimatedSection>
                                <SectionHeader>Education</SectionHeader>
                                <div className="space-y-4 sm:space-y-6">
                                    {portfolioData?.userDetails?.education?.map((edu, idx) => (
                                        <GlassCard key={idx} className="p-4 sm:p-6 relative overflow-hidden group">
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            />
                                            <div className="relative z-10">
                                                <h3 className="text-lg sm:text-xl font-bold text-white">{edu.degree}</h3>
                                                <p className="text-indigo-400 mt-2">{edu.field_of_study}</p>
                                                <p className="text-neutral-400">{edu.University}</p>
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                                                    <p className="text-neutral-500 text-sm sm:text-base">{edu.location}</p>
                                                    <p className="text-neutral-500 text-sm sm:text-base mt-2 sm:mt-0">{edu.start_date} - {edu.end_date}</p>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    ))}
                                </div>
                            </AnimatedSection>

                            <AnimatedSection>
                                <SectionHeader>Certificates</SectionHeader>
                                <div className="space-y-4 sm:space-y-6">
                                    {portfolioData?.userDetails?.certificate?.map((cert, idx) => (
                                        <GlassCard key={idx} className="p-4 sm:p-6 relative overflow-hidden group">
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            />
                                            <div className="relative z-10">
                                                <h3 className="text-lg sm:text-xl font-bold text-white">{cert.name}</h3>
                                                <p className="text-indigo-400 mt-2">{cert.issuing_organization}</p>
                                                <div className="flex flex-col sm:flex-row justify-between mt-4">
                                                    <p className="text-neutral-500 text-sm sm:text-base">Battles: {cert.competition_battled}</p>
                                                    <p className="text-neutral-500 text-sm sm:text-base mt-2 sm:mt-0">Wins: {cert.competition_won}</p>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    ))}
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TemplateThree = ({ userDetails, portfolioData }) => {
    return (
        <div className="min-h-screen bg-neutral-950 relative">
            <AIEffect />
            <AIHero userDetails={userDetails} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
                {/* Skills Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute -top-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                            AI Skills & Expertise
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {portfolioData?.toolNames?.map((toolName) => (
                            <AISkillCard key={toolName.id} toolName={toolName} />
                        ))}
                    </div>
                </motion.section>

                {/* Education Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <TextRevealCard>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-200 mb-6 sm:mb-8">Education</h2>
                            <div className="space-y-4 sm:space-y-6">
                                {portfolioData?.userDetails?.education?.map((edu) => (
                                    <motion.div
                                        key={edu.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-4 sm:p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all duration-300"
                                    >
                                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-semibold text-neutral-200">{edu.degree}</h3>
                                                <p className="text-blue-400 mt-2">{edu.field_of_study}</p>
                                                <p className="text-neutral-400 mt-1">{edu.University}</p>
                                                <p className="text-neutral-400">{edu.location}</p>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <p className="text-neutral-300">{edu.start_date} - {edu.end_date}</p>
                                                {edu.current_grade && (
                                                    <p className="text-blue-400 mt-2">Grade: {edu.current_grade}</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </TextRevealCard>
                </motion.section>

                {/* Projects Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <TextRevealCard>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-200 mb-6 sm:mb-8">Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {portfolioData?.userDetails?.project?.map((proj) => (
                                    <motion.div
                                        key={proj.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -5 }}
                                        className="p-4 sm:p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all duration-300"
                                    >
                                        <h3 className="text-lg sm:text-xl font-semibold text-neutral-200">{proj.name}</h3>
                                        <p className="text-neutral-400 mt-4">{proj.description}</p>
                                        <div className="mt-6">
                                            {proj.link && proj.link.length > 0 && (
                                                <div className="flex flex-wrap gap-3 mt-4">
                                                    {proj.link.map((link) => (
                                                        <motion.a
                                                            key={link.id}
                                                            href={link.url || link.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-3 sm:px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 text-sm cursor-pointer"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            {link.name}
                                                        </motion.a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </TextRevealCard>
                </motion.section>

                {/* Certificates Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <TextRevealCard>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-200 mb-6 sm:mb-8">Certificates</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {portfolioData?.userDetails?.certificate?.map((cert) => (
                                    <motion.div
                                        key={cert.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -5 }}
                                        className="p-4 sm:p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all duration-300"
                                    >
                                        <h3 className="text-lg sm:text-xl font-semibold text-neutral-200">{cert.name}</h3>
                                        <p className="text-blue-400 mt-2">{cert.issuing_organization}</p>
                                        <div className="flex flex-col sm:flex-row justify-between mt-4">
                                            <p className="text-neutral-400">Competition Battled: {cert.competition_battled}</p>
                                            <p className="text-neutral-400 mt-2 sm:mt-0">Competition Won: {cert.competition_won}</p>
                                        </div>
                                        {cert.credential_id && (
                                            <p className="text-blue-400 mt-2">Credential ID: {cert.credential_id}</p>
                                        )}
                                        {cert.credential_url && (
                                            <motion.a
                                                href={cert.credential_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block px-3 sm:px-4 py-2 mt-4 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 text-sm"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                View Certificate
                                            </motion.a>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </TextRevealCard>
                </motion.section>
            </div>
        </div>
    );
};

const pageTransitionVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 }
};

// Enhanced skeleton loader for portfolio page
const PortfolioSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navbar skeleton */}
        <div className="flex items-center justify-between mb-12 animate-pulse">
          <div className="h-8 w-28 bg-neutral-800/70 rounded-lg"></div>
          <div className="flex space-x-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 w-16 bg-neutral-800/70 rounded-lg"></div>
            ))}
          </div>
        </div>
        
        {/* Header skeleton */}
        <div className="mb-12 animate-pulse">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-32 h-32 rounded-full bg-neutral-800/50 mb-4"></div>
            <div className="flex-1">
              <div className="h-10 w-64 bg-neutral-800/70 rounded-lg mb-4"></div>
              <div className="h-5 w-40 bg-neutral-800/50 rounded-lg mb-6"></div>
              <div className="h-20 w-full bg-neutral-800/30 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Skills section skeleton */}
        <div className="mb-16 animate-pulse">
          <div className="h-8 w-32 bg-neutral-800/70 rounded-lg mb-6"></div>
          <div className="flex flex-wrap gap-3">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-10 w-24 bg-neutral-800/40 rounded-full"></div>
            ))}
          </div>
        </div>
        
        {/* Projects section skeleton */}
        <div className="mb-16 animate-pulse">
          <div className="h-8 w-36 bg-neutral-800/70 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800/50">
                <div className="h-8 w-48 bg-neutral-800/70 rounded-lg mb-4"></div>
                <div className="h-4 w-full bg-neutral-800/40 rounded-md mb-3"></div>
                <div className="h-4 w-2/3 bg-neutral-800/40 rounded-md mb-3"></div>
                <div className="h-4 w-3/4 bg-neutral-800/40 rounded-md mb-6"></div>
                <div className="flex gap-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="h-6 w-16 bg-neutral-800/50 rounded-full"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Education section skeleton */}
        <div className="animate-pulse">
          <div className="h-8 w-44 bg-neutral-800/70 rounded-lg mb-6"></div>
          <div className="space-y-4">
            {Array(2).fill(0).map((_, i) => (
              <div key={i} className="bg-neutral-900/50 rounded-xl p-5 border border-neutral-800/50">
                <div className="h-7 w-64 bg-neutral-800/70 rounded-lg mb-3"></div>
                <div className="h-4 w-40 bg-neutral-800/50 rounded-lg mb-2"></div>
                <div className="h-4 w-full bg-neutral-800/40 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = ({ params }) => {
    const unwrappedParams = use(params);
    const decodedEmail = decodeURIComponent(unwrappedParams.email);

    const { user } = useAuth();

    // Update the ownership check to compare both  email and auth context email
    const isOwner = (user?.email === decodedEmail) || (user?.email === decodedEmail);

    // Simplify the auth check to just require either the  token or ownership
    const canEdit = isOwner && (user?.accessToken || user?.email);

    const { portfolioData, updateUserDetails, loading, error } = usePortfolio(decodedEmail);
    const [isEditing, setIsEditing] = useState(false);
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState('template1');
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    // Add these states for each section
    const [educationItems, setEducationItems] = useState([]);
    const [projectItems, setProjectItems] = useState([]);
    const [certificateItems, setCertificateItems] = useState([]);
    const [toolItems, setToolItems] = useState([]);

    // Education handlers
    const handleAddEducation = () => {
        setEducationItems([...educationItems, {
            id: `new-${Date.now()}`,  // Use string prefix to identify new items
            degree: '',
            field_of_study: '',
            University: '',
            location: '',
            start_date: '',
            end_date: '',
            current_grade: ''
        }]);
    };

    const handleRemoveEducation = async (id) => {
        // Only make a delete API request if the ID is a database ID (numeric)
        if (typeof id === 'number') {
            try {
                // Get auth token from  if available
                const token = user?.accessToken || '';
                const headers = {
                    'Content-Type': 'application/json',
                };
                
                // Add authorization header if token exists
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                const response = await fetch(`https://api-ape.crodlin.in/api/education/${id}/`, {
                    method: 'DELETE',
                    headers,
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`Failed to delete education: ${errorData.message || response.statusText}`);
                }

                toast.success('Education entry removed');
            } catch (error) {
                console.error('Error removing education:', error);
                toast.error(error.message || 'Failed to remove education entry');
                return; // Don't remove from UI if server delete failed
            }
        } else {
            // For new items (with string IDs), just remove from UI without API call
            toast.success('Education entry removed');
        }

        // Remove from UI state
        setEducationItems(educationItems.filter(item => item.id !== id));
    };

    const handleEducationChange = (id, field, value) => {
        setEducationItems(educationItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    // Project handlers
    const handleAddProject = () => {
        setProjectItems([...projectItems, {
            id: `new-${Date.now()}`,  // Use string prefix to identify new items
            name: '',
            description: '',
            links: []
        }]);
    };

    const handleRemoveProject = async (id) => {
        // Only make a delete API request if the ID is a database ID (numeric)
        if (typeof id === 'number') {
            try {
                // Get auth token from  if available
                const token = user?.accessToken || '';
                const headers = {
                    'Content-Type': 'application/json',
                };
                
                // Add authorization header if token exists
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                const response = await fetch(`https://api-ape.crodlin.in/api/projects/${id}/`, {
                    method: 'DELETE',
                    headers,
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`Failed to delete project: ${errorData.message || response.statusText}`);
                }

                toast.success('Project removed');
            } catch (error) {
                console.error('Error removing project:', error);
                toast.error(error.message || 'Failed to remove project');
                return; // Don't remove from UI if server delete failed
            }
        } else {
            // For new items (with string IDs), just remove from UI without API call
            toast.success('Project removed');
        }

        // Remove from UI state
        setProjectItems(projectItems.filter(item => item.id !== id));
    };

    const handleProjectChange = (id, field, value) => {
        setProjectItems(projectItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleAddProjectLink = (projectId) => {
        setProjectItems(projectItems.map(project => {
            if (project.id === projectId) {
                return {
                    ...project,
                    links: [...project.links, { id: `new-${Date.now()}`, name: '', url: '' }]
                };
            }
            return project;
        }));
    };

    const handleRemoveProjectLink = async (projectId, linkId) => {
        // Only make a delete API request if the ID is a database ID (numeric)
        if (typeof linkId === 'number') {
            try {
                // Get auth token from  if available
                const token = user?.accessToken || '';
                const headers = {
                    'Content-Type': 'application/json',
                };
                
                // Add authorization header if token exists
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                const response = await fetch(`https://api-ape.crodlin.in/api/links/${linkId}/`, {
                    method: 'DELETE',
                    headers,
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`Failed to delete project link: ${errorData.message || response.statusText}`);
                }
                
                toast.success('Link removed');
            } catch (error) {
                console.error('Error removing project link:', error);
                toast.error(error.message || 'Failed to remove project link');
                return; // Don't remove from UI if server delete failed
            }
        } else {
            // For new items (with string IDs), just remove from UI without API call
            toast.success('Link removed');
        }

        // Remove from UI state
        setProjectItems(projectItems.map(project => {
            if (project.id === projectId) {
                return {
                    ...project,
                    links: project.links.filter(link => link.id !== linkId)
                };
            }
            return project;
        }));
    };

    const handleProjectLinkChange = (projectId, linkId, field, value) => {
        setProjectItems(projectItems.map(project => {
            if (project.id === projectId) {
                return {
                    ...project,
                    links: project.links.map(link =>
                        link.id === linkId ? { ...link, [field]: value } : link
                    )
                };
            }
            return project;
        }));
    };

    // Certificate handlers
    // const handleAddCertificate = () => {
    //     setCertificateItems([...certificateItems, {
    //         id: Date.now(),
    //         name: '',          
    //         competition_battled: 0,
    //         competition_won: 0
    //     }]);
    // };      

    // const handleRemoveCertificate = async (id) => {
    //     // If the item has a database ID (numeric), delete it from the database
    //     if (typeof id === 'number') {
    //         try {
    //             const response = await fetch(`https://api-ape.crodlin.in/api/certificates/${id}/`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Failed to delete certificate');
    //             }

    //             toast.success('Certificate removed');
    //         } catch (error) {
    //             console.error('Error removing certificate:', error);
    //             toast.error('Failed to remove certificate: ' + error.message);
    //             return; // Don't remove from UI if server delete failed
    //         }
    //     }

    //     // Remove from UI state
    //     setCertificateItems(certificateItems.filter(item => item.id !== id));
    // };

    // const handleCertificateChange = (id, field, value) => {
    //     setCertificateItems(certificateItems.map(item => 
    //         item.id === id ? { ...item, [field]: value } : item
    //     ));
    // };

    // Tools handlers
    const handleAddToolName = () => {
        setToolItems([...toolItems, {
            id: `new-${Date.now()}`,  // Use string prefix to identify new items
            name: '',
            tools: []
        }]);
    };

    const handleRemoveToolName = async (id) => {
        // Only make a delete API request if the ID is a database ID (numeric)
        if (typeof id === 'number') {
            try {
                // Get auth token from  if available
                const token = user?.accessToken || '';
                const headers = {
                    'Content-Type': 'application/json',
                };
                
                // Add authorization header if token exists
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                const response = await fetch(`https://api-ape.crodlin.in/api/toolnames/${id}/`, {
                    method: 'DELETE',
                    headers,
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`Failed to delete tool category: ${errorData.message || response.statusText}`);
                }

                toast.success('Tool category removed');
            } catch (error) {
                console.error('Error removing tool category:', error);
                toast.error(error.message || 'Failed to remove tool category');
                return; // Don't remove from UI if server delete failed
            }
        } else {
            // For new items (with string IDs), just remove from UI without API call
            toast.success('Tool category removed');
        }

        // Remove from UI state
        setToolItems(toolItems.filter(item => item.id !== id));
    };

    const handleToolNameChange = (id, value) => {
        setToolItems(toolItems.map(item =>
            item.id === id ? { ...item, name: value } : item
        ));
    };

    const handleAddToolItem = (toolNameId) => {
        setToolItems(toolItems.map(toolName => {
            if (toolName.id === toolNameId) {
                return {
                    ...toolName,
                    tools: [...toolName.tools, { id: `new-${Date.now()}`, name: '' }]
                };
            }
            return toolName;
        }));
    };

    const handleRemoveToolItem = async (toolNameId, toolId) => {
        // Only make a delete API request if the ID is a database ID (numeric)
        if (typeof toolId === 'number') {
            try {
                // Get auth token from  if available
                const token = user?.accessToken || '';
                const headers = {
                    'Content-Type': 'application/json',
                };
                
                // Add authorization header if token exists
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                const response = await fetch(`https://api-ape.crodlin.in/api/tools/${toolId}/`, {
                    method: 'DELETE',
                    headers,
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`Failed to delete tool: ${errorData.message || response.statusText}`);
                }
                
                toast.success('Tool removed');
            } catch (error) {
                console.error('Error removing tool:', error);
                toast.error(error.message || 'Failed to remove tool');
                return; // Don't remove from UI if server delete failed
            }
        } else {
            // For new items (with string IDs), just remove from UI without API call
            toast.success('Tool removed');
        }

        // Remove from UI state
        setToolItems(toolItems.map(toolName => {
            if (toolName.id === toolNameId) {
                return {
                    ...toolName,
                    tools: toolName.tools.filter(tool => tool.id !== toolId)
                };
            }
            return toolName;
        }));
    };

    const handleToolItemChange = (toolNameId, toolId, value) => {
        setToolItems(toolItems.map(toolName => {
            if (toolName.id === toolNameId) {
                return {
                    ...toolName,
                    tools: toolName.tools.map(tool =>
                        tool.id === toolId ? { ...tool, name: value } : tool
                    )
                };
            }
            return toolName;
        }));
    };

    useEffect(() => {
        if (portfolioData?.userDetails) {
            setUserDetails({
                id: portfolioData.userDetails.id,
                name: portfolioData.userDetails.name || '',
                email: portfolioData.userDetails.email || '',
                phone_number: portfolioData.userDetails.phone_number || '',
                about: portfolioData.userDetails.about || '',
                education: portfolioData.userDetails.education || [],
                project: portfolioData.userDetails.project || [],
                certificate: portfolioData.userDetails.certificate || [],
                tool: portfolioData.userDetails.tool || [],
            });
        }
    }, [portfolioData]);

    // Add this useEffect to set the initial template based on portfolioData
    useEffect(() => {
        if (portfolioData?.userDetails?.template !== undefined) {
            const templateMap = {
                0: 'template1',
                1: 'template2',
                2: 'template3'
            };
            setCurrentTemplate(templateMap[portfolioData.userDetails.template] || 'template1');
        }
    }, [portfolioData]);

    // Add this useEffect to populate form fields when editing is enabled
    useEffect(() => {
        if (isEditing && portfolioData) {
            // Load existing education data
            if (portfolioData.userDetails?.education) {
                setEducationItems(portfolioData.userDetails.education.map(edu => ({
                    ...edu,
                    id: edu.id // Keep the original ID for existing items
                })));
            }

            // Load existing project data
            if (portfolioData.userDetails?.project) {
                setProjectItems(portfolioData.userDetails.project.map(proj => ({
                    ...proj,
                    id: proj.id,
                    links: proj.link ? proj.link.map(link => ({
                        id: link.id,
                        name: link.name,
                        url: link.url
                    })) : []
                })));
            }

            // Load existing tool data
            if (portfolioData.toolNames) {
                setToolItems(portfolioData.toolNames.map(toolName => ({
                    id: toolName.id,
                    name: toolName.name,
                    tools: toolName.tools ? toolName.tools.map(tool => ({
                        id: tool.id,
                        name: tool.name
                    })) : []
                })));
            }
        }
    }, [isEditing, portfolioData]);

    // Modify handleUpdateUserDetails to handle both creation and updates
    const handleUpdateUserDetails = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Get auth token from  if available
            const token = user?.accessToken || '';
            const headers = {
                'Content-Type': 'application/json',
            };
            
            // Add authorization header if token exists
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            // 1. Update user details first
            const userResponse = await fetch(`https://api-ape.crodlin.in/api/userdetails/${decodedEmail}/`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({
                    name: userDetails.name || '',
                    email: userDetails.email || '',
                    phone_number: userDetails.phone_number || '',
                    about: userDetails.about || '',
                }),
            });

            if (!userResponse.ok) {
                const errorData = await userResponse.json().catch(() => ({}));
                throw new Error(`Failed to update user details: ${errorData.message || userResponse.statusText}`);
            }
            
            const userData = await userResponse.json();
            const userId = userData.id;

            // Education - handle both updates and new items
            if (educationItems.length > 0) {
                for (const education of educationItems) {
                    const current_grade = education.current_grade ?
                        parseFloat(education.current_grade) : null;

                    const educationData = {
                        degree: education.degree || '',
                        field_of_study: education.field_of_study || '',
                        University: education.University || '',
                        location: education.location || '',
                        start_date: education.start_date || '',
                        end_date: education.end_date || '',
                        current_grade: current_grade,
                        user: userId
                    };

                    try {
                        // Check if item is new by looking for the 'new-' prefix in the id
                        const isNewItem = typeof education.id === 'string' && education.id.startsWith('new-');
                        
                        if (!isNewItem && typeof education.id === 'number') {
                            // Update existing education with PATCH
                            const response = await fetch(`https://api-ape.crodlin.in/api/education/${education.id}/`, {
                                method: 'PATCH',
                                headers,
                                body: JSON.stringify(educationData),
                            });
                            
                            if (!response.ok) {
                                const errorData = await response.json().catch(() => ({}));
                                throw new Error(`Failed to update education: ${errorData.message || response.statusText}`);
                            }
                        } else {
                            // Create new education with POST
                            const response = await fetch(`https://api-ape.crodlin.in/api/education/`, {
                                method: 'POST',
                                headers,
                                body: JSON.stringify(educationData),
                            });
                            
                            if (!response.ok) {
                                const errorData = await response.json().catch(() => ({}));
                                console.error('Education creation error:', errorData);
                                throw new Error(`Failed to create education: ${errorData.message || response.statusText}`);
                            }
                        }
                    } catch (eduError) {
                        console.error('Education save error:', eduError);
                        toast.error(eduError.message);
                    }
                }
            }

            // Projects - handle both updates and new items
            if (projectItems.length > 0) {
                for (const project of projectItems) {
                    let projectId;

                    const projectData = {
                        name: project.name || '',
                        description: project.description || '',
                        user: userId
                    };

                    try {
                        // Check if item is new by looking for the 'new-' prefix in the id
                        const isNewItem = typeof project.id === 'string' && project.id.startsWith('new-');
                        
                        if (!isNewItem && typeof project.id === 'number') {
                            // Update existing project
                            const response = await fetch(`https://api-ape.crodlin.in/api/projects/${project.id}/`, {
                                method: 'PATCH',
                                headers,
                                body: JSON.stringify(projectData),
                            });
                            
                            if (!response.ok) {
                                const errorData = await response.json().catch(() => ({}));
                                throw new Error(`Failed to update project: ${errorData.message || response.statusText}`);
                            }

                            projectId = project.id;
                        } else {
                            // Create new project
                            const createResponse = await fetch(`https://api-ape.crodlin.in/api/projects/`, {
                                method: 'POST',
                                headers,
                                body: JSON.stringify(projectData),
                            });
                            
                            if (!createResponse.ok) {
                                const errorData = await createResponse.json().catch(() => ({}));
                                console.error('Project creation error:', errorData);
                                throw new Error(`Failed to create project: ${errorData.message || createResponse.statusText}`);
                            }

                            const newProject = await createResponse.json();
                            projectId = newProject.id;
                        }

                        // Handle project links
                        if (project.links && project.links.length > 0) {
                            for (const link of project.links) {
                                const linkData = {
                                    name: link.name || '',
                                    url: link.url || '',
                                    project: projectId
                                };

                                try {
                                    // Check if item is new by looking for the 'new-' prefix in the id
                                    const isNewLink = typeof link.id === 'string' && link.id.startsWith('new-');
                                    
                                    if (!isNewLink && typeof link.id === 'number') {
                                        // Update existing link
                                        const response = await fetch(`https://api-ape.crodlin.in/api/links/${link.id}/`, {
                                            method: 'PATCH',
                                            headers,
                                            body: JSON.stringify(linkData),
                                        });
                                        
                                        if (!response.ok) {
                                            const errorData = await response.json().catch(() => ({}));
                                            throw new Error(`Failed to update link: ${errorData.message || response.statusText}`);
                                        }
                                    } else {
                                        // Create new link
                                        const response = await fetch(`https://api-ape.crodlin.in/api/links/`, {
                                            method: 'POST',
                                            headers,
                                            body: JSON.stringify(linkData),
                                        });
                                        
                                        if (!response.ok) {
                                            const errorData = await response.json().catch(() => ({}));
                                            console.error('Link creation error:', errorData);
                                            throw new Error(`Failed to create link: ${errorData.message || response.statusText}`);
                                        }
                                    }
                                } catch (linkError) {
                                    console.error('Link save error:', linkError);
                                    toast.error(linkError.message);
                                }
                            }
                        }
                    } catch (projectError) {
                        console.error('Project save error:', projectError);
                        toast.error(projectError.message);
                    }
                }
            }

            // Tools - handle both updates and new items
            if (toolItems.length > 0) {
                for (const toolCategory of toolItems) {
                    let toolNameId;

                    try {
                        // Check if item is new by looking for the 'new-' prefix in the id
                        const isNewCategory = typeof toolCategory.id === 'string' && toolCategory.id.startsWith('new-');
                        
                        if (!isNewCategory && typeof toolCategory.id === 'number') {
                            // Update existing tool category
                            const response = await fetch(`https://api-ape.crodlin.in/api/toolnames/${toolCategory.id}/`, {
                                method: 'PATCH',
                                headers,
                                body: JSON.stringify({
                                    name: toolCategory.name || '',
                                    user: userId
                                }),
                            });
                            
                            if (!response.ok) {
                                const errorData = await response.json().catch(() => ({}));
                                throw new Error(`Failed to update tool category: ${errorData.message || response.statusText}`);
                            }

                            toolNameId = toolCategory.id;
                        } else {
                            // Create new tool category
                            const createResponse = await fetch(`https://api-ape.crodlin.in/api/toolnames/`, {
                                method: 'POST',
                                headers,
                                body: JSON.stringify({
                                    name: toolCategory.name || '',
                                    user: userId
                                }),
                            });
                            
                            if (!createResponse.ok) {
                                const errorData = await createResponse.json().catch(() => ({}));
                                console.error('Tool category creation error:', errorData);
                                throw new Error(`Failed to create tool category: ${errorData.message || createResponse.statusText}`);
                            }

                            const newToolName = await createResponse.json();
                            toolNameId = newToolName.id;
                        }

                        // Handle tools within this category
                        if (toolCategory.tools && toolCategory.tools.length > 0) {
                            for (const tool of toolCategory.tools) {
                                const toolData = {
                                    name: tool.name || '',
                                    tool_name: toolNameId
                                };

                                try {
                                    // Check if item is new by looking for the 'new-' prefix in the id
                                    const isNewTool = typeof tool.id === 'string' && tool.id.startsWith('new-');
                                    
                                    if (!isNewTool && typeof tool.id === 'number') {
                                        // Update existing tool
                                        const response = await fetch(`https://api-ape.crodlin.in/api/tools/${tool.id}/`, {
                                            method: 'PATCH',
                                            headers,
                                            body: JSON.stringify(toolData),
                                        });
                                        
                                        if (!response.ok) {
                                            const errorData = await response.json().catch(() => ({}));
                                            throw new Error(`Failed to update tool: ${errorData.message || response.statusText}`);
                                        }
                                    } else {
                                        // Create new tool
                                        const response = await fetch(`https://api-ape.crodlin.in/api/tools/`, {
                                            method: 'POST',
                                            headers,
                                            body: JSON.stringify(toolData),
                                        });
                                        
                                        if (!response.ok) {
                                            const errorData = await response.json().catch(() => ({}));
                                            console.error('Tool creation error:', errorData);
                                            throw new Error(`Failed to create tool: ${errorData.message || response.statusText}`);
                                        }
                                    }
                                } catch (toolError) {
                                    console.error('Tool save error:', toolError);
                                    toast.error(toolError.message);
                                }
                            }
                        }
                    } catch (toolCategoryError) {
                        console.error('Tool category save error:', toolCategoryError);
                        toast.error(toolCategoryError.message);
                    }
                }
            }

            // Refresh portfolio data after all updates
            await updateUserDetails();
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        }
        catch (error) {
            console.error('Error updating user details:', error);
            toast.error(error.message || 'Failed to update user details');
        }
        finally {
            setIsLoading(false);
        }
    };

    // Modify handleTemplateChange to update both local state and backend
    const handleTemplateChange = async (template) => {
        let templateValue;
        switch (template) {
            case 'template1':
                templateValue = 0;
                break;
            case 'template2':
                templateValue = 1;
                break;
            case 'template3':
                templateValue = 2;
                break;
            default:
                templateValue = 0;
        }

        try {
            const response = await fetch(`https://api-ape.crodlin.in/api/userdetails/${decodedEmail}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    template: templateValue,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update template');
            }

            setCurrentTemplate(template);
            setShowTemplateModal(false);
            toast.success('Template updated successfully!');
        } catch (error) {
            console.error('Error updating template:', error);
            toast.error('Failed to update template');
        }
    };

    // Render the appropriate template
    const renderTemplate = () => {
        return (
            <motion.div
                key={currentTemplate}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransitionVariants}
                transition={{ duration: 0.3 }}
            >
                {(() => {
                    switch (currentTemplate) {
                        case 'template1':
                            return <TemplateOne userDetails={userDetails} portfolioData={portfolioData} />;
                        case 'template2':
                            return <TemplateTwo userDetails={userDetails} portfolioData={portfolioData} />;
                        case 'template3':
                            return <TemplateThree userDetails={userDetails} portfolioData={portfolioData} />;
                        default:
                            return <TemplateOne userDetails={userDetails} portfolioData={portfolioData} />;
                    }
                })()}
            </motion.div>
        );
    };

    if (loading) {
        return <PortfolioSkeleton />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl backdrop-blur-md text-center"
                >
                    <p className="text-red-400">Error loading portfolio data</p>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-neutral-950 relative">
                {/* Main content */}
                {renderTemplate()}


            {/* Enhanced edit button */}
            {isOwner && (
                    <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-50 flex flex-col sm:flex-row gap-3 sm:space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowTemplateModal(true)}
                            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800/50 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base"
                        >
                            <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Change Design</span>
                            <span className="sm:hidden">Design</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEditing(true)}
                            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800/50 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base"
                        >
                            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Edit Profile</span>
                            <span className="sm:hidden">Edit</span>
                        </motion.button>
                    </div>
                )}


               {/* Edit Modal */}
               {isEditing && isOwner && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-neutral-900/80 p-8 rounded-2xl max-w-4xl w-full mx-4 border border-neutral-800 backdrop-blur-md max-h-[90vh] overflow-y-auto"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">Edit Profile</h2>

                            <form onSubmit={handleUpdateUserDetails} className="space-y-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-neutral-300">Basic Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-neutral-400 block mb-2">Name</label>
                                            <input
                                                type="text"
                                                value={userDetails.name || ''}
                                                onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-neutral-400 block mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={userDetails.email || ''}
                                                onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                                                className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-neutral-400 block mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={userDetails.phone_number || ''}
                                                onChange={(e) => setUserDetails(prev => ({ ...prev, phone_number: e.target.value }))}
                                                className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-neutral-400 block mb-2">About</label>
                                            <textarea
                                                value={userDetails.about || ''}
                                                onChange={(e) => setUserDetails(prev => ({ ...prev, about: e.target.value }))}
                                                className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Education section */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-neutral-300">Education</h3>
                                        <motion.button
                                            type="button"
                                            onClick={handleAddEducation}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                                        >
                                            Add Education
                                        </motion.button>
                                    </div>

                                    {educationItems.map((education) => (
                                        <div key={education.id} className="p-4 border border-neutral-700 rounded-lg space-y-4 bg-neutral-800/50">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-neutral-300 font-medium">Education Entry</h4>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveEducation(education.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Degree</label>
                                                    <input
                                                        type="text"
                                                        value={education.degree}
                                                        onChange={(e) => handleEducationChange(education.id, 'degree', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="Bachelor's, Master's, etc."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Field of Study</label>
                                                    <input
                                                        type="text"
                                                        value={education.field_of_study}
                                                        onChange={(e) => handleEducationChange(education.id, 'field_of_study', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="Computer Science, Business, etc."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">University</label>
                                                    <input
                                                        type="text"
                                                        value={education.University}
                                                        onChange={(e) => handleEducationChange(education.id, 'University', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="University name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Location</label>
                                                    <input
                                                        type="text"
                                                        value={education.location}
                                                        onChange={(e) => handleEducationChange(education.id, 'location', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="City, Country"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Start Date</label>
                                                    <input
                                                        type="date"
                                                        value={education.start_date}
                                                        onChange={(e) => handleEducationChange(education.id, 'start_date', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">End Date</label>
                                                    <input
                                                        type="date"
                                                        value={education.end_date}
                                                        onChange={(e) => handleEducationChange(education.id, 'end_date', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Current Grade</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="10"
                                                        step="0.1"
                                                        value={education.current_grade}
                                                        onChange={(e) => handleEducationChange(education.id, 'current_grade', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="e.g. 4.0"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Project section */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-neutral-300">Projects</h3>
                                        <motion.button
                                            type="button"
                                            onClick={handleAddProject}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                                        >
                                            Add Project
                                        </motion.button>
                                    </div>

                                    {projectItems.map((project) => (
                                        <div key={project.id} className="p-4 border border-neutral-700 rounded-lg space-y-4 bg-neutral-800/50">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-neutral-300 font-medium">Project Entry</h4>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveProject(project.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Project Name</label>
                                                    <input
                                                        type="text"
                                                        value={project.name}
                                                        onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Description</label>
                                                    <textarea
                                                        value={project.description}
                                                        onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        rows={3}
                                                    />
                                                </div>

                                                {/* Project Links */}
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <h5 className="text-neutral-400">Links</h5>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddProjectLink(project.id)}
                                                            className="text-blue-400 hover:text-blue-300 text-sm"
                                                        >
                                                            + Add Link
                                                        </button>
                                                    </div>

                                                    {project.links.map((link) => (
                                                        <div key={link.id} className="flex items-center space-x-2">
                                                            <div className="flex-grow">
                                                                <input
                                                                    type="text"
                                                                    value={link.name}
                                                                    onChange={(e) => handleProjectLinkChange(project.id, link.id, 'name', e.target.value)}
                                                                    placeholder="Link Name"
                                                                    className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                                />
                                                            </div>
                                                            <div className="flex-grow">
                                                                <input
                                                                    type="text"
                                                                    value={link.url}
                                                                    onChange={(e) => handleProjectLinkChange(project.id, link.id, 'url', e.target.value)}
                                                                    placeholder="URL"
                                                                    className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveProjectLink(project.id, link.id)}
                                                                className="text-red-400 hover:text-red-300"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Certificate section */}
                                {/* <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-neutral-300">Certificates</h3>
                                        <motion.button
                                            type="button"
                                            onClick={handleAddCertificate}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                                        >
                                            Add Certificate
                                        </motion.button>
                                    </div>
                                    
                                    {certificateItems.map((certificate) => (
                                        <div key={certificate.id} className="p-4 border border-neutral-700 rounded-lg space-y-4 bg-neutral-800/50">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-neutral-300 font-medium">Certificate Entry</h4>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveCertificate(certificate.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Certificate Name</label>
                                                    <input
                                                        type="text"
                                                        value={certificate.name}
                                                        onChange={(e) => handleCertificateChange(certificate.id, 'name', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Competitions Battled</label>
                                                    <input
                                                        type="number"
                                                        value={certificate.competition_battled}
                                                        onChange={(e) => handleCertificateChange(certificate.id, 'competition_battled', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Competitions Won</label>
                                                    <input
                                                        type="number"
                                                        value={certificate.competition_won}
                                                        onChange={(e) => handleCertificateChange(certificate.id, 'competition_won', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}

                                {/* Tools section */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-neutral-300">Tools</h3>
                                        <motion.button
                                            type="button"
                                            onClick={handleAddToolName}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                                        >
                                            Add Tool Category
                                        </motion.button>
                                    </div>

                                    {toolItems.map((toolName) => (
                                        <div key={toolName.id} className="p-4 border border-neutral-700 rounded-lg space-y-4 bg-neutral-800/50">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-neutral-300 font-medium">Tool Category</h4>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveToolName(toolName.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Category Name</label>
                                                    <input
                                                        type="text"
                                                        value={toolName.name}
                                                        onChange={(e) => handleToolNameChange(toolName.id, e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="e.g. Programming Languages"
                                                    />
                                                </div>

                                                {/* Tool Items */}
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <h5 className="text-neutral-400">Tools</h5>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddToolItem(toolName.id)}
                                                            className="text-blue-400 hover:text-blue-300 text-sm"
                                                        >
                                                            + Add Tool
                                                        </button>
                                                    </div>

                                                    {toolName.tools.map((tool) => (
                                                        <div key={tool.id} className="flex items-center space-x-2">
                                                            <div className="flex-grow">
                                                                <input
                                                                    type="text"
                                                                    value={tool.name}
                                                                    onChange={(e) => handleToolItemChange(toolName.id, tool.id, e.target.value)}
                                                                    placeholder="Tool Name"
                                                                    className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveToolItem(toolName.id, tool.id)}
                                                                className="text-red-400 hover:text-red-300"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                    {/* submit button */}
                                    <div className="flex justify-end mt-6">
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 mr-1"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                        }}
                                        className="px-6 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50 mr-1"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Cancel
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}


                {/* Template Selection Modal */}
                {showTemplateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="bg-neutral-900/95 backdrop-blur-xl p-6 rounded-2xl w-full max-w-4xl relative border border-neutral-800"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">Choose Your Template</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {[
                                    {
                                        id: 'template1',
                                        name: 'Modern Dark',
                                        description: 'A sleek dark theme with AI effects',
                                        gradient: 'from-blue-500 to-purple-500'
                                    },
                                    {
                                        id: 'template2',
                                        name: 'Minimal Light',
                                        description: 'Clean and minimal design with light colors',
                                        gradient: 'from-emerald-500 to-teal-500'
                                    },
                                    {
                                        id: 'template3',
                                        name: 'Gradient Glow',
                                        description: 'Dynamic design with gradient effects',
                                        gradient: 'from-pink-500 to-rose-500'
                                    },
                                ].map((template) => (
                                    <motion.button
                                        key={template.id}
                                        onClick={() => handleTemplateChange(template.id)}
                                        className={`group p-4 rounded-xl border-2 transition-all duration-300 ${currentTemplate === template.id
                                            ? 'border-blue-500 bg-blue-500/10'
                                            : 'border-neutral-700 hover:border-neutral-500'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="aspect-video bg-neutral-800/50 rounded-lg mb-4 overflow-hidden group-hover:shadow-lg transition-all duration-300">
                                            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${template.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}>
                                                <span className="text-white/70 font-medium">Preview</span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{template.name}</h3>
                                        <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">{template.description}</p>
                                    </motion.button>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <motion.button
                                    onClick={() => setShowTemplateModal(false)}
                                    className="px-6 py-3 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Close
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}


            </div>
        </>
    );
};

export default Page; 