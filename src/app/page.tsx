"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageInput from '@/components/docu-chat/MessageInput';
import MessageItem from '@/components/docu-chat/MessageItem';
import SuggestionsPanel from '@/components/docu-chat/SuggestionsPanel';
import type { Message } from '@/types';

export default function DocuChatPage() {
  const [doctorMessages, setDoctorMessages] = useState<Message[]>([]);
  const [patientMessages, setPatientMessages] = useState<Message[]>([]);
  const [doctorInput, setDoctorInput] = useState('');
  const [patientInput, setPatientInput] = useState('');

  const doctorScrollAreaRef = useRef<HTMLDivElement>(null);
  const patientScrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollableViewport = ref.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollableViewport) {
        scrollableViewport.scrollTop = scrollableViewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom(doctorScrollAreaRef);
  }, [doctorMessages]);

  useEffect(() => {
    scrollToBottom(patientScrollAreaRef);
  }, [patientMessages]);

  const handleSendMessage = (
    text: string,
    sender: 'doctor' | 'patient',
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (text.trim() === '') return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body">
      <header className="p-4 bg-primary text-primary-foreground shadow-md">
        <h1 className="text-2xl font-headline text-center">DocuChat</h1>
      </header>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-px bg-border overflow-hidden">
        {/* Doctor's Area */}
        <div className="flex flex-col bg-background p-4 overflow-hidden">
          <Card className="flex-grow flex flex-col shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-4 flex-grow overflow-y-auto">
              <ScrollArea className="h-full pr-3" ref={doctorScrollAreaRef}>
                {doctorMessages.length === 0 && <p className="text-sm text-muted-foreground italic text-center py-4">Doctor's chat history will appear here.</p>}
                {doctorMessages.map((msg) => (
                  <MessageItem key={msg.id} message={msg} />
                ))}
              </ScrollArea>
            </CardContent>
            <Separator />
            <div className="p-4 border-t">
              <MessageInput
                label="Doctor Message"
                value={doctorInput}
                onChange={setDoctorInput}
                onSend={() => handleSendMessage(doctorInput, 'doctor', setDoctorMessages, setDoctorInput)}
                placeholder="Type doctor's message..."
              />
            </div>
          </Card>
        </div>

        {/* Patient's Area */}
        <div className="flex flex-col bg-background p-4 overflow-hidden">
          <Card className="flex-grow flex flex-col shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-4 flex-grow overflow-y-auto">
              <ScrollArea className="h-full pr-3" ref={patientScrollAreaRef}>
                {patientMessages.length === 0 && <p className="text-sm text-muted-foreground italic text-center py-4">Patient's chat history will appear here.</p>}
                {patientMessages.map((msg) => (
                  <MessageItem key={msg.id} message={msg} />
                ))}
              </ScrollArea>
            </CardContent>
            <Separator />
            <div className="p-4 border-t">
              <MessageInput
                label="Patient Message"
                value={patientInput}
                onChange={setPatientInput}
                onSend={() => handleSendMessage(patientInput, 'patient', setPatientMessages, setPatientInput)}
                placeholder="Type patient's message..."
              />
            </div>
          </Card>
        </div>
      </div>
      
      <Separator />
      <div className="p-4 bg-background">
        <SuggestionsPanel />
      </div>
    </div>
  );
}
