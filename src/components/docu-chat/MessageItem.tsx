import type { Message } from "@/types";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MessageItemProps {
  message: Message;
  alignment: "left" | "right";
}

export function MessageItem({ message, alignment }: MessageItemProps) {
  const isDoctor = message.sender === "doctor";
  const avatarInitial = message.sender.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "flex items-end gap-2 mb-3 max-w-[85%]",
        alignment === "right" ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      <Avatar className="h-8 w-8 self-start">
        <AvatarFallback className={cn(isDoctor ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>
          {avatarInitial}
        </AvatarFallback>
      </Avatar>
      <Card
        className={cn(
          "rounded-lg shadow-sm",
          isDoctor ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground border"
        )}
      >
        <CardContent className="p-3">
          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
          <p
            className={cn(
              "text-xs mt-1",
              isDoctor ? "text-primary-foreground/70" : "text-muted-foreground" ,
              alignment === 'right' ? 'text-right' : 'text-left'
            )}
          >
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
