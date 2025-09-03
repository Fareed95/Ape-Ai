"use client";

import { useEffect, useMemo, useState } from 'react';
import { useUserContext } from '@/context/UserInfo';
import { useToast } from '@/context/ToastContext';


type RecommendedInternship = {
  id: number;
  company: number;
  title: string;
  description: string;
  stipend: string;
  duration: string;
  location: string;
  skills_required: string;
  openings: number;
  application_deadline: string;
  posted_at: string;
  students_for_interview: any[];
  students_under_review: any[];
};

export default function RecommendInternship() {
  const { contextinput } = useUserContext();
  const [items, setItems] = useState<RecommendedInternship[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  const keyword = useMemo(() => (contextinput || '').toString().trim(), [contextinput]);

  useEffect(() => {
    console.log(keyword)
  showInfo("keyword sending", keyword);
    const fetchInternships = async () => {
      if (!keyword) {
        setItems([]);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://api-ape.crodlin.in/api/recommended-internship/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ keyword })
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch internships (${response.status})`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setItems(data as RecommendedInternship[]);
        } else {
          // In case API returns an object or different shape
          setItems([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [keyword]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="h-6 w-48 bg-neutral-800/60 rounded mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 animate-pulse">
              <div className="h-4 w-3/4 bg-neutral-800 rounded mb-3"></div>
              <div className="h-3 w-1/2 bg-neutral-800 rounded mb-2"></div>
              <div className="h-3 w-full bg-neutral-800 rounded mb-2"></div>
              <div className="h-3 w-2/3 bg-neutral-800 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 rounded-xl border border-red-900/50 bg-red-950/30 text-red-300">
        Failed to load recommended internships: {error}
      </div>
    );
  }

  const hasItems = (items?.length || 0) > 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-neutral-200">Recommended Internships</h3>
        {keyword && (
          <span className="text-xs sm:text-sm text-neutral-400">for "{keyword}"</span>
        )}
      </div>

      {!hasItems && (
        <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 text-neutral-300">
          No internships found.
        </div>
      )}

      {hasItems && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items!.map((item) => (
            <div
              key={item.id}
              className="flex flex-col h-full p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-colors"
            >
              <div className="mb-2">
                <h4 className="text-base sm:text-lg font-medium text-neutral-100 line-clamp-2">{item.title}</h4>
                <p className="text-xs text-neutral-400">Company ID: {item.company}</p>
              </div>

              <p className="text-sm text-neutral-300 line-clamp-3 mb-3">{item.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 mb-3">
                <div className="rounded-md bg-neutral-800/40 px-2 py-1">Stipend: {item.stipend}</div>
                <div className="rounded-md bg-neutral-800/40 px-2 py-1">Duration: {item.duration}</div>
                <div className="rounded-md bg-neutral-800/40 px-2 py-1">Location: {item.location}</div>
                <div className="rounded-md bg-neutral-800/40 px-2 py-1">Openings: {item.openings}</div>
              </div>

              <div className="text-xs text-neutral-400 mb-3 line-clamp-1">
                Skills: {item.skills_required}
              </div>

              <div className="mt-auto flex items-center justify-between text-xs text-neutral-400">
                <span>Deadline: {new Date(item.application_deadline).toLocaleDateString()}</span>
                <span>Posted: {new Date(item.posted_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
