import { XIcon, FileIcon, FileTextIcon, ImageIcon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadPreviewProps {
  file: File;
  fileType: 'document' | 'image' | 'video';
  onRemove: () => void;
}

export function FileUploadPreview({ file, fileType, onRemove }: FileUploadPreviewProps) {
  const getIcon = () => {
    switch (fileType) {
      case 'document':
        return file.name.endsWith('.pdf') ? 
          <FileTextIcon className="h-4 w-4" /> : 
          <FileIcon className="h-4 w-4" />;
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'video':
        return <VideoIcon className="h-4 w-4" />;
      default:
        return <FileIcon className="h-4 w-4" />;
    }
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  // Preview for image
  const renderPreview = () => {
    if (fileType === 'image') {
      const imageUrl = URL.createObjectURL(file);
      return (
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={file.name}
            className="h-10 w-10 rounded-md object-cover"
            onLoad={() => URL.revokeObjectURL(imageUrl)}
          />
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-muted">
        {getIcon()}
      </div>
    );
  };
  
  return (
    <div className="flex items-center gap-2 bg-muted/50 p-1.5 pl-2 rounded-md">
      {renderPreview()}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 rounded-full"
        onClick={onRemove}
      >
        <XIcon className="h-3 w-3" />
        <span className="sr-only">Remove file</span>
      </Button>
    </div>
  );
}
