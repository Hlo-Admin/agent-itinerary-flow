import { Fragment, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import SearchExperiences from "@/components/booking/SearchExperiences";
import SearchResults from "@/components/booking/SearchResults";
import ProductDetail from "@/components/booking/ProductDetail";
import SupplierComparison from "@/components/booking/SupplierComparison";
import TravelerInfoForm from "@/components/booking/TravelerInfoForm";
import PriceSummary from "@/components/booking/PriceSummary";
import PaymentOptions from "@/components/booking/PaymentOptions";
import VoucherView from "@/components/booking/VoucherView";
import EmailTemplate from "@/components/booking/EmailTemplate";

type BookingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const Bookings = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [bookingData, setBookingData] = useState<any>({});

  const steps = [
    { number: 1, title: "Search" },
    { number: 2, title: "Results" },
    { number: 3, title: "Details" },
    { number: 4, title: "Compare" },
    { number: 5, title: "Travelers" },
    { number: 6, title: "Payment" },
    { number: 7, title: "Confirm" },
    { number: 8, title: "Voucher" },
    { number: 9, title: "Email" },
  ];

  const progress = (currentStep / 9) * 100;

  const handleNext = (data?: any) => {
    if (data) {
      setBookingData({ ...bookingData, ...data });
    }
    if (currentStep < 9) {
      setCurrentStep((prev) => (prev + 1) as BookingStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BookingStep);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-12 w-full min-w-0 max-w-full overflow-hidden">
      <div className="space-y-1 sm:space-y-2 w-full min-w-0">
        <h1 className="text-xl sm:text-4xl font-semibold text-foreground tracking-tight">New Booking</h1>
        <p className="text-muted-foreground text-xs sm:text-base">Create a new travel booking for your clients</p>
      </div>

      <Card className="p-1.5 sm:p-8 border border-border/50 w-full min-w-0 max-w-full box-border overflow-hidden">
        <div className="space-y-3 sm:space-y-10 w-full min-w-0 max-w-full overflow-hidden">
          <div className="space-y-3 sm:space-y-8 w-full max-w-full">
            <div className="w-full max-w-full overflow-x-auto pb-2 -mx-1.5 sm:mx-0 px-1.5 sm:px-0 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <div className="flex items-center gap-1 sm:gap-3 min-w-max">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.number;
                  const isComplete = currentStep > step.number;

                  return (
                    <Fragment key={step.number}>
                      <div className="flex flex-col items-center min-w-[32px] sm:min-w-[52px] flex-shrink-0">
                        <div
                          className={`flex h-6 w-6 sm:h-9 sm:w-9 items-center justify-center rounded-full border text-[9px] sm:text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : isComplete
                              ? "border-primary/60 bg-primary/10 text-primary"
                              : "border-border bg-card text-muted-foreground"
                          }`}
                        >
                          {step.number}
                        </div>
                        <span
                          className={`mt-1 sm:mt-2 text-[8px] sm:text-xs font-medium uppercase tracking-wide whitespace-nowrap ${
                            isActive ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`h-px min-w-[6px] sm:min-w-[12px] transition-colors duration-300 ${
                            currentStep > step.number ? "bg-primary/60" : "bg-border"
                          }`}
                          style={{ width: 'clamp(6px, 2vw, 20px)' }}
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
            {currentStep === 4 && <SupplierComparison onNext={handleNext} onBack={handleBack} bookingData={bookingData} />}
            {currentStep === 5 && <TravelerInfoForm onNext={handleNext} />}
            {currentStep === 6 && <PriceSummary onNext={handleNext} onBack={handleBack} />}
            {currentStep === 7 && <PaymentOptions onNext={handleNext} onBack={handleBack} />}
            {currentStep === 8 && <VoucherView onNext={handleNext} bookingData={bookingData} />}
            {currentStep === 9 && <EmailTemplate bookingData={bookingData} />}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Bookings;
