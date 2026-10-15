import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Lagos Jewelry Market',
  description: 'Nigeria\'s Ultimate Multi-Wing Jewelry Marketplace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
