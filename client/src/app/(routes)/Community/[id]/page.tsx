"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  communityService,
  PostData,
  CommunityData,
} from "@/api/CommunityService";

export default function CommunityDetailPage() {
  const { id } = useParams();
  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Post form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  // Get token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) setToken(storedToken);
  }, []);

  // Fetch community + posts
  const fetchCommunity = async () => {
    if (!token || !id) return;
    setLoading(true);
    try {
      const data = await communityService.getCommunities(token); // community list fetch
      const comm = data.find((c: CommunityData) => c.id === Number(id));
      setCommunity(comm || null);

      const postsData = await communityService.getPosts(token);
      const filteredPosts = postsData.filter(
        (p: PostData) => p.community === Number(id)
      );
      setPosts(filteredPosts);
    } catch (err) {
      console.error("Error fetching community detail:", err);
    }
    setLoading(false);
  };

  // Handle new post submit
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !id) return;

    try {
      const newPost = await communityService.createPost(token, {
        community: Number(id),
        title,
        content,
      });

      setPosts((prev) => [newPost, ...prev]);
      setTitle("");
      setContent("");
      setFiles([]);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  useEffect(() => {
    if (token && id) {
      fetchCommunity();
    }
  }, [token, id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!community)
    return <div className="p-6 text-center">Community not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Community Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          {community.id && (
            <Image
              src={`/api/community/files/${community.id}`} // 👈 backend API se profile image load karna
              alt={community.name}
              width={80}
              height={80}
              className="rounded-xl object-cover"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">{community.name}</h1>
            <p className="text-gray-600">{community.description}</p>
          </div>
        </div>
      </div>

      {/* Post Create Box */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <form onSubmit={handlePostSubmit} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share something with the community..."
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setFiles(e.target.files ? Array.from(e.target.files) : [])
            }
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Post
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts yet</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow p-4 space-y-2"
            >
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-800">{post.content}</p>

              {/* Agar backend se post.image aata hai to show karo */}
              {(post as any).image && (
                <Image
                  src={(post as any).image}
                  alt="Post"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
