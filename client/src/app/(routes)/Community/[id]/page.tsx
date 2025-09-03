"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { communityService } from '@/api/CommunityService';

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const { token, isAuthenticated } = useAuth();
  const [community, setCommunity] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Update form state
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | undefined>(undefined);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const canEdit = community?.user_role === 'super_admin' || community?.user_role === 'admin';

  // Role management state (admins & super_admins)
  const [roleUserId, setRoleUserId] = useState<string>('');
  const [roleValue, setRoleValue] = useState<'member' | 'admin' | 'super_admin'>('member');
  const [roleSaving, setRoleSaving] = useState<boolean>(false);
  const [roleMessage, setRoleMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      if (!token) { setLoading(false); return; }
      try {
        setLoading(true);
        const data = await communityService.getCommunity(token, params.id);
        setCommunity(data);
        setName(data?.name || '');
        setDescription(data?.description || '');
      } catch (e: any) {
        setError(e?.message || 'Failed to load community');
      } finally {
        setLoading(false);
      }
    };
    fetchCommunity();
  }, [token, params.id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !community?.id) return;
    try {
      setSaving(true);
      const updated = await communityService.updateCommunity(token, community.id, { name, description }, profilePicture);
      setCommunity(updated);
      setEditing(false);
    } catch (e: any) {
      setError(e?.message || 'Failed to update community');
    } finally {
      setSaving(false);
    }
  };

  const handleAssignRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !community?.id || !roleUserId) return;
    try {
      setRoleSaving(true);
      setRoleMessage(null);
      await communityService.assignRole(
        token,
        Number(community.id),
        { user_id: Number(roleUserId), role: roleValue }
      );
      setRoleMessage('Role updated successfully');
      setRoleUserId('');
      setRoleValue('member');
    } catch (e: any) {
      setRoleMessage(e?.message || 'Failed to assign role');
    } finally {
      setRoleSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!token || !community?.id) return;
    if (!confirm('Are you sure you want to delete this community?')) return;
    try {
      setDeleting(true);
      await communityService.deleteCommunity(token, community.id);
      window.location.href = '/Community';
    } catch (e: any) {
      setError(e?.message || 'Failed to delete community');
    } finally {
      setDeleting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-2">Community</h1>
        <p className="text-gray-400">Please login to view community details.</p>
        <Link className="text-blue-400 underline" href="/Login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/Community" className="text-sm text-blue-400 underline">← Back to Communities</Link>
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-rose-400 mb-4">{error}</p>}

      {community && (
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-white/5">
            <div className="flex items-start gap-4">
              {community.profile_picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={community.profile_picture} alt={community.name} className="w-16 h-16 rounded object-cover" />
              ) : (
                <div className="w-16 h-16 rounded bg-white/10 flex items-center justify-center text-xl">{community.name?.[0]?.toUpperCase() || 'C'}</div>
              )}
              <div>
                <h1 className="text-2xl font-semibold">{community.name}</h1>
                {community.description && <p className="text-gray-400 mt-1">{community.description}</p>}
                <div className="text-xs text-gray-500 mt-2">
                  Role: {community.user_role || 'member'}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {canEdit && (
            <div className="p-4 border-t border-gray-700 flex items-center gap-3">
              <button onClick={() => setEditing(!editing)} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">{editing ? 'Cancel' : 'Edit Community'}</button>
              <button onClick={handleDelete} disabled={deleting} className="px-3 py-2 rounded bg-rose-600 hover:bg-rose-500 disabled:opacity-50">{deleting ? 'Deleting...' : 'Delete'}</button>
            </div>
          )}

          {/* Edit form */}
          {canEdit && editing && (
            <form onSubmit={handleSave} className="p-4 border-t border-gray-700">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="px-3 py-2 rounded bg-black/30 border border-gray-700"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className="px-3 py-2 rounded bg-black/30 border border-gray-700"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  className="sm:col-span-2 px-3 py-2 rounded bg-black/30 border border-gray-700"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePicture(e.target.files?.[0])}
                />
              </div>
              <div className="mt-4">
                <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {/* Role management */}
          {canEdit && (
            <div className="p-4 border-t border-gray-700">
              <h3 className="font-semibold mb-3">Role Management</h3>
              <form onSubmit={handleAssignRole} className="grid gap-3 sm:grid-cols-3 items-end">
                <input
                  className="px-3 py-2 rounded bg-black/30 border border-gray-700"
                  placeholder="User ID"
                  value={roleUserId}
                  onChange={(e) => setRoleUserId(e.target.value)}
                  required
                />
                <select
                  className="px-3 py-2 rounded bg-black/30 border border-gray-700"
                  value={roleValue}
                  onChange={(e) => setRoleValue(e.target.value as any)}
                >
                  <option value="member">member</option>
                  <option value="admin">admin</option>
                  <option value="super_admin">super_admin</option>
                </select>
                <button type="submit" disabled={roleSaving} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 disabled:opacity-50">
                  {roleSaving ? 'Saving...' : 'Assign/Update'}
                </button>
              </form>
              {roleMessage && <div className="text-sm mt-2 text-gray-300">{roleMessage}</div>}
              <p className="text-xs text-gray-500 mt-2">Only admins/super_admins can assign roles. Admins cannot modify super_admins.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
