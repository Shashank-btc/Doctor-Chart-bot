"use client";

import type { Message } from '@/types';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isDoctor = message.sender === 'doctor';

  return (
    <div className={cn("flex mb-3", isDoctor ? "justify-end" : "justify-start")}>
      <Card 
        className={cn(
          "max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg shadow-md",
          isDoctor ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none"
        )}
      >
        <CardContent className="p-0">
          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
          <p className={cn(
            "text-xs mt-1", 
            isDoctor ? "text-primary-foreground/80 text-right" : "text-muted-foreground text-left"
            )}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
