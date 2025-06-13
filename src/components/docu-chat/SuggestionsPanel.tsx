"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react"; // Changed from LightBulbIcon to Lightbulb

interface SuggestionsPanelProps {
  // Define any props you might need here in the future
  // e.g., onSuggestionClick: (suggestion: string) => void;
  // suggestions: string[];
}

export default function SuggestionsPanel({ /* Pass props here if needed */ }: SuggestionsPanelProps) {
  // Placeholder for suggestions - you will handle this logic
  const suggestions: string[] = [
    // "How are you feeling today?",
    // "Can you describe your symptoms?",
    // "What medications are you currently taking?",
  ];

  return (
    <Card className="shadow-lg rounded-lg w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-headline text-primary flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-accent" />
          AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {suggestions.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No suggestions available at the moment.</p>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {/* This is where you would map over actual suggestions if they existed */}
            {/* For now, it's empty as per your request */}
            {/* Example of how you might render suggestions:
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start"
                // onClick={() => onSuggestionClick(suggestion)} // Add your handler
              >
                {suggestion}
              </Button>
            ))}
            */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
