import React from "react";
import { Card, Skeleton } from "@heroui/react";

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col flex-wrap items-center gap-4 mb-4  sm:flex-row">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card key={index} className="w-[300px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-40 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  );
}
