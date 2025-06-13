"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from "lucide-react";

interface SuggestionsPanelProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  isLoading: boolean;
}

export function SuggestionsPanel({
  suggestions,
  onSuggestionClick,
  isLoading,
}: SuggestionsPanelProps) {
  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-headline flex items-center">
          <Bot className="mr-2 h-5 w-5 text-primary" />
          AI Suggestions for Doctor
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full p-4">
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-accent hover:text-accent-foreground"
                    onClick={() => onSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No suggestions available at the moment.
            </p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
