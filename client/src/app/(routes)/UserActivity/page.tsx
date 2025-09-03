"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { communityService } from '@/api/CommunityService';

export default function Page() {
  const { isAuthenticated, token, user } = useAuth();
  const [activity, setActivity] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!token) { setLoading(false); return; }
      try {
        setLoading(true);
        const data = await communityService.getUserActivity(token);
        setActivity(data);
      } catch (e: any) {
        setError(e?.message || 'Failed to load user activity');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-2">User Activity</h1>
        <p className="text-gray-400">Please login to view your activity.</p>
        <Link className="text-blue-400 underline" href="/Login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-24">
      <h1 className="text-2xl font-semibold mb-6">User Activity</h1>
      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-rose-400 mb-4">{error}</p>}

      {activity && (
        <div className="space-y-6">
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400">User</div>
            <div className="text-white">{activity.email || user?.email}</div>
          </div>

          <div className="space-y-4">
            {(activity.communities || []).map((c: any) => (
              <div key={c.community_id} className="border border-gray-700 rounded-lg overflow-hidden">
                <div className="p-4 bg-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{c.community_name}</div>
                    <div className="text-xs text-gray-500">Role: {c.role}</div>
                  </div>
                  <div className="text-xs text-gray-500 flex gap-3">
                    <span>Posts: {c.user_posts_count}</span>
                    <span>Liked: {c.liked_posts_count}</span>
                    <span>Disliked: {c.disliked_posts_count}</span>
                    <span>Saved: {c.saved_posts_count}</span>
                  </div>
                </div>

                {/* Lists (trimmed) */}
                <div className="p-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="font-medium mb-2">Your Posts</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {(c.user_posts || []).slice(0, 5).map((p: any) => (
                        <li key={p.id} className="truncate">#{p.id} {p.title}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Saved Posts</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {(c.saved_posts || []).slice(0, 5).map((p: any) => (
                        <li key={p.id} className="truncate">#{p.id} {p.title || p.post_title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


