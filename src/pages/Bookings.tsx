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

type BookingStep = 1 | 2 | 3 | 4 | 5;

const Bookings = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [bookingData, setBookingData] = useState<any>({});

  const handleNext = (data?: any) => {
    if (data) {
      setBookingData({ ...bookingData, ...data });
    }
    
    // If viewing a booking, skip directly to voucher view (step 5)
    if (data?.viewBooking) {
      setCurrentStep(5);
    } else if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as BookingStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BookingStep);
    }
  };

  // Custom Icons
  const HomeIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5" {...props}>
      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
    </svg>
  );

  const SearchIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"></path>
    </svg>
  );

  const breadcrumbSteps = [
    { step: 1, label: "Search", icon: SearchIcon as any },
    { step: 2, label: "Results", icon: Search as any },
    { step: 3, label: "Details", icon: Building2 as any },
    { step: 4, label: "Travelers", icon: Users as any },
    { step: 5, label: "Ticket", icon: Ticket as any },
  ];

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      {
        label: "Home",
        icon: HomeIcon,
        isActive: false,
        isClickable: true,
        onClick: () => {
          // Navigate to home or reset to step 1
          setCurrentStep(1);
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
              setCurrentStep(stepInfo.step as BookingStep);
            }
          },
        });
      }
    });

    return breadcrumbs;
  };

  return (
    <div className="relative flex flex-col h-full w-full min-w-0 max-w-full">
      {/* Fixed Header with Breadcrumb */}
      <div className="sticky top-0 z-40 flex-shrink-0" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="w-full min-w-0 max-w-full pt-2 pl-3 pb-2 sm:pt-2 sm:pl-4 md:pt-2 md:pl-5 lg:pt-2 lg:pl-6">
            {currentStep === 5 ? (
              /* Final step - Show only Home button */
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    setCurrentStep(1);
                  }}
                  variant="outline"
                  className="h-10 sm:h-11 px-5 sm:px-6 gap-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <HomeIcon />
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
                              const Icon = crumb.icon as any;
                              const isLast = index === breadcrumbs.length - 1;
                              
                              return (
                                <Fragment key={index}>
                                  <BreadcrumbItem>
                                    {isLast ? (
                                      <BreadcrumbPage className="flex items-center gap-2">
                                        <Icon />
                                        <span className="text-[15px] font-medium text-[#5c727d]">{crumb.label}</span>
                                      </BreadcrumbPage>
                                    ) : (
                                      <BreadcrumbLink
                                        onClick={(e) => {
                                          e.preventDefault();
                                          crumb.onClick();
                                        }}
                                        className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                                      >
                                        <div className="text-[#3b82f6]">
                                          <Icon />
                                        </div>
                                        <span className="text-[15px] font-medium text-[#3b82f6]">{crumb.label}</span>
                                      </BreadcrumbLink>
                                    )}
                                  </BreadcrumbItem>
                                  {!isLast && <BreadcrumbSeparator className="text-sm text-muted-foreground" />}
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
