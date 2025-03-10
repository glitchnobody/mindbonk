import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="prose prose-headings:text-black prose-headings:font-semibold prose-headings:mt-8 prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white mt-24">
      {children}
    </article>
  );
}
