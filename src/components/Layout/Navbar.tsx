"use client";

import Logo from "@/public/logo_motion.svg";
import { Badge, Button, useDisclosure } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import DrawerMenu from "./DrawerMenu";
import { links } from "./links";
import { FaCartPlus } from "react-icons/fa";
import CartSlider from "@/src/pages/Cart/CartSlider";
import { useCartStore } from "@/src/store/cartStore";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { cartData } = useCartStore();
  const count = cartData?.products.length || 0;
  return (
    <div className="bg-[#f7f6fa]">
      <nav className=" z-[50] fixed left-0 right-0 top-1 mx-auto w-[90%] rounded-full bg-white py-2 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link href="/">
            <Image src={Logo} alt="GoTag Logo" width={100} height={40} />
          </Link>

          <div className="hidden space-x-6 text-gray-800 md:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition hover:text-indigo-600"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Badge color="secondary" content={count}>
              <Button
                className="  flex items-center justify-center"
                isIconOnly
                variant="flat"
                onPress={() => onOpen()}
              >
                <FaCartPlus className="text-2xl text-gray-800" />
              </Button>{" "}
            </Badge>

            <Button
              className="flex items-center justify-center md:hidden"
              isIconOnly
              variant="bordered"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <BiX className="text-xl" />
              ) : (
                <BiMenu className="text-xl" />
              )}
            </Button>
          </div>
        </div>
      </nav>
      <DrawerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <CartSlider isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
