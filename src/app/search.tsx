'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

interface SearchProps {
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search(props: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        inputRef.current?.focus();
        props.setFocused(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
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

  return (
    <div className="max-w-132 mx-auto w-[98%]">
      {props.focused && (
        <div className="bg-background/80 border-accent fixed left-0 right-0 top-0 z-10 mx-auto mt-2 w-[98%] max-w-7xl rounded-xl border pt-16 shadow-lg backdrop-blur-md">
          <div className="p-4">
            <div className="text-body/80">
              Search results for &quot;{props.search}&quot;
            </div>
            <div className="text-body/50 mt-2">No results found</div>
          </div>
        </div>
      )}
      <div
        className={`${props.focused ? 'absolute left-0 mx-auto ml-[5%] flex w-[90%]' : 'relative hidden w-full'} " bg-clear rounded-full" z-20 items-center justify-end md:relative md:ml-0 md:flex md:w-full`}
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
          onBlur={() => {
            props.setFocused(false);
          }}
          type="text"
          className="placeholder:text-body/0 outline-accent focus:bg-body/10 text-body text-md peer w-full rounded-full px-5 py-1 pr-12 outline-2 focus:outline-none"
          placeholder="Search"
        />
        {props.search.length > 0 ? null : (
          <label
            htmlFor="search input"
            className="text-body/80 pointer-events-none absolute w-full px-5 peer-focus:hidden"
          >
            Search
            <span className="text-body/50 text-sm"> ⌘ + K</span>
          </label>
        )}

        {props.search.length > 0 ? (
          <div
            onClick={() => {
              props.setSearch('');
            }}
            className="bg-clear text-md peer-focus:bg-accent z-4 absolute mr-2 flex aspect-square h-[75%] cursor-pointer items-center justify-center rounded-full hover:opacity-80"
          >
            <Icon icon="material-symbols:close-rounded" />
          </div>
        ) : (
          <>
            <div className="bg-clear text-md peer-focus:bg-accent z-4 pointer-events-none absolute mr-2 flex aspect-square h-[75%] cursor-pointer items-center justify-center rounded-full hover:opacity-80 peer-focus:hidden">
              <Icon icon="basil:search-outline" />
            </div>
            <div
              onClick={() => {
                props.setSearch('');
              }}
              className="bg-clear text-md peer-focus:bg-accent z-4 absolute mr-2 hidden aspect-square h-[75%] cursor-pointer items-center justify-center rounded-full hover:opacity-80 peer-focus:flex"
            >
              <Icon icon="material-symbols:close-rounded" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
