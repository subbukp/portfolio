'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/yourusername', icon: '📦' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', icon: '💼' },
    { name: 'Twitter', href: 'https://twitter.com/yourusername', icon: '🐦' },
  ];

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            Made with ❤️ using Next.js and TypeScript
          </p>
          <p className="text-gray-400 text-sm mt-2">
            © {currentYear} Subrahmanya K P. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
