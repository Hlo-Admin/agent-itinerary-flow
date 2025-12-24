import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  CheckCircle2,
  Building2,
  CreditCard,
  Wallet,
  AlertCircle,
  FileText,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TravelerInfoFormProps {
  onNext: (data: any) => void;
  onBack?: () => void;
  bookingData?: any;
}

const TravelerInfoForm = ({
  onNext,
  onBack,
  bookingData,
}: TravelerInfoFormProps) => {
  const tickets = bookingData?.tickets || { adult: 0, child: 0 };

  // Helper function to get alternate image for specific tours
  const getAlternateImage = (tourName: string) => {
    // Use images from other tours as alternates
    const alternateImages: Record<string, string> = {
      "Museum and Art Gallery Tour":
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format", // Culinary Food Tasting
      "Historic Walking Tour of Old Town":
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format", // Mountain Hiking
    };

    // Return alternate image if tour name matches
    if (alternateImages[tourName]) {
      return alternateImages[tourName];
    }
    // Fallback to default
    return "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format";
  };
  const adultCount = tickets.adult || 0;
  const childCount = tickets.child || 0;

  // Initialize adults and children based on passenger count
  const [adults, setAdults] = useState<
    Array<{ name: string; email: string; phone: string }>
  >(() => {
    if (adultCount > 0) {
      return Array(adultCount)
        .fill(null)
        .map(() => ({ name: "", email: "", phone: "" }));
    }
    return [{ name: "", email: "", phone: "" }];
  });

  const [children, setChildren] = useState<
    Array<{ name: string; dob: string }>
  >(() => {
    if (childCount > 0) {
      return Array(childCount)
        .fill(null)
        .map(() => ({ name: "", dob: "" }));
    }
    return [];
  });

  // Update when bookingData changes
  useEffect(() => {
    const newAdultCount = tickets.adult || 0;
    const newChildCount = tickets.child || 0;

    if (newAdultCount > 0 && adults.length !== newAdultCount) {
      setAdults(
        Array(newAdultCount)
          .fill(null)
          .map(() => ({ name: "", email: "", phone: "" }))
      );
    }
    if (newChildCount > 0 && children.length !== newChildCount) {
      setChildren(
        Array(newChildCount)
          .fill(null)
          .map(() => ({ name: "", dob: "" }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets.adult, tickets.child]);

  const updateAdult = (index: number, field: string, value: string) => {
    const updated = [...adults];
    updated[index] = { ...updated[index], [field]: value };
    setAdults(updated);
  };

  const updateChild = (index: number, field: string, value: string) => {
    const updated = [...children];
    updated[index] = { ...updated[index], [field]: value };
    setChildren(updated);
  };

  // Terms acceptance state
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);

  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "gateway" | "credit" | null
  >(null);

  // Mock agent credit limit (in real app, this would come from API/context)
  const agentCreditLimit = 5000; // AED 5000 available credit

  const handleSubmit = () => {
    onNext({ adults, children });
  };

  const selectedTour = bookingData?.tour;
  const selectedSupplier = bookingData?.supplier;
  const selectedDate = bookingData?.selectedDate;
  const selectedTimeSlot = bookingData?.selectedTimeSlot;
  const selectedTime = bookingData?.selectedTime || selectedTimeSlot?.label;
  const isPremiumTime = selectedTimeSlot?.type === "premium";

  // Get prices from supplier
  const getAdultPrice = () => {
    if (!selectedSupplier) return 0;
    return isPremiumTime
      ? selectedSupplier.adultPremiumPrice || selectedSupplier.adultPrice || 0
      : selectedSupplier.adultPrice || 0;
  };

  const getChildPrice = () => {
    if (!selectedSupplier) return 0;
    return isPremiumTime
      ? selectedSupplier.childPremiumPrice || selectedSupplier.childPrice || 0
      : selectedSupplier.childPrice || 0;
  };

  const adultPrice = getAdultPrice();
  const childPrice = getChildPrice();
  const adultTotal = adultPrice * adultCount;
  const childTotal = childPrice * childCount;
  const basePrice = adultTotal + childTotal || 0;
  const taxes = Math.round(basePrice * 0.15) || 0;
  const serviceFee = Math.round(basePrice * 0.04) || 0;
  const totalAmount = basePrice + taxes + serviceFee;

  return (
    <div>
      {/* Main Content Grid - Left: Travelers, Right: Price Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Side - Traveler Information */}
        <div className="lg:col-span-2 space-y-3">
      <div className="space-y-1">
            <h3 className="text-2xl font-semibold text-foreground">
              Lead passenger information
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter details for the primary traveler
            </p>
      </div>

          {/* Adult Passengers */}
          {adultCount > 0 && (
            <Card className="p-3">
          <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <h3 className="text-base font-semibold text-foreground">
                      Adult Passengers ({adultCount})
                    </h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {adults.map((adult, index) => {
                    if (index === 0) {
                      // First passenger: name, email, phone (all required)
                      return (
                        <div key={index} className="flex gap-3">
                          {/* Number badge on left */}
                          <div className="flex-shrink-0 pt-7">
                            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-semibold text-primary">{index + 1}</span>
                            </div>
                          </div>
                          
                          {/* Form fields */}
                          <div className="flex-1 space-y-2">
                            <div className="grid gap-2 md:grid-cols-3">
                              <div className="space-y-1">
                                <Label
                                  htmlFor={`adult-${index}-name`}
                                  className="text-xs font-medium text-muted-foreground"
                                >
                                  Full name *
                                </Label>
                                <Input
                                  id={`adult-${index}-name`}
                                  placeholder="John Doe"
                                  value={adult.name}
                                  onChange={(e) =>
                                    updateAdult(index, "name", e.target.value)
                                  }
                                  className="h-9 text-sm"
                                  required
                                />
                              </div>
                              <div className="space-y-1">
                                <Label
                                  htmlFor={`adult-${index}-email`}
                                  className="text-xs font-medium text-muted-foreground"
                                >
                                  Email *
                                </Label>
                                <Input
                                  id={`adult-${index}-email`}
                                  type="email"
                                  placeholder="john@example.com"
                                  value={adult.email}
                                  onChange={(e) =>
                                    updateAdult(index, "email", e.target.value)
                                  }
                                  className="h-9 text-sm"
                                  required
                                />
                              </div>
                              <div className="space-y-1">
                                <Label
                                  htmlFor={`adult-${index}-phone`}
                                  className="text-xs font-medium text-muted-foreground"
                                >
                                  Phone number *
                                </Label>
                                <Input
                                  id={`adult-${index}-phone`}
                                  placeholder="+1 (555) 000-0000"
                                  value={adult.phone}
                                  onChange={(e) =>
                                    updateAdult(index, "phone", e.target.value)
                                  }
                                  className="h-9 text-sm"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      // Group remaining adults in pairs (2 per row)
                      const isFirstInPair = (index - 1) % 2 === 0;
                      const isSecondInPair = (index - 1) % 2 === 1;
                      const isLastInPair = index === adults.length - 1 && isSecondInPair;
                      
                      if (isFirstInPair) {
                        // Start a new row with border-top
                        return (
                          <div key={index} className={cn("flex gap-3 pt-2 border-t border-border/20")}>
                            {/* First adult in pair */}
                            <div className="flex gap-3 flex-1">
                              <div className="flex-shrink-0 pt-7">
                                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-xs font-semibold text-primary">{index + 1}</span>
                                </div>
                              </div>
                              <div className="space-y-1 flex-1 max-w-xs">
                                <Label
                                  htmlFor={`adult-${index}-name`}
                                  className="text-xs font-medium text-muted-foreground"
                                >
                                  Full name *
                                </Label>
                                <Input
                                  id={`adult-${index}-name`}
                                  placeholder="Passenger name"
                                  value={adult.name}
                                  onChange={(e) =>
                                    updateAdult(index, "name", e.target.value)
                                  }
                                  className="h-9 text-sm"
                                  required
                                />
                              </div>
                            </div>
                            
                            {/* Second adult in pair (if exists) */}
                            {index + 1 < adults.length && (
                              <div className="flex gap-3 flex-1">
                                <div className="flex-shrink-0 pt-7">
                                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-xs font-semibold text-primary">{index + 2}</span>
                                  </div>
                                </div>
                                <div className="space-y-1 flex-1 max-w-xs">
                                  <Label
                                    htmlFor={`adult-${index + 1}-name`}
                                    className="text-xs font-medium text-muted-foreground"
                                  >
                                    Full name *
                                  </Label>
                                  <Input
                                    id={`adult-${index + 1}-name`}
                                    placeholder="Passenger name"
                                    value={adults[index + 1].name}
                                    onChange={(e) =>
                                      updateAdult(index + 1, "name", e.target.value)
                                    }
                                    className="h-9 text-sm"
                                    required
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      } else {
                        // This is the second in a pair, already rendered above
                        return null;
                      }
                    }
                  }).filter(Boolean)}
        </div>
      </div>
            </Card>
          )}

          {/* Child Passengers */}
          {childCount > 0 && (
            <Card className="p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <h3 className="text-base font-semibold text-foreground">
                      Child Passengers ({childCount})
                    </h3>
                  </div>
          </div>
                <div className="space-y-3">
                  {children.map((child, index) => (
                    <div key={index} className={cn("flex gap-3", index > 0 && "pt-2 border-t border-border/20")}>
                      {/* Number badge on left */}
                      <div className="flex-shrink-0 pt-7">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">{adultCount + index + 1}</span>
                        </div>
                      </div>
                      
                      {/* Form fields */}
                      <div className="flex-1 space-y-2">
                        <div className="grid gap-2 md:grid-cols-2">
                        <div className="space-y-1">
                          <Label
                            htmlFor={`child-${index}-name`}
                            className="text-xs font-medium text-muted-foreground"
                          >
                            Full name *
                          </Label>
                          <Input
                            id={`child-${index}-name`}
                            placeholder="Child name"
                            value={child.name}
                            onChange={(e) =>
                              updateChild(index, "name", e.target.value)
                            }
                            className="h-9 text-sm"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <Label
                            htmlFor={`child-${index}-dob`}
                            className="text-xs font-medium text-muted-foreground"
                          >
                            Date of birth *
                          </Label>
                          <Input
                            id={`child-${index}-dob`}
                            type="date"
                            value={child.dob}
                            onChange={(e) =>
                              updateChild(index, "dob", e.target.value)
                            }
                            className="h-9 text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
        </div>
              </div>
            </Card>
          )}

          {/* Terms and Conditions Checkbox */}
          <Card className="p-4 border border-border/50">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) =>
                  setTermsAccepted(checked === true)
                }
              />
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium text-foreground cursor-pointer"
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTermsDialog(true);
                    }}
                    className="text-primary hover:underline font-semibold cursor-pointer"
                  >
                    Terms & Conditions
                  </button>
                </Label>
                <p className="text-xs text-muted-foreground">
                  By proceeding, you acknowledge that you have read and agree to
                  the supplier's terms and conditions.
                </p>
              </div>
            </div>
          </Card>

          {/* Terms and Conditions Dialog */}
          <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                  <FileText className="h-5 w-5 text-primary" />
                  Terms & Conditions
                </DialogTitle>
                <DialogDescription>
                  Please read and understand the following terms before
                  proceeding with your booking.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    1. Booking Confirmation
                  </h4>
                  <p>
                    Your booking is confirmed only after receiving payment
                    confirmation and a booking reference number via email.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    2. Cancellation Policy
                  </h4>
                  <p>
                    Cancellations made 48 hours before the scheduled date are
                    eligible for a full refund. Cancellations within 24-48 hours
                    will incur a 50% cancellation fee. No refunds for
                    cancellations within 24 hours of the scheduled date.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    3. Modification Policy
                  </h4>
                  <p>
                    Booking modifications are subject to availability and may
                    incur additional charges. Please contact our support team at
                    least 24 hours before your scheduled date.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    4. Liability
                  </h4>
                  <p>
                    The service provider is not liable for any injuries,
                    accidents, or losses incurred during the experience.
                    Participants are advised to follow all safety guidelines
                    provided.
                  </p>
      </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    5. Age Requirements
                  </h4>
                  <p>
                    Some experiences may have age restrictions. Please ensure
                    all participants meet the minimum age requirements specified
                    for the selected experience.
                  </p>
          </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    6. Health & Safety
                  </h4>
                  <p>
                    Participants must be in good health condition suitable for
                    the selected activity. Please inform us of any medical
                    conditions or special requirements.
                  </p>
        </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    7. Weather Conditions
                  </h4>
                  <p>
                    Outdoor experiences may be subject to weather conditions. In
                    case of adverse weather, alternative dates or refunds will
                    be offered at our discretion.
                  </p>
                </div>
                </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowTermsDialog(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setTermsAccepted(true);
                    setShowTermsDialog(false);
                  }}
                >
                  I Accept
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-between">
            {onBack && (
              <Button onClick={onBack} variant="outline">
                Back
              </Button>
            )}
        </div>
      </div>

        {/* Right Side - Destination Price Summary */}
        <div className="lg:col-span-1 space-y-2">
          {selectedTour && selectedSupplier && (
            <Card className="space-y-2 border-2 border-primary/10 bg-gradient-to-br from-background to-muted/20 overflow-hidden">
              {/* Destination Image */}
              {selectedTour && (
                <div className="relative w-full h-36 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <img
                    src={
                      selectedTour.image ||
                      selectedTour.imageUrl ||
                      "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format"
                    }
                    alt={selectedTour.name || "Destination"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // For specific tours, use other tour's image instead of placeholder
                      if (
                        selectedTour?.name === "Museum and Art Gallery Tour" ||
                        selectedTour?.name ===
                          "Historic Walking Tour of Old Town"
                      ) {
                        target.src = getAlternateImage(selectedTour.name);
                      } else {
                        target.src = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(
                          selectedTour?.name || "Destination"
                        )}`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              )}

              <div className="p-3 pt-0 space-y-1.5">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="space-y-1.5">
                      <p className="text-sm font-bold text-foreground">
                        {selectedTour.name} (Category Name)
                      </p>
                      {selectedSupplier && (
                        <Badge variant="secondary">
                          {selectedSupplier.name}
                        </Badge>
                      )}
                      {(selectedDate || selectedTimeSlot) && (
                        <div className="flex items-center gap-4">
                          {selectedDate && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <p className="text-xs font-semibold text-foreground">
                                {new Date(selectedDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
          </p>
        </div>
                          )}
                          {selectedTimeSlot && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <p className="text-xs font-semibold text-foreground">
                                {selectedTimeSlot.label}
                              </p>
                              {isPremiumTime && (
                                <Badge
                                  variant="secondary"
                                  className="text-[9px] px-1.5 py-0"
                                >
                                  Premium
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Passenger Count
                    </Label>
                    <div className="space-y-1 pl-2">
                      {adultCount > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Adults
                          </span>
                          <span className="text-base font-bold text-foreground">
                            {adultCount}
                          </span>
                        </div>
                      )}
                      {childCount > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Children
                          </span>
                          <span className="text-base font-bold text-foreground">
                            {childCount}
                          </span>
                        </div>
                      )}
                      {(adultCount > 0 || childCount > 0) && (
                        <div className="flex justify-between items-center pt-1.5 border-t border-border/30">
                          <span className="text-sm font-semibold text-foreground">
                            Total Passengers
                          </span>
                          <span className="text-lg font-bold text-primary">
                            {adultCount + childCount}
                          </span>
                        </div>
                      )}
        </div>
      </div>

                  <div className="pt-2 border-t border-border space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Price Summary
                    </Label>
                    <div className="space-y-1 pl-2">
                      {adultCount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Adult {adultCount} × AED {adultPrice.toFixed(0)}
                            {isPremiumTime && (
                              <Badge
                                variant="secondary"
                                className="ml-2 text-[9px] px-1 py-0"
                              >
                                Premium
                              </Badge>
                            )}
                          </span>
                          <span className="font-semibold text-foreground">
                            AED {adultTotal.toFixed(2)}
                          </span>
                        </div>
                      )}
                      {childCount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Child {childCount} × AED {childPrice.toFixed(0)}
                            {isPremiumTime && (
                              <Badge
                                variant="secondary"
                                className="ml-2 text-[9px] px-1 py-0"
                              >
                                Premium
                              </Badge>
                            )}
                          </span>
                          <span className="font-semibold text-foreground">
                            AED {childTotal.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm pt-1.5 border-t border-border">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold text-foreground">
                          AED {basePrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Taxes & fees</span>
                        <span className="font-medium text-foreground">
                          AED {taxes.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Service fee</span>
                        <span className="font-medium text-foreground">
                          AED {serviceFee.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Total amount due
                        </span>
                        <span className="text-xl font-semibold text-primary">
                          AED {totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Company Credit & Payment Method */}
          <div className="space-y-2">
            {/* Company Credit Header */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                Company Credit
              </span>
              <span className="text-sm font-semibold text-destructive">
                - AED {agentCreditLimit.toLocaleString()}
              </span>
            </div>

            {/* Payment Card */}
            <Card className="p-4 flex items-center justify-between">
              {/* Total Amount */}
              <div>
                <span className="text-2xl font-bold text-foreground">
                  AED {totalAmount.toFixed(2)}
                </span>
              </div>

              {/* Payment Method Icons */}
              <div className="flex items-center gap-2">
                {/* Credit Card Icon */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => {
                          if (termsAccepted) {
                            setSelectedPaymentMethod("gateway");
                            handleSubmit();
                          }
                        }}
                        disabled={!termsAccepted}
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                          !termsAccepted && "opacity-50 cursor-not-allowed",
                          selectedPaymentMethod === "gateway"
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        <CreditCard className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="end"
                      sideOffset={5}
                      className="bg-foreground text-background z-50"
                    >
                      <p className="text-xs whitespace-nowrap">
                        Pay securely via payment gateway
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Lightning/Quick Pay Icon */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => {
                          if (termsAccepted && agentCreditLimit >= totalAmount) {
                            setSelectedPaymentMethod("credit");
                            handleSubmit();
                          }
                        }}
                        disabled={
                          !termsAccepted || agentCreditLimit < totalAmount
                        }
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                          (!termsAccepted || agentCreditLimit < totalAmount) &&
                            "opacity-50 cursor-not-allowed",
                          selectedPaymentMethod === "credit"
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        <Zap className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="end"
                      sideOffset={5}
                      className="bg-foreground text-background z-50"
                    >
                      <p className="text-xs whitespace-nowrap">
                        Use your available credit balance
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerInfoForm;
