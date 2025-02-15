"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm z-50">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              Read our <a href="/privacy" className="underline">privacy policy</a> for more information.
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={declineCookies}>
              Decline
            </Button>
            <Button onClick={acceptCookies}>
              Accept All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}