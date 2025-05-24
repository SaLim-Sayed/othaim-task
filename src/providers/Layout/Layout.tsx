import { ReactNode } from "react";

import { ToastProvider } from "@heroui/react";
import HeroUi from "./HeroUi";
import Navbar from "@/src/components/Layout/Navbar";
import Categories from "@/src/components/Layout/Categories";

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <HeroUi>
      <div className=" bg-[#f7f6fa]  mb-32">
        <Navbar />
        <Categories />
      </div>

      <div className="min-h-screen ">{children}</div>
      <ToastProvider />
    </HeroUi>
  );
}
