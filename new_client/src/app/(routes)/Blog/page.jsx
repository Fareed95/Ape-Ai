'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Filter, Clock, ChevronRight, User, Calendar, Tag, ArrowRight } from 'lucide-react';

export default function BlogPage() {
    // Sample blog post data
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Understanding Neural Networks: A Beginner's Guide",
            excerpt: "Explore the fundamentals of neural networks and how they form the backbone of modern AI systems.",
            category: "AI Basics",
            tags: ["Neural Networks", "Deep Learning", "AI"],
            image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            author: "Nitin Gupta",
            authorImage: "https://avatars.githubusercontent.com/u/140688515?s=400&u=2c964b96bb84104da1515a863e6425e70063d854&v=4",
            date: "May 15, 2023",
            readTime: "8 min read",
            featured: true
        },
        {
            id: 2,
            title: "The Future of Natural Language Processing",
            excerpt: "How large language models are revolutionizing the way we interact with computers and AI systems.",
            category: "NLP",
            tags: ["LLMs", "NLP", "GPT"],
            image: "https://images.unsplash.com/photo-1655720828018-ffa632166ed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
            author: "Fareed Sayyed",
            authorImage: "/Fareed.jpg",
            date: "June 22, 2023",
            readTime: "12 min read",
            featured: true
        },
        {
            id: 3,
            title: "Building Responsive AI Applications with React",
            excerpt: "Learn how to integrate AI models into your React applications for a seamless user experience.",
            category: "Development",
            tags: ["React", "AI Integration", "Frontend"],
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            author: "Rehbar Khan",
            authorImage: "https://avatars.githubusercontent.com/u/136853370?v=4",
            date: "July 5, 2023",
            readTime: "10 min read",
            featured: false
        },
        {
            id: 4,
            title: "Computer Vision: From Theory to Practice",
            excerpt: "Practical applications of computer vision technology in everyday products and services.",
            category: "Computer Vision",
            tags: ["CV", "Object Detection", "Image Processing"],
            image: "https://images.unsplash.com/photo-1515630278258-407f66498911?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
            author: "Nitin Gupta",
            authorImage: "https://avatars.githubusercontent.com/u/140688515?s=400&u=2c964b96bb84104da1515a863e6425e70063d854&v=4",
            date: "July 18, 2023",
            readTime: "15 min read",
            featured: false
        },
        {
            id: 5,
            title: "Introduction to Reinforcement Learning",
            excerpt: "Discover how reinforcement learning enables machines to learn through trial and error.",
            category: "AI Techniques",
            tags: ["RL", "AI Training", "Machine Learning"],
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80",
            author: "Fareed Sayyed",
            authorImage: "/Fareed.jpg",
            date: "August 2, 2023",
            readTime: "9 min read",
            featured: false
        },
        {
            id: 6,
            title: "Ethical Considerations in AI Development",
            excerpt: "Navigating the complex ethical landscape of artificial intelligence in today's world.",
            category: "AI Ethics",
            tags: ["Ethics", "AI Policy", "Responsible AI"],
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80",
            author: "Rehbar Khan",
            authorImage: "https://avatars.githubusercontent.com/u/136853370?v=4",
            date: "September 12, 2023",
            readTime: "11 min read",
            featured: false
        },
    ]);

    // State for search and filters
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Get all unique categories
    const categories = ['All', ...new Set(posts.map(post => post.category))];

    // Filter posts based on search query and active category
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        
        return matchesSearch && matchesCategory;
    });

    // Featured posts
    const featuredPosts = posts.filter(post => post.featured);

    // Motion animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background elements */}
            <div className="fixed inset-0 bg-gradient-to-b from-black via-ai-blue-900/5 to-black -z-10" />
            <div className="fixed inset-0 bg-grid-small-white/[0.05] -z-10" />
            <div className="fixed inset-0 bg-dot-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-10" />
            
            {/* Animated gradient blobs */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0]
                }}
                transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="fixed top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-ai-blue-500/5 blur-[120px] -z-5"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: [0.1, 0.15, 0.1],
                    scale: [1, 1.1, 1],
                    rotate: [0, -10, 0]
                }}
                transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="fixed bottom-0 right-1/4 transform translate-x-1/2 w-[400px] h-[400px] rounded-full bg-ai-teal-500/5 blur-[100px] -z-5"
            />

            {/* Header Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
                            AI Education Blog
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-8">
                            Explore the latest insights, tutorials, and trends in artificial intelligence, machine learning, and data science.
                        </p>
                        
                        {/* Search and Filter Bar */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-3xl mx-auto mt-10 mb-16"
                        >
                            <div className="relative flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-center gap-4">
                                {/* Search input */}
                                <div className="relative w-full sm:w-2/3">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-neutral-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl 
                                                   bg-white/5 backdrop-blur-md text-white placeholder-neutral-400 
                                                   focus:outline-none focus:ring-2 focus:ring-ai-blue-500/50 
                                                   transition-all duration-200"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                
                                {/* Category filter dropdown */}
                                <div className="relative w-full sm:w-1/3 flex">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Filter className="h-5 w-5 text-neutral-400" />
                                    </div>
                                    <select
                                        className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl 
                                                   bg-white/5 backdrop-blur-md text-white 
                                                   focus:outline-none focus:ring-2 focus:ring-ai-blue-500/50 
                                                   transition-all duration-200 appearance-none"
                                        value={activeCategory}
                                        onChange={(e) => setActiveCategory(e.target.value)}
                                    >
                                        {categories.map((category) => (
                                            <option 
                                                key={category} 
                                                value={category}
                                                className="bg-neutral-900 text-white"
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400">
                                        <ChevronRight className="h-4 w-4 transform rotate-90" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Posts Section */}
            {featuredPosts.length > 0 && (
                <motion.section 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="py-10 px-4 sm:px-6 lg:px-8"
                >
                    <div className="max-w-7xl mx-auto">
                        <motion.h2 
                            variants={itemVariants}
                            className="text-3xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-ai-blue-500 to-ai-teal-500"
                        >
                            Featured Articles
                        </motion.h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {featuredPosts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    variants={itemVariants}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-500/10 to-ai-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative h-full flex flex-col bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 group-hover:border-ai-blue-500/50 transition-colors duration-300">
                                        <div className="relative h-64 overflow-hidden">
                                            <img 
                                                src={post.image} 
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <span className="inline-block px-3 py-1 bg-ai-blue-500/70 backdrop-blur-md rounded-full text-xs font-medium mb-2">
                                                    {post.category}
                                                </span>
                                                <h3 className="text-xl font-bold text-white">{post.title}</h3>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-grow">
                                            <p className="text-neutral-300 mb-4">{post.excerpt}</p>
                                            <div className="flex items-center text-sm text-neutral-400">
                                                <div className="flex items-center mr-4">
                                                    <User className="h-4 w-4 mr-1" />
                                                    {post.author}
                                                </div>
                                                <div className="flex items-center mr-4">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {post.date}
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    {post.readTime}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 pt-0">
                                            <Link href={`/Blog/${post.id}`}>
                                                <button className="flex items-center text-ai-blue-400 hover:text-ai-blue-300 transition-colors">
                                                    Read more
                                                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* All Posts Section */}
            <motion.section 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="py-10 px-4 sm:px-6 lg:px-8 mb-20"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.h2 
                        variants={itemVariants}
                        className="text-3xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-ai-blue-500 to-ai-teal-500"
                    >
                        {searchQuery || activeCategory !== 'All' ? 'Search Results' : 'Latest Articles'}
                    </motion.h2>
                    
                    {filteredPosts.length === 0 ? (
                        <motion.div
                            variants={itemVariants}
                            className="text-center p-12 bg-white/5 backdrop-blur-md rounded-xl border border-white/10"
                        >
                            <p className="text-xl text-neutral-300">No articles found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setActiveCategory('All');
                                }}
                                className="mt-4 px-4 py-2 bg-ai-blue-500/80 hover:bg-ai-blue-500 rounded-lg text-white transition-colors"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.filter(post => !post.featured || searchQuery || activeCategory !== 'All').map((post) => (
                                <motion.div
                                    key={post.id}
                                    variants={itemVariants}
                                    className="relative group h-full"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-500/10 to-ai-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative h-full flex flex-col bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 group-hover:border-ai-blue-500/50 transition-colors duration-300">
                                        <div className="relative h-48 overflow-hidden">
                                            <img 
                                                src={post.image} 
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <span className="inline-block px-3 py-1 bg-ai-blue-500/70 backdrop-blur-md rounded-full text-xs font-medium mb-2">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5 flex-grow">
                                            <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                                            <p className="text-sm text-neutral-300 mb-4 line-clamp-3">{post.excerpt}</p>
                                            <div className="flex flex-wrap items-center text-xs text-neutral-400 mt-auto">
                                                <div className="flex items-center mr-3">
                                                    <User className="h-3 w-3 mr-1" />
                                                    {post.author}
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {post.readTime}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 pt-0 mt-auto">
                                            <Link href={`/Blog/${post.id}`}>
                                                <button className="flex items-center text-ai-blue-400 hover:text-ai-blue-300 text-sm transition-colors">
                                                    Read more
                                                    <ArrowRight className="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.section>

            {/* Newsletter Section */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 px-4 sm:px-6 lg:px-8 mb-20"
            >
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-gradient-to-r from-ai-blue-900/30 to-ai-teal-900/30 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.02]" />
                        <div className="absolute inset-0 bg-dot-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
                        
                        <div className="relative p-8 sm:p-12">
                            <h2 className="text-3xl font-bold text-center mb-6 text-white">
                                Stay Updated with AI Trends
                            </h2>
                            <p className="text-lg text-center text-neutral-300 mb-8">
                                Subscribe to our newsletter to receive the latest articles, tutorials, and insights in your inbox.
                            </p>
                            <div className="max-w-lg mx-auto">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="flex-grow px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-ai-blue-500/50"
                                    />
                                    <button className="px-6 py-3 bg-gradient-to-r from-ai-blue-500 to-ai-teal-500 hover:from-ai-blue-400 hover:to-ai-teal-400 rounded-xl text-white font-medium transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                                <p className="text-xs text-neutral-400 text-center mt-4">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};