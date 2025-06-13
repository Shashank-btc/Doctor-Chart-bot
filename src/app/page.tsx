"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-background text-foreground font-body">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-headline text-center text-primary">
            My New UI Application
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <p className="text-lg text-center text-foreground">
            Welcome! This is a simple React UI.
          </p>
          
          <Separator />

          <div className="flex flex-col items-center space-y-3">
            <p className="text-base text-muted-foreground">Counter Example:</p>
            <div className="flex items-center space-x-3">
              <Button onClick={() => setCount(count - 1)} variant="outline" size="lg">
                Decrement
              </Button>
              <span className="text-3xl font-bold w-16 text-center text-accent tabular-nums">
                {count}
              </span>
              <Button onClick={() => setCount(count + 1)} variant="default" size="lg">
                Increment
              </Button>
            </div>
          </div>

          <Separator />
          
          <p className="text-sm text-center text-muted-foreground pt-2">
            You can start building your UI components in 
            <code className="px-1 py-0.5 mx-1 bg-muted text-muted-foreground rounded-sm text-xs">src/components</code> 
            and use them here.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
