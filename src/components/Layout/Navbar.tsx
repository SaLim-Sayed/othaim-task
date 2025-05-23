'use client';

import Logo from '@/public/logo_motion.svg';
 import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiMenu, BiX } from 'react-icons/bi';
 import DrawerMenu from './DrawerMenu';
import { links } from './links';
 
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
       <div className='fixed left-0 right-0 top-4 z-50'>
        <div className='relative'>
        

          {/* Main Navbar */}
          <nav className='fixed left-0 right-0 top-4 z-50 mx-auto w-[90%] rounded-full bg-white py-4 shadow-md'>
            <div className='container mx-auto flex items-center justify-between px-6'>
              {/* Logo */}
              <Link href='/'>
                <Image src={Logo} alt='GoTag Logo' width={100} height={40} />
              </Link>

              {/* Desktop Links */}
              <div className='hidden space-x-6 text-gray-800 md:flex'>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className='transition hover:text-indigo-600'>
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className='flex items-center space-x-2'>
                 <Button
                  className='flex items-center justify-center md:hidden'
                  isIconOnly
                  variant='bordered'
                  onPress={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <BiX className='text-xl' /> : <BiMenu className='text-xl' />}
                </Button>
              </div>
            </div>
          </nav>
        </div>
        <DrawerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
   );
}
