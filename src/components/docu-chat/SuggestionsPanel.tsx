
"use client";

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LightBulbIcon } from "@radix-ui/react-icons"; // Or any other appropriate icon

interface SuggestionsPanelProps {
  // Define any props you might need here in the future
  // For example: onSuggestionClick?: (suggestion: string) => void;
  // suggestions?: string[];
}

export function SuggestionsPanel({ /* pass props here */ }: SuggestionsPanelProps) {
  // Placeholder for suggestions - you will handle the logic for this
  const suggestions = [
    "How are you feeling today?",
    "Can you describe your symptoms?",
    "What medications are you currently taking?",
  ];

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-lg font-headline flex items-center">
          <LightBulbIcon className="mr-2 h-5 w-5 text-yellow-500" />
          Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto whitespace-normal"
              // onClick={() => onSuggestionClick?.(suggestion)} // You'll handle this
            >
              {suggestion}
            </Button>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No suggestions available at the moment.</p>
        )}
      </CardContent>
    </Card>
  );
}
