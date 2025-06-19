import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

const MDXComponents = {
  // Headings
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: ReactNode }) => (
    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-4">
      {children}
    </h4>
  ),
  
  // Paragraphs and text
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
      {children}
    </p>
  ),
  
  // Lists
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="ml-4">{children}</li>
  ),
  
  // Links
  a: ({ href, children }: { href?: string; children: ReactNode }) => {
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));
    
    if (isInternalLink) {
      return (
        <Link 
          href={href}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {children}
        </Link>
      );
    }
    
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {children}
      </a>
    );
  },
  
  // Code blocks
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm">
      {children}
    </code>
  ),
  
  // Blockquotes
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-700 dark:text-gray-300">
      {children}
    </blockquote>
  ),
  
  // Images
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) return null;
    
    return (
      <div className="relative w-full h-64 md:h-96 mb-4">
        <Image
          src={src}
          alt={alt || ''}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
    );
  },
  
  // Tables
  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
      {children}
    </td>
  ),
  
  // Horizontal rule
  hr: () => (
    <hr className="my-8 border-gray-200 dark:border-gray-700" />
  ),
  
  // Strong and emphasis
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="italic">{children}</em>
  ),
};

export default MDXComponents;