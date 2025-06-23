'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorLogger() {
  const pathname = usePathname();
  
  useEffect(() => {
    const logVisit = async () => {
      try {
        // Don't log visits to the analytics page itself
        if (pathname === '/analytics') return;
        
        // Get referrer
        const referrer = document.referrer || '';
        
        // Send log request
        await fetch('/api/log-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pathname,
            referrer: referrer,
          }),
        });
      } catch (error) {
        // Silently fail - we don't want to disrupt the user experience
        console.error('Failed to log visit:', error);
      }
    };
    
    // Log visit after a small delay to ensure page is fully loaded
    const timer = setTimeout(logVisit, 100);
    
    return () => clearTimeout(timer);
  }, [pathname]);
  
  // This component doesn't render anything
  return null;
}