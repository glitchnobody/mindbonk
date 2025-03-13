'use client';
import React, { useState, useEffect } from 'react';
import Logo from './logo';
import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes';
import Search from './search';
import Link from 'next/link';

export default function NavBar() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const { setTheme, theme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="max-w-420 fixed top-0 z-50 w-full">
      <div className="border-body flex h-16 w-full items-center justify-between gap-4 border-b px-3 py-1.5">
        <Link href="/" className="aspect-[100/88.45] h-full">
          <Logo />
        </Link>
        <Search
          focused={focused}
          setFocused={setFocused}
          search={search}
          setSearch={setSearch}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="border-accent bg-clear flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border hover:opacity-80"
          >
            <div>
              {theme === 'dark' ? (
                <Icon
                  icon="f7:moon-stars-fill"
                  className="text-accent text-2xl"
                />
              ) : (
                <Icon
                  icon="mynaui:sun-solid"
                  className="text-accent text-2xl"
                />
              )}
            </div>
          </button>
          <button
            onClick={() => {
              setFocused(!focused);
            }}
            aria-label="search toggle"
            className="border-accent bg-clear flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border hover:opacity-80"
          >
            <Icon icon="eva:search-outline" className="text-accent text-2xl" />
          </button>
        </div>
      </div>

      <div className="border-body flex h-8 w-full items-center justify-between border-b px-3.5">
        <div className="text-accent font-display flex items-center gap-4 text-base font-medium">
          <Link className="hover:underline" href="/articles">
            Articles
          </Link>
          <Link className="hover:underline" href="/colophon">
            Colophon
          </Link>
          <Link className="hover:underline" href="/about">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
