'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import type { MetaData } from '@/components/PostUtil';

interface SearchProps {
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search(props: SearchProps) {
  const [posts, setPosts] = useState<MetaData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        props.setFocused(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        props.setSearch('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //disable body scroll when search is open
  useEffect(() => {
    if (props.focused) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.focused]);

  //CLOSE SEARCH RESULTS ON ESCAPE
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.setFocused(false);
        props.setSearch('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        `/api/search${props.search ? `?q=${props.search}` : ''}`,
      );
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, [props.search]);

  useEffect(() => {
    console.log(props.focused);
  }, [props.focused]);

  return (
    <div className="max-w-132 mx-auto w-[98%]">
      {props.focused && (
        <div
          onClick={() => {
            props.setSearch('');
          }}
          className="bg-background border-accent max-w-420 fixed left-0 right-0 top-0 z-10 mx-auto mt-1 h-dvh w-full rounded-xl pt-14"
        >
          <div className="mx-auto mt-5 w-full max-w-5xl md:mt-0.5">
            <hr />
            <div className="mx-auto flex w-full flex-row items-center justify-between px-4 py-2">
              <div className="text-body">Total results: {posts.length}</div>
              <button
                onClick={() => {
                  props.setFocused(false);
                }}
                className="text-body bg-accent w-fit cursor-pointer rounded-md px-12 py-2 text-sm font-bold"
              >
                Close Search (Esc)
              </button>
            </div>
            <hr />
            <div className="hideScroll h-[75vh] overflow-y-scroll px-4 pb-4">
              {posts.map((post, index) => (
                <Link
                  onClick={() => {
                    props.setFocused(false);
                    props.setSearch('');
                  }}
                  key={index}
                  href={`/posts/${post.slug}`}
                >
                  <div className="text-body text-9xl hover:underline">
                    {post.title}
                  </div>
                </Link>
              ))}
            </div>
            <hr />
          </div>
        </div>
      )}
      <div
        className={`${props.focused ? 'absolute left-0 mx-auto ml-[5%] flex w-[90%]' : 'relative hidden w-full'} bg-clear color_transition z-20 items-center justify-end rounded-full md:relative md:ml-0 md:flex md:w-full`}
      >
        <input
          id="search input"
          ref={inputRef}
          value={props.search}
          onChange={(e) => {
            props.setSearch(e.target.value);
            console.log(props.search);
          }}
          onFocus={() => {
            props.setFocused(true);
          }}
          type="text"
          className="placeholder:text-body/0 outline-accent focus:bg-body/10 text-body text-md peer w-full rounded-full px-5 py-2 pr-12 outline-2 md:block md:py-1"
          placeholder="Search"
        />
        {props.search.length > 0 ? null : (
          <label
            htmlFor="search input"
            className="text-body pointer-events-none absolute w-full px-5 peer-focus:hidden"
          >
            Search
            <span className="text-body/80 text-sm">
              {/Mac/.test(navigator.userAgent) ? ' (Ctrl + K)' : ' (⌘ + K)'}
            </span>
          </label>
        )}

        <div className="bg-clear color_transition text-md peer-focus:bg-accent z-4 pointer-events-none absolute mr-2 flex aspect-square h-[75%] cursor-pointer items-center justify-center rounded-full hover:opacity-80">
          <Icon icon="basil:search-outline" />
        </div>
      </div>
    </div>
  );
}
