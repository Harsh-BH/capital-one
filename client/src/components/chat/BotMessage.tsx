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

interface BotMessageProps {
  message: string;
  isLoading?: boolean;
  attachment?: FileAttachment;
}

export function BotMessage({ message, isLoading = false, attachment }: BotMessageProps) {
  return (
    <div className="flex items-end gap-3">
      <Avatar className="h-8 w-8 border shadow-sm">
        <AvatarImage src="/bot-avatar.png" alt="AI" />
        <AvatarFallback className="bg-slate-800 text-white">AI</AvatarFallback>
      </Avatar>
      <div className="flex flex-col max-w-[80%] space-y-2">
        <Card className="p-4 bg-card border shadow-sm rounded-2xl rounded-bl-sm">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
          ) : (
            <>
              <p className="text-sm whitespace-pre-wrap">{message}</p>
              {attachment && <FilePreview file={attachment} />}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
