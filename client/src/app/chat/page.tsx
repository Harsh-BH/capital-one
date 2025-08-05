"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from '@/components/chat/ChatMessage';
import { BotMessage } from '@/components/chat/BotMessage';
import { SendIcon, ArrowLeftIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { FileUploadButton } from '@/components/chat/FileUploadButton';
import { FileUploadPreview } from '@/components/chat/FileUploadPreview';
import { toast, Toaster } from "sonner";

interface FileAttachment {
  url: string;
  type: 'document' | 'image' | 'video';
  name: string;
  size?: number;
}

interface Message {
  role: 'user' | 'bot';
  content: string;
  attachment?: FileAttachment;
}

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hello! How can I assist you today? I can now process text, images, documents, and videos. Try uploading a file to get started.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'document' | 'image' | 'video' | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileSelect = (file: File, type: 'document' | 'image' | 'video') => {
    setUploadedFile(file);
    setFileType(type);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileType(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasMessage = input.trim().length > 0;
    const hasFile = uploadedFile !== null;
    
    if (!hasMessage && !hasFile) return;

    let attachment: FileAttachment | undefined;
    
    // Handle file upload if present
    if (hasFile && fileType && uploadedFile) {
      try {
        // For demo purposes, we'll simulate a successful upload
        // In a real app, you would upload the file to your server or cloud storage
        
        // Simulate file upload delay
        setIsLoading(true);
        
        // Create a data URL for the demo
        // In production, replace this with an actual upload to get a proper URL
        const reader = new FileReader();
        
        const uploadPromise = new Promise<string>((resolve) => {
          reader.onload = () => {
            resolve(reader.result as string);
          };
        });
        
        if (fileType === 'image' || fileType === 'video') {
          reader.readAsDataURL(uploadedFile);
        } else {
          // For documents, we'd typically upload to a server and get a URL
          // For demo, we'll create a blob URL
          reader.readAsDataURL(uploadedFile);
        }
        
        const fileUrl = await uploadPromise;
        
        attachment = {
          url: fileUrl,
          type: fileType,
          name: uploadedFile.name,
          size: uploadedFile.size
        };
        
      } catch (error) {
        console.error('File upload failed:', error);
        toast.error('File upload failed');
        setIsLoading(false);
        return;
      }
    }
    
    // Add user message to chat
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: hasMessage ? input : uploadedFile?.name || 'Uploaded a file', 
      attachment 
    }]);
    
    // Clear input and uploaded file
    setInput('');
    setUploadedFile(null);
    setFileType(null);
    setIsLoading(true);
    
    try {
      // Call the API route with the message and file info
      const formData = new FormData();
      if (hasMessage) formData.append('message', input);
      if (hasFile && uploadedFile) {
        formData.append('file', uploadedFile);
        formData.append('fileType', fileType || '');
      }
      
      // In a real app, you'd use formData with fetch for file uploads
      // For this demo, we'll simulate a response
      
      setTimeout(() => {
        let responseMessage: string;
        
        if (attachment) {
          switch (attachment.type) {
            case 'image':
              responseMessage = "I've received your image. This appears to be " + 
                (attachment.name.includes('chart') ? "a chart or graph" : "a photo") + 
                ". In a production environment, I would analyze this image and provide detailed insights.";
              break;
            case 'document':
              responseMessage = `I've received your document: "${attachment.name}". In a production environment, I would extract text from this document and analyze its contents.`;
              break;
            case 'video':
              responseMessage = `I've received your video: "${attachment.name}". In a production environment, I would process key frames and potentially transcribe any audio.`;
              break;
            default:
              responseMessage = `I've received your file. In a production environment, I would process this according to its content type.`;
          }
        } else {
          responseMessage = `I received your message: "${input}". This is a simulated AI response that would normally be processed by a backend API.`;
        }
        
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: responseMessage
        }]);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Sorry, I encountered an error processing your request.' 
      }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-muted/30">
      <Toaster position="top-center" />
      
      <header className="sticky top-0 z-10 backdrop-blur-sm border-b p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="sr-only">Back to home</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Multimodal AI Assistant</h1>
        </div>
        <ThemeToggle />
      </header>
      
      <ScrollArea className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message, i) => (
            <div key={i} className="transition-all duration-300 ease-in-out animate-fadeIn">
              {message.role === 'user' ? 
                <ChatMessage message={message.content} attachment={message.attachment} /> :
                <BotMessage message={message.content} attachment={message.attachment} />
              }
            </div>
          ))}
          
          {isLoading && (
            <div className="transition-all duration-300 ease-in-out animate-fadeIn">
              <BotMessage message="Processing..." isLoading={true} />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      
      <div className="border-t bg-background/80 backdrop-blur-sm p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          {uploadedFile && fileType && (
            <div className="mb-3 max-w-[300px]">
              <FileUploadPreview 
                file={uploadedFile} 
                fileType={fileType} 
                onRemove={removeFile} 
              />
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <FileUploadButton 
              onFileSelect={handleFileSelect} 
              disabled={isLoading || !!uploadedFile}
            />
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={uploadedFile ? "Add a message or send the file..." : "Type a message..."}
              className="flex-1 py-6 bg-background border-muted shadow-sm"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-full h-10 w-10 shrink-0" 
              disabled={isLoading || (!input.trim() && !uploadedFile)}
            >
              <SendIcon className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
