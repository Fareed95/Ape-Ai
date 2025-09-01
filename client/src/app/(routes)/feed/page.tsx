"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { communityService } from "@/api/CommunityService";
import { motion } from "framer-motion";

interface Community {
  id: number;
  name: string;
}

interface Post {
  id: number; 
  content: string;
  community: Community;
  user: { id: number; name: string };
  created_at: string;
}

export default function FeedPage() {
  const { user, token, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<"all" | "subscribed">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !isAuthenticated) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await communityService.getPosts(token);

        if (filter === "subscribed" && user) {
          // filter posts by user's subscribed communities
          const subscribedPosts = data.filter((post: Post) =>
            user.subscribed_communities?.includes(post.community.id)
          );
          setPosts(subscribedPosts);
        } else {
          setPosts(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token, isAuthenticated, filter, user]);

  const handleTabChange = (tab: "all" | "subscribed") => setFilter(tab);

  const goToCommunity = (id: number) => {
    window.location.href = `/feed/${id}`;
  };

  const createCommunity = () => {
    window.location.href = "/Community";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Feed</h1>
        <button
          onClick={createCommunity}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded font-medium transition-colors"
        >
          Create Community
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => handleTabChange("all")}
          className={`px-3 py-2 font-medium ${
            filter === "all"
              ? "border-b-2 border-indigo-500 text-indigo-400"
              : "text-gray-400 hover:text-white transition-colors"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleTabChange("subscribed")}
          className={`px-3 py-2 font-medium ${
            filter === "subscribed"
              ? "border-b-2 border-indigo-500 text-indigo-400"
              : "text-gray-400 hover:text-white transition-colors"
          }`}
        >
          Your Subscribed
        </button>
      </div>

      {/* Posts */}
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400">No posts found.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => goToCommunity(post.community.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">{post.user.name}</span>
                <span className="text-gray-400 text-sm">
                  {new Date(post.created_at).toLocaleString()}
                </span>
              </div>
              <p className="mb-2">{post.content}</p>
              <span className="text-indigo-400 text-sm">{post.community.name}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
