import Link from "next/link";
import { ArrowRightIcon, MessageCircleIcon, SparklesIcon, ZapIcon, HeartIcon, CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header - Improved responsiveness */}
      <header className="sticky top-0 z-50 backdrop-blur-lg border-b bg-background/70">
        <div className="container flex h-14 sm:h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <MessageCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-base sm:text-lg font-bold">AI Assistant</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/chat" className="hidden sm:block">
              <Button variant="outline" size="sm" className="rounded-full">
                Try it free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Fixed animation and improved responsiveness */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/5"></div>
          <div className="container relative px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Content column - Fixed responsive text sizing */}
              <div className="flex flex-col gap-4 sm:gap-6 animate__animated animate__fadeInLeft animate__once">
                <div className="space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center rounded-full border px-3 py-1 sm:px-4 sm:py-1.5 text-sm font-medium bg-background/60 backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                    Now with multimodal support
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                    Your Intelligent <br className="hidden sm:block" />
                    <span className="text-primary">AI Assistant</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-[550px]">
                    Experience the power of AI conversation enhanced with document, image, and video processing capabilities.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/chat" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto gap-1.5 rounded-full">
                      Start Chatting <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto">
                    Learn more
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">Free to use</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">No sign up required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">Secure & private</span>
                  </div>
                </div>
              </div>
              
              {/* Chat preview - Fixed animation issues and improved responsiveness */}
              <div className="float lg:ml-auto w-full max-w-[90%] sm:max-w-[500px] mx-auto animate__animated  ">
                <div className="p-2 sm:p-3 md:p-6 bg-background/80 backdrop-blur-lg rounded-2xl shadow-xl border">
                  {/* Chat preview */}
                  <div className="w-full h-full bg-muted/30 backdrop-blur-sm rounded-xl border shadow-lg flex flex-col">
                    <div className="p-2 sm:p-3 border-b flex items-center gap-2">
                      <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500"></div>
                      <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500"></div>
                      <div className="ml-2 text-xs sm:text-sm font-medium">AI Chat Preview</div>
                    </div>
                    <div className="flex-1 p-2 sm:p-3 space-y-3 overflow-y-auto max-h-[200px] sm:max-h-[300px]">
                      <div className="flex gap-2 items-start">
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs">AI</div>
                        <div className="bg-card p-2 rounded-lg max-w-[75%]">
                          <p className="text-xs">Hello! How can I assist you today?</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start justify-end">
                        <div className="bg-primary text-primary-foreground p-2 rounded-lg max-w-[75%]">
                          <p className="text-xs">Can you tell me about this chat application?</p>
                        </div>
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">U</div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs">AI</div>
                        <div className="bg-card p-2 rounded-lg max-w-[75%]">
                          <p className="text-xs">This AI can process text, images, and documents. Try uploading a file to see how it works!</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 sm:p-3 border-t">
                      <div className="flex gap-2">
                        <div className="flex-1 h-8 rounded-md border bg-background px-3 py-1 text-xs">
                          Type your message...
                        </div>
                        <button className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <ArrowRightIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Responsive wave svg */}
          <div className="w-full overflow-hidden mt-8">
            <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0 0L48 8.88889C96 17.7778 192 35.5556 288 44.4444C384 53.3333 480 53.3333 576 62.2222C672 71.1111 768 88.8889 864 88.8889C960 88.8889 1056 71.1111 1152 62.2222C1248 53.3333 1344 53.3333 1392 53.3333L1440 53.3333V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z" fill="currentColor" fillOpacity="0.1" />
            </svg>
          </div>
        </section>
        
        {/* Features Section - Improved responsive layout */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8 sm:mb-12 animate__animated animate__fadeInUp animate__once">
              <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs sm:text-sm mb-3 sm:mb-4">
                <SparklesIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primary" />
                Features
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">Intelligent Conversation</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI chatbot brings the power of artificial intelligence to your fingertips with these powerful features.
              </p>
            </div>
            
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 - Fixed animation */}
              <div className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm h-full transform transition-all duration-200 hover:shadow-md hover:-translate-y-1 animate__animated animate__fadeInUp animate__once">
                <div className="rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Smart Responses</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Advanced AI models provide intelligent and relevant responses to your questions, adapting to your specific needs.
                </p>
              </div>
              
              {/* Card 2 - Fixed animation */}
              <div className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm h-full transform transition-all duration-200 hover:shadow-md hover:-translate-y-1 animate__animated animate__fadeInUp animate__once" style={{ animationDelay: "0.2s" }}>
                <div className="rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <ZapIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Fast & Responsive</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Get quick answers with our optimized interface and efficient processing, saving you valuable time.
                </p>
              </div>
              
              {/* Card 3 - Fixed animation */}
              <div className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm h-full transform transition-all duration-200 hover:shadow-md hover:-translate-y-1 animate__animated animate__fadeInUp animate__once" style={{ animationDelay: "0.4s" }}>
                <div className="rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Personalized Experience</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Conversations tailored to your needs with contextual understanding and memory of previous interactions.
                </p>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-12 text-center">
              <Link href="/chat">
                <Button size="lg" className="animate__animated animate__pulse animate__slow rounded-full">
                  Try It Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Call to Action - Improved responsiveness */}
        <section className="relative py-16 sm:py-20 md:py-32 overflow-hidden bg-muted/30">
          <div className="container relative px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto animate__animated animate__zoomIn animate__once">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-6">Ready to experience the future of AI assistance?</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto">
                Start chatting with our AI assistant today and discover how it can transform the way you work.
              </p>
              <Link href="/chat">
                <Button size="lg" className="rounded-full px-6 sm:px-8 w-full sm:w-auto">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer - Improved responsiveness */}
      <footer className="border-t bg-background">
        <div className="container px-4 md:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <MessageCircleIcon className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">AI Assistant</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <Link href="/chat" className="text-xs sm:text-sm hover:text-primary transition-colors">
                Open Chat
              </Link>
              <Link href="#" className="text-xs sm:text-sm hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#" className="text-xs sm:text-sm hover:text-primary transition-colors">
                About
              </Link>
            </div>
            <ThemeToggle />
          </div>
          <div className="border-t mt-6 pt-4 sm:pt-6 text-center sm:text-left">
            <p className="text-xs text-muted-foreground">© 2023 AI Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
