'use client';
import { useUserContext } from '@/app/context/Userinfo';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Users, ArrowLeft, Clock } from 'lucide-react';

const Page = () => {
    const { roomName } = useParams();
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const { contextemail } = useUserContext();
    const { toast } = useToast();
    const messagesEndRef = useRef(null);
    const webSocketRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const user = contextemail;
        setUsername(user);

        const ws = new WebSocket(`ws://localhost:8090/ws/chat/${roomName}/`);
        webSocketRef.current = ws;

        ws.onopen = () => {
            toast({
                title: "Connected to chat",
                description: `Welcome to ${roomName} room`,
                duration: 3000,
            });
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'chat_history') {
                setMessages(data.messages);
            } else {
                setMessages((prev) => [...prev, data]);
            }
        };

        ws.onclose = () => {
            toast({
                title: "Disconnected",
                description: "Connection to chat room lost",
                variant: "destructive",
            });
        };

        ws.onerror = (error) => {
            toast({
                title: "Error",
                description: "Failed to connect to chat room",
                variant: "destructive",
            });
        };

        return () => ws.close();
    }, [roomName, contextemail, toast]);

    const sendMessage = (e) => {
        e?.preventDefault();
        if (message.trim() && webSocketRef.current) {
            const data = {
                username,
                message: message.trim(),
            };
            webSocketRef.current.send(JSON.stringify(data));
            setMessage('');
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    return (
        <div className="min-h-screen bg-black pt-20">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-xl sticky top-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                                    onClick={() => window.history.back()}
                                >
                                    <ArrowLeft className="w-5 h-5 text-neutral-400" />
                                </motion.button>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white capitalize">{roomName} Room</h2>
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-3 h-3 text-green-400" />
                                        <p className="text-xs text-neutral-400">Active members</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="h-[calc(100vh-16rem)] flex flex-col">
                        <div 
                            ref={chatContainerRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                        >
                            <AnimatePresence initial={false}>
                                {messages.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={`flex items-start space-x-4 ${msg.username === username ? 'flex-row-reverse space-x-reverse' : ''}`}
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center">
                                            <span className="text-sm font-medium text-white">
                                                {msg.username?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className={`flex flex-col ${msg.username === username ? 'items-end' : ''}`}>
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="text-sm font-medium text-neutral-300">
                                                    {msg.username === username ? 'You' : msg.username}
                                                </span>
                                                <div className="flex items-center space-x-1 text-xs text-neutral-500">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{formatTimestamp(msg.timestamp)}</span>
                                                </div>
                                            </div>
                                            <div className={`max-w-md rounded-2xl px-4 py-2 ${
                                                msg.username === username
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-neutral-800 text-neutral-200'
                                            }`}>
                                                <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-xl">
                            <form onSubmit={sendMessage} className="flex items-center space-x-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full bg-neutral-800/50 text-neutral-200 rounded-xl px-4 py-3 border border-neutral-700 focus:outline-none focus:border-blue-500/50 transition-colors placeholder-neutral-500"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center justify-center group"
                                >
                                    <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
