import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilePreview } from "./FilePreview";

interface FileAttachment {
  url: string;
  type: 'document' | 'image' | 'video';
  name: string;
  size?: number;
}

interface ChatMessageProps {
  message: string;
  attachment?: FileAttachment;
}

export function ChatMessage({ message, attachment }: ChatMessageProps) {
  return (
    <div className="flex items-end gap-3 justify-end">
      <div className="flex flex-col max-w-[80%] space-y-2">
        <Card className="p-4 bg-primary text-primary-foreground rounded-2xl rounded-br-sm shadow-md">
          <p className="text-sm whitespace-pre-wrap">{message}</p>
          {attachment && <FilePreview file={attachment} />}
        </Card>
      </div>
      <Avatar className="h-8 w-8 border shadow-sm">
        <AvatarFallback className="bg-blue-600 text-white">U</AvatarFallback>
        {/* Optionally add user image: <AvatarImage src="/user-avatar.png" alt="User" /> */}
      </Avatar>
    </div>
  );
}
