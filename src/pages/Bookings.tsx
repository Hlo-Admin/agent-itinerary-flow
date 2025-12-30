import { useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Home, BarChart3, Search, Building2, Users, Ticket } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SearchExperiences from "@/components/booking/SearchExperiences";
import SearchResults from "@/components/booking/SearchResults";
import ProductDetail from "@/components/booking/ProductDetail";
import TravelerInfoForm from "@/components/booking/TravelerInfoForm";
import VoucherView from "@/components/booking/VoucherView";
import Loader from "@/components/Loader";

type BookingStep = 1 | 2 | 3 | 4 | 5;

const Bookings = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [bookingData, setBookingData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  // Test function to show loader
  const testLoader = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loader for 3 seconds
  };

  const handleNext = (data?: any) => {
    setIsLoading(true);
    if (data) {
      setBookingData({ ...bookingData, ...data });
    }
    
    setTimeout(() => {
      // If viewing a booking, skip directly to voucher view (step 5)
      if (data?.viewBooking) {
        setCurrentStep(5);
      } else if (currentStep < 5) {
        setCurrentStep((prev) => (prev + 1) as BookingStep);
      }
      setIsLoading(false);
    }, 500); // Show loader for 500ms during transition
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev - 1) as BookingStep);
        setIsLoading(false);
      }, 500); // Show loader for 500ms during transition
    }
  };

  const breadcrumbSteps = [
    { step: 1, label: "Search", icon: BarChart3 },
    { step: 2, label: "Results", icon: Search },
    { step: 3, label: "Details", icon: Building2 },
    { step: 4, label: "Travelers", icon: Users },
    { step: 5, label: "Ticket", icon: Ticket },
  ];

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      {
        label: "Home",
        icon: Home,
        isActive: false,
        isClickable: true,
        onClick: () => {
          // Navigate to home or reset to step 1
          setIsLoading(true);
          setTimeout(() => {
            setCurrentStep(1);
            setIsLoading(false);
          }, 500);
        },
      },
    ];

    // Add steps up to and including current step
    breadcrumbSteps.forEach((stepInfo) => {
      if (stepInfo.step <= currentStep) {
        const isCurrentStep = stepInfo.step === currentStep;
        breadcrumbs.push({
          label: stepInfo.label,
          icon: stepInfo.icon,
          isActive: isCurrentStep,
          isClickable: !isCurrentStep,
          onClick: () => {
            if (!isCurrentStep) {
              setIsLoading(true);
              setTimeout(() => {
                setCurrentStep(stepInfo.step as BookingStep);
                setIsLoading(false);
              }, 500);
            }
          },
        });
      }
    });

    return breadcrumbs;
  };

  return (
    <div className="relative flex flex-col h-full w-full min-w-0 max-w-full">
      {/* Loader Component */}
      <Loader isLoading={isLoading} />

      {/* Test Button - Remove this after testing */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={testLoader} variant="outline" size="sm">
          Test Loader
        </Button>
      </div>

      {/* Fixed Header with Breadcrumb */}
      <div className="sticky top-0 z-40 flex-shrink-0" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="w-full min-w-0 max-w-full pt-2 pl-3 pb-2 sm:pt-2 sm:pl-4 md:pt-2 md:pl-5 lg:pt-2 lg:pl-6">
            {currentStep === 5 ? (
              /* Final step - Show only Home button */
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setCurrentStep(1);
                      setIsLoading(false);
                    }, 500);
                  }}
                  variant="outline"
                  className="h-10 sm:h-11 px-5 sm:px-6 gap-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Home className="h-7 w-7" />
                  <span className="text-base sm:text-lg font-medium">Home</span>
                </Button>
              </div>
            ) : (
              /* Other steps - Show breadcrumbs */
              <div className="flex items-center justify-between gap-3">
                <div className="w-full min-w-0 flex-1">
                  <Breadcrumb>
                        <BreadcrumbList className="gap-1 sm:gap-2">
                          {(() => {
                            const breadcrumbs = getBreadcrumbs();
                            return breadcrumbs.map((crumb, index) => {
                              const Icon = crumb.icon;
                              const isLast = index === breadcrumbs.length - 1;
                              
                              return (
                                <Fragment key={index}>
                                  <BreadcrumbItem>
                                    {isLast ? (
                                      <BreadcrumbPage className="flex items-center gap-2">
                                        <Icon className="!h-6 !w-6 text-muted-foreground" />
                                        <span className="text-base sm:text-lg font-medium text-muted-foreground">{crumb.label}</span>
                                      </BreadcrumbPage>
                                    ) : (
                                      <BreadcrumbLink
                                        onClick={(e) => {
                                          e.preventDefault();
                                          crumb.onClick();
                                        }}
                                        className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                                      >
                                        <Icon className="!h-6 !w-6 text-primary" />
                                        <span className="text-base sm:text-lg font-medium text-primary">{crumb.label}</span>
                                      </BreadcrumbLink>
                                    )}
                                  </BreadcrumbItem>
                                  {!isLast && <BreadcrumbSeparator className="text-lg" />}
                                </Fragment>
                              );
                            });
                          })()}
                        </BreadcrumbList>
                      </Breadcrumb>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto w-full min-w-0 max-w-full min-h-0" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="w-full min-w-0 max-w-full p-2 sm:p-3 md:p-3 pt-2">
          <div className="space-y-3 sm:space-y-4 w-full min-w-0 max-w-full">
            <div>
              {currentStep === 1 && <SearchExperiences onNext={handleNext} searchData={bookingData} />}
              {currentStep === 2 && <SearchResults onNext={handleNext} onBack={handleBack} searchData={bookingData} />}
              {currentStep === 3 && <ProductDetail onNext={handleNext} onBack={handleBack} tourData={bookingData} />}
              {currentStep === 4 && <TravelerInfoForm onNext={handleNext} onBack={handleBack} bookingData={bookingData} />}
              {currentStep === 5 && (
                <div className="flex justify-center px-4 sm:px-6 py-6">
                  <div className="w-full max-w-[800px]">
                    <VoucherView onNext={handleNext} bookingData={bookingData} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
