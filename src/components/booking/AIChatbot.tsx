import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, Send, Sparkles, X, Loader2, CheckCircle2, Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  bookingData?: any;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete?: (data: any) => void;
}

const AIChatbot = ({ isOpen, onClose, onBookingComplete }: AIChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI booking assistant. I can help you create a complete booking just by chatting. What would you like to book today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const simulateAIResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const lowerMessage = userMessage.toLowerCase();
    let response = "";
    let bookingData: any = null;

    // Simple AI logic for booking flow
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      response = "Hello! I'm here to help you create a booking. What destination are you interested in?";
    } else if (lowerMessage.includes("paris") || lowerMessage.includes("tokyo") || lowerMessage.includes("bali") || lowerMessage.includes("rome")) {
      const destination = lowerMessage.match(/(paris|tokyo|bali|rome)/i)?.[0] || "your destination";
      response = `Great choice! ${destination.charAt(0).toUpperCase() + destination.slice(1)} is a wonderful destination. What type of experience are you looking for? (e.g., food tour, history tour, museum visit, water sports)`;
      bookingData = { destination: destination };
    } else if (lowerMessage.includes("food") || lowerMessage.includes("culinary") || lowerMessage.includes("tasting")) {
      response = "Perfect! I've selected a food tour for you. How many guests will be joining?";
      bookingData = { category: "Food Tours" };
    } else if (lowerMessage.includes("history") || lowerMessage.includes("historic") || lowerMessage.includes("walking")) {
      response = "Excellent! I've selected a history tour for you. How many guests will be joining?";
      bookingData = { category: "History" };
    } else if (/\d+/.test(lowerMessage) && (lowerMessage.includes("guest") || lowerMessage.includes("people") || lowerMessage.includes("person"))) {
      const guests = parseInt(lowerMessage.match(/\d+/)?.[0] || "2");
      response = `Perfect! I've set ${guests} guest${guests > 1 ? "s" : ""}. What date would you like to travel? (e.g., June 15, 2024)`;
      bookingData = { guests };
    } else if (lowerMessage.includes("june") || lowerMessage.includes("july") || lowerMessage.includes("august") || /\d{1,2}\/\d{1,2}/.test(lowerMessage)) {
      response = "Great! I've noted the date. Would you like me to search for available tours and complete the booking? (Say 'yes' or 'complete booking')";
      bookingData = { date: "2024-06-15" };
    } else if (lowerMessage.includes("yes") || lowerMessage.includes("complete") || lowerMessage.includes("book") || lowerMessage.includes("confirm")) {
      response = "Perfect! I'm completing your booking now. This will include:\n• Searching for the best available tours\n• Comparing suppliers\n• Collecting traveler information\n• Processing payment\n• Generating your voucher\n\nYour booking will be ready shortly! ✅";
      bookingData = { status: "completing" };
      // Simulate booking completion
      setTimeout(() => {
        if (onBookingComplete) {
          onBookingComplete({
            destination: "Paris",
            category: "Food Tours",
            guests: 2,
            date: "2024-06-15",
            status: "completed",
          });
        }
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-success",
            role: "assistant",
            content: "🎉 Booking completed successfully! Your voucher has been generated and sent to your email.",
            timestamp: new Date(),
            bookingData: { status: "completed" },
          },
        ]);
      }, 2000);
    } else {
      response = "I understand. Could you provide more details? For example:\n• Destination\n• Type of experience\n• Number of guests\n• Travel date\n\nOr say 'complete booking' if you're ready to finalize!";
    }

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
      bookingData,
    };
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const aiResponse = await simulateAIResponse(userMessage.content);
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again or contact support.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: "Paris Food Tour", action: "I want to book a food tour in Paris for 2 people on June 15" },
    { label: "Tokyo History Walk", action: "Book a history walking tour in Tokyo for 4 guests" },
    { label: "Bali Water Sports", action: "I need water sports activities in Bali for 3 people" },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full sm:w-96 lg:w-[420px] bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-2xl border-l border-border/30 shadow-2xl transition-transform duration-500 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border/30 bg-gradient-to-r from-accent-blue/10 via-accent-indigo/10 to-accent-purple/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple shadow-lg ring-2 ring-white/20">
            <Bot className="h-5 w-5 text-white" />
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">AI Booking Assistant</h3>
            <p className="text-xs text-muted-foreground font-medium">Powered by AI</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-110"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent bg-gradient-to-b from-background to-muted/5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-fade-in",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple flex items-center justify-center shadow-lg ring-2 ring-white/20">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 shadow-md transition-all duration-300",
                message.role === "user"
                  ? "bg-gradient-to-r from-accent-blue to-accent-indigo text-white shadow-lg shadow-accent-blue/30"
                  : "bg-gradient-to-br from-muted/80 to-muted/60 text-foreground border border-border/30 backdrop-blur-sm"
              )}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
              {message.bookingData && message.bookingData.status === "completed" && (
                <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2 text-xs text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-semibold">Booking Confirmed</span>
                </div>
              )}
            </div>
            {message.role === "user" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
                <span className="text-xs font-bold text-foreground">U</span>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start animate-fade-in">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple flex items-center justify-center shadow-lg ring-2 ring-white/20">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-gradient-to-br from-muted/80 to-muted/60 rounded-2xl px-4 py-3 border border-border/30 backdrop-blur-sm shadow-md">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent-blue animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-accent-indigo animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-accent-purple animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-purple" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quick Actions</p>
            </div>
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="p-3.5 border border-border/30 bg-gradient-to-br from-background via-background to-muted/20 hover:from-accent-blue/10 hover:via-accent-indigo/10 hover:to-accent-purple/10 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-accent-blue/30 group"
                onClick={() => setInput(action.action)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-sm font-semibold text-foreground group-hover:text-accent-blue transition-colors">{action.label}</p>
              </Card>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 sm:p-5 border-t border-border/30 bg-gradient-to-r from-background via-background to-muted/10 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 h-11 bg-background/80 border-border/50 focus-visible:border-accent-blue/50 focus-visible:ring-2 focus-visible:ring-accent-blue/20 rounded-xl"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="h-11 w-11 p-0 rounded-xl bg-gradient-to-r from-accent-blue to-accent-indigo hover:from-accent-blue/90 hover:to-accent-indigo/90 shadow-lg shadow-accent-blue/30 hover:shadow-xl hover:shadow-accent-blue/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isTyping ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <Send className="h-4 w-4 text-white" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2.5 text-center font-medium">
          ✨ AI can complete your entire booking through conversation
        </p>
      </div>
    </div>
  );
};

export default AIChatbot;

