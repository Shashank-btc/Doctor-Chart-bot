"use client";

import type * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { PaperPlaneIcon } from "@radix-ui/react-icons"; // Using a common icon

interface MessageInputProps {
  role: "Doctor" | "Patient";
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const FormSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
});

export function MessageInput({ role, onSendMessage, isLoading = false }: MessageInputProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onSendMessage(data.message);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end space-x-2 py-2">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <Label htmlFor={`${role.toLowerCase()}-message-input`} className="font-headline text-sm">
                {role}
              </Label>
              <FormControl>
                <Input
                  id={`${role.toLowerCase()}-message-input`}
                  placeholder={`Type ${role.toLowerCase()} message...`}
                  autoComplete="off"
                  {...field}
                  className="mt-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} aria-label={`Send ${role} message`}>
          <PaperPlaneIcon className="h-4 w-4 mr-2" />
          Send
        </Button>
      </form>
    </Form>
  );
}
