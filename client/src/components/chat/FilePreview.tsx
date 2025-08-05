import { useState } from "react";
import { XIcon, DownloadIcon, FileTextIcon, FileIcon, ImageIcon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FilePreviewProps {
  file: {
    url: string;
    type: 'document' | 'image' | 'video';
    name: string;
    size?: number;
  };
}

export function FilePreview({ file }: FilePreviewProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Format file size
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  // Determine icon based on file type
  const getFileIcon = () => {
    switch (file.type) {
      case 'document':
        return file.name.endsWith('.pdf') ? 
          <FileTextIcon className="h-5 w-5" /> : 
          <FileIcon className="h-5 w-5" />;
      case 'image':
        return <ImageIcon className="h-5 w-5" />;
      case 'video':
        return <VideoIcon className="h-5 w-5" />;
      default:
        return <FileIcon className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="mt-2 group relative">
      {/* Image preview */}
      {file.type === 'image' && (
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <img 
                src={file.url} 
                alt={file.name}
                className="max-w-[240px] max-h-[180px] rounded-md object-cover border"
              />
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                {getFileIcon()} <span className="ml-1">{file.name} {formatFileSize(file.size)}</span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-[calc(100vw-2rem)]">
            <img 
              src={file.url} 
              alt={file.name}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </DialogContent>
        </Dialog>
      )}
      
      {/* Document preview */}
      {file.type === 'document' && (
        <div className="border rounded-md p-3 max-w-xs bg-muted/30">
          <div className="flex items-center">
            {getFileIcon()}
            <span className="ml-2 text-sm font-medium truncate max-w-[180px]">
              {file.name}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {formatFileSize(file.size)}
          </div>
          <div className="mt-2">
            <a 
              href={file.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-primary hover:underline"
            >
              View document
            </a>
          </div>
        </div>
      )}
      
      {/* Video preview */}
      {file.type === 'video' && (
        <div className="max-w-sm">
          <video 
            controls 
            className="w-full rounded-md border"
            preload="metadata"
          >
            <source src={file.url} type={`video/${file.name.split('.').pop()}`} />
            Your browser does not support the video tag.
          </video>
          <div className="text-xs text-muted-foreground mt-1 flex items-center">
            {getFileIcon()} <span className="ml-1">{file.name} {formatFileSize(file.size)}</span>
          </div>
        </div>
      )}
      
      {/* Download button (appears on hover for all file types) */}
      <a 
        href={file.url} 
        download={file.name}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Button size="icon" variant="secondary" className="h-7 w-7 rounded-full">
          <DownloadIcon className="h-4 w-4" />
        </Button>
      </a>
    </div>
  );
}
