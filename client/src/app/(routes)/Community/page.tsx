'use client';

import React, { useState, useEffect } from 'react';
import { communityService, CommunityData } from '@/api/CommunityService';

export default function CommunityPage() {
  const [communities, setCommunities] = useState<CommunityData[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Create community form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [profilePic, setProfilePic] = useState<File | null>(null);

  // Get token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) setToken(storedToken);
  }, []);

  const fetchCommunities = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await communityService.getCommunities(token);
      setCommunities(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const newCommunity = await communityService.createCommunity(
        token,
        { name, description },
        profilePic || undefined
      );
      setCommunities((prev) => [...prev, newCommunity]);
      setName('');
      setDescription('');
      setProfilePic(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchCommunities();
  }, [token]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Communities</h1>

      {/* Create Community */}
      <form
        onSubmit={handleCreate}
        className="mb-6 flex flex-col gap-2 border p-4 rounded-lg shadow"
      >
        <input
          type="text"
          placeholder="Community Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && setProfilePic(e.target.files[0])
          }
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Community
        </button>
      </form>

      {/* Community List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {communities.map((comm) => (
            <li
              key={comm.id}
              className="border p-4 rounded hover:shadow cursor-pointer"
            >
              <a href={`/Community/${comm.id}`} className="flex items-center gap-4">
                {comm.id && (
                  <img
                    src={`/api/community/files/${comm.id}`} // Backend should serve profile_picture here
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <h2 className="font-bold">{comm.name}</h2>
                  <p className="text-gray-600">{comm.description}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
