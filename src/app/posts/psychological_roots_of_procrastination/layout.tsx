import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'STILL stuck at the starting Line: Psychological roots of procrastination.',
  description:
    'Explore the enduring debate between using spaces and tabs for code indentation, and why this choice matters more than you might think.',
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
