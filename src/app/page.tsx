
"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import type { Message } from "@/types";
import { MessageInput } from "@/components/docu-chat/MessageInput";
import { MessageItem } from "@/components/docu-chat/MessageItem";
import { SuggestionsPanel } from "@/components/docu-chat/SuggestionsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PersonIcon, ChatBubbleIcon } from "@radix-ui/react-icons";


export default function DocuChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const patientScrollAreaRef = useRef<HTMLDivElement>(null);
  const doctorScrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollViewport = ref.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  };
  
  useEffect(() => {
    scrollToBottom(patientScrollAreaRef);
  }, [messages.filter(m => m.sender === 'patient').length]); 

  useEffect(() => {
    scrollToBottom(doctorScrollAreaRef);
  }, [messages.filter(m => m.sender === 'doctor').length]); 


  const addMessage = (sender: "doctor" | "patient", text: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      sender,
      text,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSendDoctorMessage = (text: string) => {
    addMessage("doctor", text);
  };

  const handleSendPatientMessage = (text: string) => {
    addMessage("patient", text);
  };
  
  return (
    <main className="flex flex-col h-screen bg-background text-foreground p-4 sm:p-6 md:p-8 font-body gap-4">
      {/* Top Section: Inputs and Message History */}
      <div className="flex flex-col flex-grow overflow-hidden gap-4">
        {/* Input Fields */}
        <Card className="shadow-md">
          <CardContent className="p-4 space-y-1">
            <MessageInput
              role="Doctor"
              onSendMessage={handleSendDoctorMessage}
            />
            <MessageInput
              role="Patient"
              onSendMessage={handleSendPatientMessage}
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Message History */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden gap-4">
          {/* Patient Messages */}
          <Card className="w-full md:w-1/2 flex flex-col shadow-md overflow-hidden">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-xl font-headline flex items-center justify-center">
                <PersonIcon className="mr-2 h-5 w-5 text-secondary-foreground" />
                Patient
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-2 md:p-4">
              <ScrollArea className="h-full" ref={patientScrollAreaRef}>
                <div className="pr-2 space-y-2">
                {messages
                  .filter((m) => m.sender === "patient")
                  .map((msg) => (
                    <MessageItem key={msg.id} message={msg} alignment="left" />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          {/* Doctor Messages */}
          <Card className="w-full md:w-1/2 flex flex-col shadow-md overflow-hidden">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-xl font-headline flex items-center justify-center">
                <ChatBubbleIcon className="mr-2 h-5 w-5 text-primary" />
                Doctor
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-2 md:p-4">
              <ScrollArea className="h-full" ref={doctorScrollAreaRef}>
                <div className="pr-2 space-y-2">
                {messages
                  .filter((m) => m.sender === "doctor")
                  .map((msg) => (
                    <MessageItem key={msg.id} message={msg} alignment="right" />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Suggestions Panel */}
      <div className="mt-auto"> {/* Ensures it's pushed to the bottom if main content is short, but flex-grow above handles most cases */}
        <SuggestionsPanel />
      </div>
    </main>
  );
}
