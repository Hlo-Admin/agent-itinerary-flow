import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-5xl font-bold text-foreground tracking-tight">New Booking</h1>
        <p className="text-muted-foreground text-lg font-medium">Create a new travel booking for your clients</p>
      </div>

      <Card className="p-12 border-0">
        <div className="space-y-12">
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-2xl font-bold text-xl transition-all duration-300 ${
                      currentStep === step.number
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl scale-125"
                        : currentStep > step.number
                        ? "bg-gradient-to-br from-success to-success/80 text-success-foreground shadow-lg"
                        : "bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-2.5 mx-3 rounded-full transition-all duration-300 ${
                        currentStep > step.number ? "bg-gradient-to-r from-success to-success/80 shadow-md" : "bg-muted/40"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`font-bold transition-colors duration-300 ${
                    currentStep === step.number ? "text-primary text-base" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-4 rounded-full shadow-sm" />
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
