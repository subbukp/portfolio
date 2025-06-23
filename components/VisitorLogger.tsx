'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorLogger() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Debug mode - set to true to see console logs
    const DEBUG = false;
    const logVisit = async () => {
      try {
        // Don't log visits to the analytics page itself
        if (pathname === '/analytics') return;
        
        // Get referrer
        const referrer = document.referrer || '';
        
        if (DEBUG) {
          console.log('Logging visit:', { page: pathname, referrer });
        }
        
        // Send log request
        const response = await fetch('/api/log-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pathname,
            referrer: referrer,
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          if (DEBUG) {
            console.warn('Log visit failed:', response.status, errorData);
            if (errorData.isVercel) {
              console.info('Running on Vercel - using in-memory storage');
            }
          }
        } else if (DEBUG) {
          const result = await response.json();
          console.log('Visit logged successfully:', result);
        }
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