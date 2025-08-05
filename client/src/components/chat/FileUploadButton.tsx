import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  PaperclipIcon, 
  FileTextIcon, 
  ImageIcon, 
  VideoIcon, 
  XIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface FileUploadButtonProps {
  onFileSelect: (file: File, type: 'document' | 'image' | 'video') => void;
  disabled?: boolean;
}

// Allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];

// Maximum file sizes (in bytes)
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

export function FileUploadButton({ onFileSelect, disabled = false }: FileUploadButtonProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    type: 'document' | 'image' | 'video'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    let isValidType = false;
    let maxSize = 0;
    
    switch (type) {
      case 'image':
        isValidType = ALLOWED_IMAGE_TYPES.includes(file.type);
        maxSize = MAX_IMAGE_SIZE;
        break;
      case 'document':
        isValidType = ALLOWED_DOCUMENT_TYPES.includes(file.type);
        maxSize = MAX_DOCUMENT_SIZE;
        break;
      case 'video':
        isValidType = ALLOWED_VIDEO_TYPES.includes(file.type);
        maxSize = MAX_VIDEO_SIZE;
        break;
    }
    
    if (!isValidType) {
      toast.error(`Invalid ${type} format`);
      e.target.value = '';
      return;
    }
    
    // Validate file size
    if (file.size > maxSize) {
      toast.error(`${type.charAt(0).toUpperCase() + type.slice(1)} is too large`);
      e.target.value = '';
      return;
    }
    
    // Pass the valid file to the parent component
    onFileSelect(file, type);
    e.target.value = '';
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PaperclipIcon className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem 
            onClick={() => documentInputRef.current?.click()}
            className="cursor-pointer"
          >
            <FileTextIcon className="mr-2 h-4 w-4" />
            Document
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => imageInputRef.current?.click()}
            className="cursor-pointer"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Image
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => videoInputRef.current?.click()}
            className="cursor-pointer"
          >
            <VideoIcon className="mr-2 h-4 w-4" />
            Video
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={documentInputRef}
        accept=".pdf,.doc,.docx,.txt"
        onChange={(e) => handleFileChange(e, 'document')}
        className="hidden"
      />
      <input
        type="file"
        ref={imageInputRef}
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={(e) => handleFileChange(e, 'image')}
        className="hidden"
      />
      <input
        type="file"
        ref={videoInputRef}
        accept="video/mp4,video/webm,video/ogg"
        onChange={(e) => handleFileChange(e, 'video')}
        className="hidden"
      />
    </>
  );
}
