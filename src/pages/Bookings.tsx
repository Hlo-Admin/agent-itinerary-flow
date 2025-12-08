import { Fragment, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchExperiences from "@/components/booking/SearchExperiences";
import SearchResults from "@/components/booking/SearchResults";
import ProductDetail from "@/components/booking/ProductDetail";
import TravelerInfoForm from "@/components/booking/TravelerInfoForm";
import PriceSummary from "@/components/booking/PriceSummary";
import PaymentOptions from "@/components/booking/PaymentOptions";
import VoucherView from "@/components/booking/VoucherView";
import EmailTemplate from "@/components/booking/EmailTemplate";
import AIChatbot from "@/components/booking/AIChatbot";

type BookingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const Bookings = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [bookingData, setBookingData] = useState<any>({});
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const steps = [
    { number: 1, title: "Search" },
    { number: 2, title: "Results" },
    { number: 3, title: "Details" },
    { number: 4, title: "Travelers" },
    { number: 5, title: "Payment" },
    { number: 6, title: "Confirm" },
    { number: 7, title: "Voucher" },
    { number: 8, title: "Email" },
  ];

  const progress = (currentStep / 8) * 100;

  const handleNext = (data?: any) => {
    if (data) {
      setBookingData({ ...bookingData, ...data });
    }
    if (currentStep < 8) {
      setCurrentStep((prev) => (prev + 1) as BookingStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BookingStep);
    }
  };

  const handleBookingComplete = (data: any) => {
    setBookingData(data);
    // Optionally navigate to voucher or confirmation step
    if (data.status === "completed") {
      setCurrentStep(8); // Voucher step
    }
  };

  return (
    <div className="relative flex h-full w-full min-w-0 max-w-full overflow-hidden">
      {/* Main Booking Section - Middle */}
      <div className={cn(
        "flex-1 overflow-y-auto transition-all duration-500 ease-in-out",
        isChatbotOpen ? "mr-0 sm:mr-96 lg:mr-[420px]" : "mr-0"
      )}>
        <div className="space-y-4 sm:space-y-12 w-full min-w-0 max-w-full p-1.5 sm:p-6 lg:p-8 animate-fade-in">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 sm:space-y-2 w-full min-w-0 flex-1">
              <h1 className="text-xl sm:text-4xl font-bold text-foreground tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">New Booking</h1>
              <p className="text-muted-foreground text-xs sm:text-base">Create a new travel booking for your clients</p>
            </div>
            <Button
              onClick={() => setIsChatbotOpen(!isChatbotOpen)}
              className={cn(
                "h-10 w-10 sm:h-12 sm:w-12 p-0 rounded-xl shadow-lg transition-all duration-300 flex-shrink-0",
                isChatbotOpen
                  ? "bg-gradient-to-r from-accent-blue to-accent-indigo text-white"
                  : "bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 text-accent-blue hover:from-accent-blue/20 hover:to-accent-indigo/20 border border-accent-blue/20"
              )}
            >
              <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>

      <Card className="p-1.5 sm:p-8 border border-border/40 w-full min-w-0 max-w-full box-border overflow-hidden shadow-xl bg-gradient-to-br from-background via-background to-muted/10">
        <div className="space-y-3 sm:space-y-10 w-full min-w-0 max-w-full overflow-hidden">
          <div className="space-y-3 sm:space-y-8 w-full max-w-full">
            <div className="w-full max-w-full overflow-x-auto pb-2 -mx-1.5 sm:mx-0 px-1.5 sm:px-0 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <div className="flex items-center gap-1 sm:gap-3 min-w-max">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.number;
                  const isComplete = currentStep > step.number;

                  return (
                    <Fragment key={step.number}>
                      <div className="flex flex-col items-center min-w-[32px] sm:min-w-[52px] flex-shrink-0 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                        <div
                          className={`relative flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 text-[9px] sm:text-sm font-bold transition-all duration-500 ${
                            isActive
                              ? "border-accent-blue bg-gradient-to-br from-accent-blue to-accent-indigo text-white shadow-lg shadow-accent-blue/30 scale-110 ring-2 ring-accent-blue/20"
                              : isComplete
                              ? "border-accent-blue/60 bg-gradient-to-br from-accent-blue/20 to-accent-indigo/20 text-accent-blue shadow-md"
                              : "border-border/50 bg-gradient-to-br from-muted to-muted/80 text-muted-foreground"
                          }`}
                        >
                          {step.number}
                          {isActive && (
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent animate-pulse" />
                          )}
                        </div>
                        <span
                          className={`mt-1.5 sm:mt-2 text-[8px] sm:text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition-all duration-300 ${
                            isActive 
                              ? "text-accent-blue font-bold" 
                              : isComplete
                              ? "text-accent-blue/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`h-0.5 min-w-[8px] sm:min-w-[16px] transition-all duration-500 rounded-full ${
                            currentStep > step.number 
                              ? "bg-gradient-to-r from-accent-blue to-accent-indigo shadow-sm" 
                              : "bg-border/50"
                          }`}
                          style={{ width: 'clamp(8px, 2.5vw, 24px)' }}
                        />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div>
            {currentStep === 1 && <SearchExperiences onNext={handleNext} />}
            {currentStep === 2 && <SearchResults onNext={handleNext} onBack={handleBack} searchData={bookingData} />}
            {currentStep === 3 && <ProductDetail onNext={handleNext} onBack={handleBack} tourData={bookingData} />}
            {currentStep === 4 && <TravelerInfoForm onNext={handleNext} bookingData={bookingData} />}
            {currentStep === 5 && <PriceSummary onNext={handleNext} onBack={handleBack} bookingData={bookingData} />}
            {currentStep === 6 && <PaymentOptions onNext={handleNext} onBack={handleBack} />}
            {currentStep === 7 && <VoucherView onNext={handleNext} bookingData={bookingData} />}
            {currentStep === 8 && <EmailTemplate bookingData={bookingData} />}
          </div>
        </div>
      </Card>
        </div>
      </div>

      {/* AI Chatbot Section - Right */}
      <AIChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
};

export default Bookings;
