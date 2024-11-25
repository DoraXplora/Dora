'use client';

import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';
import Image from 'next/image';
import { useState } from 'react';
import { ClusterModal } from './ClusterModal';

const navItems = [
  { name: 'Transactions', href: '/txs' },
  { name: 'Blocks', href: '/blocks' },
  { name: 'Analytics', href: '#' },
  { name: 'Leaderboard', href: '#' },
];

export function Navbar() {
  const { setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex justify-center h-16 sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex px-4 container">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/logo.svg" alt="Dora Logo" width={100} height={60} />
        </Link>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-[#9F1B30] hover:text-[#D11F2F]"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#9F1B30] hover:text-[#D11F2F] hover:bg-white/20 ml-5"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-[#9F1B30] hover:text-[#D11F2F] hover:bg-white/20"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-[#9F1B30] hover:text-[#D11F2F]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <ClusterModal />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex items-center">
          <ClusterModal />
        </div>
      </div>
    </nav>
  );
}
