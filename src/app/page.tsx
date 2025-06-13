"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import type { Message } from "@/types";
import { generateSuggestedPhrases } from "@/ai/flows/generate-suggested-phrases";
import { MessageInput } from "@/components/docu-chat/MessageInput";
import { MessageItem } from "@/components/docu-chat/MessageItem";
import { SuggestionsPanel } from "@/components/docu-chat/SuggestionsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { PersonIcon, ChatBubbleIcon } from "@radix-ui/react-icons";


const PATIENT_DETAILS = "The patient is here for a general consultation. Consider asking about their primary concerns, symptoms, medical history, and current medications. Be empathetic and ensure the patient feels heard.";

export default function DocuChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { toast } = useToast();

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
  }, [messages.filter(m => m.sender === 'patient')]);

  useEffect(() => {
    scrollToBottom(doctorScrollAreaRef);
  }, [messages.filter(m => m.sender === 'doctor')]);


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

  const handleDoctorSuggestionClick = (suggestionText: string) => {
    addMessage("doctor", suggestionText);
  };

  useEffect(() => {
    if (messages.length === 0) {
        // Optionally set initial suggestions or leave empty
        // For instance, provide some generic opening suggestions
        setSuggestions([
            "Hello, how can I help you today?",
            "What brings you in today?",
            "Please tell me about your symptoms."
        ]);
        return;
    }

    const fetchSuggestions = async () => {
      setIsLoadingSuggestions(true);
      try {
        const conversationHistory = messages
          .map((m) => `${m.sender === "doctor" ? "Doctor" : "Patient"}: ${m.text}`)
          .join("\n");
        
        const result = await generateSuggestedPhrases({
          conversationHistory,
          patientDetails: PATIENT_DETAILS,
        });
        setSuggestions(result.suggestedPhrases || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        toast({
          title: "Error",
          description: "Could not load AI suggestions. Please try again.",
          variant: "destructive",
        });
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    // Fetch suggestions if the last message was from patient or if it's the first doctor message after patient.
    // Or more simply, fetch after any new message to keep suggestions fresh.
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
        fetchSuggestions();
    }

  }, [messages, toast]);
  
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
              isLoading={isLoadingSuggestions}
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

      <Separator/>

      {/* Bottom Section: AI Suggestions */}
      <div className="h-1/3 md:h-1/4 lg:h-1/3 max-h-[300px] md:max-h-[350px] overflow-hidden">
        <SuggestionsPanel
          suggestions={suggestions}
          onSuggestionClick={handleDoctorSuggestionClick}
          isLoading={isLoadingSuggestions}
        />
      </div>
    </main>
  );
}
