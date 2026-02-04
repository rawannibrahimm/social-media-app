import React from "react";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton";

export default function UserProfileSkeleton() {
  return (
    <div className="min-h-screen animate-pulse px-2 py-5">
      {/* Header Skeleton */}
      <div className="max-w-7xl mx-auto mb-5">
        <div className="h-32 bg-gray-300 rounded-lg w-full"></div>
      </div>

      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {/* Left Sidebar Skeleton */}
          <div className="col-span-1 sm:px-4 lg:px-0 space-y-4">
            <div className="h-6 bg-gray-100 rounded w-3/4"></div>
            <div className="h-6 bg-gray-100 rounded w-2/3"></div>
            <div className="h-6 bg-gray-100 rounded w-1/2"></div>
          </div>

          {/* Main Posts Skeleton */}
          <div className="col-span-2 space-y-5">
            {[1, 2, 3].map((_, index) => (
              <PostSkeleton key={index}/>
            ))}
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="col-span-1 space-y-4">
            <div className="h-6 bg-gray-100 rounded w-3/4"></div>
            <div className="h-6 bg-gray-100 rounded w-2/3"></div>
            <div className="h-6 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
