import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="prose prose-h1:py-4 prose-h2:py-4 prose-a:text-heading prose-strong:text-heading prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-body text-body m-auto px-3">
      {children}
    </article>
  );
}
