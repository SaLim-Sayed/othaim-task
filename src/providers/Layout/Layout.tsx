"use client";
import { ReactNode, useState } from "react";

import { ToastProvider } from "@heroui/react";
import HeroUi from "./HeroUi";
import Navbar from "@/src/components/Layout/Navbar";
import Categories from "@/src/components/Layout/Categories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  }));
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUi>
        <div className=" bg-[#f7f6fa]  mb-32">
          <Navbar />
          <Categories />
        </div>

        <div className="min-h-screen ">{children}</div>
        <ToastProvider />
      </HeroUi>      </QueryClientProvider>

  );
}
