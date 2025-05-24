"use client";
import { ReactNode, useState } from "react";

import { ToastProvider } from "@heroui/react";
import HeroUi from "./HeroUi";
import Navbar from "@/src/components/Navbar/Navbar";
import Categories from "@/src/components/Navbar/Categories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/src/components/Footer/Footer";

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
        <div className="  bg-[#f7f6fa] ">
          <Navbar />
          <Categories />
        </div>

        <div className="min-h-[calc(100vh-12rem)] pt-32">{children}</div>
        <ToastProvider />
        <Footer />
      </HeroUi>
    </QueryClientProvider>

  );
}
