
"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo_motion.svg";

export default function Footer() {
    return (
        <footer className="bg-white border-t mt-10">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
                <div className="text-center md:text-left">
                    <Link href="/">
                        <Image src={Logo} alt=" Logo" width={100} height={40} />
                    </Link>
                </div>

                <div className="flex flex-wrap gap-4  text-gray-600">
                    <Link href="/" className="hover:text-black transition">Home</Link>
                    <Link href="/products" className="hover:text-black transition">Products</Link>
                </div>
                <p className="text-gray-500">&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
}
