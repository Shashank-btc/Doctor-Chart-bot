"use client";

import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from 'lucide-react';

interface MessageInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
}

export default function MessageInput({ label, value, onChange, onSend, placeholder }: MessageInputProps) {
  const handleSendClick = () => {
    if (value.trim()) {
      onSend();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`${label.toLowerCase().replace(' ', '-')}-input`} className="text-sm font-medium text-primary">
        {label}
      </Label>
      <div className="flex items-end space-x-2">
        <Textarea
          id={`${label.toLowerCase().replace(' ', '-')}-input`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || `Type ${label.toLowerCase()} message here...`}
          className="flex-grow resize-none rounded-md shadow-sm focus:ring-primary focus:border-primary min-h-[60px]"
          rows={2}
        />
        <Button onClick={handleSendClick} variant="default" size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-md shadow-sm">
          <Send className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}
