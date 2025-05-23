import React from "react";
import { Card, Skeleton } from "@heroui/react";

export default function SkeletonCard() {
  return (
    <div className="container mx-auto p-4">
       <div className="mb-6 space-y-4">
        <Skeleton className="h-8 w-2/5 rounded-lg" />
        <Skeleton className="w-full h-[250px] rounded-lg" />
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-5/6 rounded-lg" />
          <Skeleton className="h-4 w-2/3 rounded-lg" />

           <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full rounded-lg" />
            ))}
          </div>

          <Skeleton className="w-full h-[200px] rounded-lg" />
        </div>

        <Card className="p-4 space-y-4">
          <Skeleton className="h-6 w-1/2 rounded-lg" />
          <Skeleton className="h-4 w-2/3 rounded-lg" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </Card>
      </div>

      <div className="mt-8 space-y-3">
        <Skeleton className="h-6 w-1/4 rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[150px] rounded-lg w-full" />
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Skeleton className="h-6 w-1/4 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="w-full p-4 space-y-4">
              <Skeleton className="h-[120px] w-full rounded-lg" />
              <Skeleton className="h-6 w-2/3 rounded-lg" />
              <Skeleton className="h-4 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
