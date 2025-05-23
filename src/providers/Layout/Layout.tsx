import { ReactNode } from "react";

import { ToastProvider } from "@heroui/react";
import HeroUi from "./HeroUi";

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <HeroUi>
      <div className="min-h-[50vh]">{children}</div>
      <ToastProvider />
    </HeroUi>
  );
}
