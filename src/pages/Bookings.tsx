import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import TravelerInfoForm from "@/components/booking/TravelerInfoForm";
import PriceSummary from "@/components/booking/PriceSummary";
import PaymentOptions from "@/components/booking/PaymentOptions";
import VoucherView from "@/components/booking/VoucherView";
import EmailTemplate from "@/components/booking/EmailTemplate";

type BookingStep = 1 | 2 | 3 | 4 | 5;

const Bookings = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [bookingData, setBookingData] = useState<any>({});

  const steps = [
    { number: 1, title: "Traveler Info" },
    { number: 2, title: "Price Summary" },
    { number: 3, title: "Payment" },
    { number: 4, title: "Voucher" },
    { number: 5, title: "Confirmation" },
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-foreground">New Booking</h2>
        <p className="text-muted-foreground mt-1">Create a new travel booking for your clients</p>
      </div>

      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                      currentStep === step.number
                        ? "bg-primary text-primary-foreground"
                        : currentStep > step.number
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-colors ${
                        currentStep > step.number ? "bg-success" : "bg-muted"
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
                  className={`font-medium ${
                    currentStep === step.number ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && <TravelerInfoForm onNext={handleNext} />}
          {currentStep === 2 && <PriceSummary onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && <PaymentOptions onNext={handleNext} onBack={handleBack} />}
          {currentStep === 4 && <VoucherView onNext={handleNext} bookingData={bookingData} />}
          {currentStep === 5 && <EmailTemplate bookingData={bookingData} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
