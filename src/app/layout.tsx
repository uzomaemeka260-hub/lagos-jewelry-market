import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Lagos Jewelry Market',
  description: 'Transactional Multi-Wing Fine Jewelry Marketplace Architecture',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-50">{children}</body>
    </html>
  );
}
