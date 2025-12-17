import { Fragment, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Bot, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchExperiences from "@/components/booking/SearchExperiences";
import SearchResults from "@/components/booking/SearchResults";
import ProductDetail from "@/components/booking/ProductDetail";
import TravelerInfoForm from "@/components/booking/TravelerInfoForm";
import Payment from "@/components/booking/Payment";
import VoucherView from "@/components/booking/VoucherView";
import EmailTemplate from "@/components/booking/EmailTemplate";
import AIChatbot from "@/components/booking/AIChatbot";

type BookingStep = 1 | 2 | 3 | 4 | 5;

const Bookings = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [bookingData, setBookingData] = useState<any>({});
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const steps = [
    { number: 1, title: "Search" },
    { number: 2, title: "Details" },
    { number: 3, title: "Travelers" },
    { number: 4, title: "Payment" },
    { number: 5, title: "Ticket" },
  ];

  const progress = (currentStep / 5) * 100;

  const handleNext = (data?: any) => {
    if (data) {
      setBookingData({ ...bookingData, ...data });
    }
    if (currentStep < 5) {
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
      setCurrentStep(5); // Confirmation step
    }
  };

  return (
    <div className="relative flex h-full w-full min-w-0 max-w-full overflow-hidden">
      {/* Main Booking Section - Middle */}
      <div className={cn(
        "flex-1 overflow-y-auto transition-all duration-500 ease-in-out",
        isChatbotOpen ? "mr-0 sm:mr-96 lg:mr-[420px]" : "mr-0"
      )}>
        <div className="space-y-3 sm:space-y-6 w-full min-w-0 max-w-full p-3 sm:p-4 md:p-6 animate-fade-in">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="space-y-1 w-full min-w-0 flex-1">
              <div className="flex items-center gap-2 sm:gap-3">
                {currentStep > 1 && (
                  <Button
                    onClick={handleBack}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 rounded-lg hover:bg-muted"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Go back</span>
                  </Button>
                )}
                <div className="flex-1">
                  <h1 className="text-base sm:text-lg font-semibold text-foreground tracking-tight">New Booking</h1>
                  <p className="text-muted-foreground text-xs mt-0.5">Create a new travel booking for your clients</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsChatbotOpen(!isChatbotOpen)}
              className={cn(
                "h-9 w-9 sm:h-10 sm:w-10 p-0 rounded-lg shadow-md transition-all duration-300 flex-shrink-0 overflow-visible",
                isChatbotOpen
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
              )}
            >
              <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

      <Card className="p-4 sm:p-5 md:p-6 border border-border/20 w-full min-w-0 max-w-full box-border hover-lift" style={{ overflow: 'visible' }}>
        <div className="space-y-4 sm:space-y-5 w-full min-w-0 max-w-full">
          <div className="space-y-3 sm:space-y-4 w-full max-w-full">
            <div className="w-full max-w-full overflow-x-auto pb-2 -mx-2 sm:mx-0 px-2 sm:px-0 scrollbar-hide">
              <div className="flex items-center gap-2 sm:gap-4 min-w-max py-1">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.number;
                  const isComplete = currentStep > step.number;

                  return (
                    <Fragment key={step.number}>
                      <div className="flex flex-col items-center min-w-[40px] sm:min-w-[48px] flex-shrink-0 animate-fade-in overflow-visible" style={{ animationDelay: `${index * 50}ms` }}>
                        <div
                          className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 text-xs sm:text-sm font-semibold transition-all duration-300 overflow-visible ${
                            isActive
                              ? "border-primary bg-primary text-white shadow-md shadow-primary/30 scale-105"
                              : isComplete
                              ? "border-primary/60 bg-primary/10 text-primary shadow-sm"
                              : "border-border/40 bg-muted/50 text-muted-foreground"
                          }`}
                        >
                          {step.number}
                        </div>
                        <span
                          className={`mt-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wide whitespace-nowrap transition-all duration-300 ${
                            isActive 
                              ? "text-primary font-semibold" 
                              : isComplete
                              ? "text-primary/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`h-0.5 min-w-[12px] sm:min-w-[20px] transition-all duration-300 rounded-full ${
                            currentStep > step.number 
                              ? "bg-primary" 
                              : "bg-border/40"
                          }`}
                          style={{ width: 'clamp(12px, 3vw, 28px)' }}
                        />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
          <div>
            {currentStep === 1 && <SearchExperiences onNext={handleNext} searchData={bookingData} />}
            {currentStep === 2 && <ProductDetail onNext={handleNext} onBack={handleBack} tourData={bookingData} />}
            {currentStep === 3 && <TravelerInfoForm onNext={handleNext} onBack={handleBack} bookingData={bookingData} />}
            {currentStep === 4 && <Payment onNext={handleNext} onBack={handleBack} bookingData={bookingData} />}
            {currentStep === 5 && <VoucherView onNext={handleNext} bookingData={bookingData} />}
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
