import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, MapPin, Calendar, Clock, Users, DollarSign, CheckCircle2, Building2 } from "lucide-react";

interface TravelerInfoFormProps {
  onNext: (data: any) => void;
  onBack?: () => void;
  bookingData?: any;
}

const TravelerInfoForm = ({ onNext, onBack, bookingData }: TravelerInfoFormProps) => {
  const tickets = bookingData?.tickets || { adult: 0, child: 0 };

  // Helper function to get alternate image for specific tours
  const getAlternateImage = (tourName: string) => {
    // Use images from other tours as alternates
    const alternateImages: Record<string, string> = {
      "Museum and Art Gallery Tour": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format", // Culinary Food Tasting
      "Historic Walking Tour of Old Town": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format", // Mountain Hiking
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
  const [adults, setAdults] = useState<Array<{ name: string; email: string; phone: string }>>(() => {
    if (adultCount > 0) {
      return Array(adultCount).fill(null).map(() => ({ name: "", email: "", phone: "" }));
    }
    return [{ name: "", email: "", phone: "" }];
  });
  
  const [children, setChildren] = useState<Array<{ name: string; dob: string }>>(() => {
    if (childCount > 0) {
      return Array(childCount).fill(null).map(() => ({ name: "", dob: "" }));
    }
    return [];
  });

  // Update when bookingData changes
  useEffect(() => {
    const newAdultCount = tickets.adult || 0;
    const newChildCount = tickets.child || 0;
    
    if (newAdultCount > 0 && adults.length !== newAdultCount) {
      setAdults(Array(newAdultCount).fill(null).map(() => ({ name: "", email: "", phone: "" })));
    }
    if (newChildCount > 0 && children.length !== newChildCount) {
      setChildren(Array(newChildCount).fill(null).map(() => ({ name: "", dob: "" })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets.adult, tickets.child]);

  const addAdult = () => {
    setAdults([...adults, { name: "", email: "", phone: "" }]);
  };

  const removeAdult = (index: number) => {
    if (adults.length > 1) {
      setAdults(adults.filter((_, i) => i !== index));
    }
  };

  const addChild = () => {
    setChildren([...children, { name: "", dob: "" }]);
  };

  const removeChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

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
    return isPremiumTime ? (selectedSupplier.adultPremiumPrice || selectedSupplier.adultPrice || 0) : (selectedSupplier.adultPrice || 0);
  };

  const getChildPrice = () => {
    if (!selectedSupplier) return 0;
    return isPremiumTime ? (selectedSupplier.childPremiumPrice || selectedSupplier.childPrice || 0) : (selectedSupplier.childPrice || 0);
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
    <div className="space-y-8">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-foreground">Lead passenger information</h3>
        <p className="text-sm text-muted-foreground">Enter details for the primary traveler</p>
      </div>

      {/* Main Content Grid - Left: Travelers, Right: Price Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Traveler Information */}
        <div className="lg:col-span-2 space-y-8">

      {/* Adult Passengers */}
      {adultCount > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Adult Passengers ({adultCount})
            </h3>
          </div>
          <div className="space-y-4">
            {adults.map((adult, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Adult {index + 1} {index === 0 && "(Lead Passenger)"}
                    </Label>
                    {adults.length > 1 && index !== 0 && (
                      <Button onClick={() => removeAdult(index)} variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor={`adult-${index}-name`} className="text-xs font-medium text-muted-foreground">
                        Full name *
                      </Label>
                      <Input
                        id={`adult-${index}-name`}
                        placeholder="John Doe"
                        value={adult.name}
                        onChange={(e) => updateAdult(index, "name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`adult-${index}-email`} className="text-xs font-medium text-muted-foreground">
                        Email *
                      </Label>
                      <Input
                        id={`adult-${index}-email`}
                        type="email"
                        placeholder="john@example.com"
                        value={adult.email}
                        onChange={(e) => updateAdult(index, "email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`adult-${index}-phone`} className="text-xs font-medium text-muted-foreground">
                        Phone number *
                      </Label>
                      <Input
                        id={`adult-${index}-phone`}
                        placeholder="+1 (555) 000-0000"
                        value={adult.phone}
                        onChange={(e) => updateAdult(index, "phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {adultCount > adults.length && (
            <Button onClick={addAdult} variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add another adult
            </Button>
          )}
        </div>
      )}

      {/* Child Passengers */}
      {childCount > 0 && (
        <div className="space-y-4 border-t border-border pt-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Child Passengers ({childCount})
            </h3>
          </div>
          <div className="space-y-4">
            {children.map((child, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Child {index + 1}
                    </Label>
                    {children.length > 1 && (
                      <Button onClick={() => removeChild(index)} variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`child-${index}-name`} className="text-xs font-medium text-muted-foreground">
                        Full name *
                      </Label>
                      <Input
                        id={`child-${index}-name`}
                        placeholder="Child name"
                        value={child.name}
                        onChange={(e) => updateChild(index, "name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`child-${index}-dob`} className="text-xs font-medium text-muted-foreground">
                        Date of birth *
                      </Label>
                      <Input
                        id={`child-${index}-dob`}
                        type="date"
                        value={child.dob}
                        onChange={(e) => updateChild(index, "dob", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {childCount > children.length && (
            <Button onClick={addChild} variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add another child
            </Button>
          )}
        </div>
      )}

          <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-between">
            {onBack && (
              <Button onClick={onBack} variant="outline">
                Back
              </Button>
            )}
            <Button onClick={handleSubmit} className={onBack ? "" : "ml-auto"}>
              Continue to payment
            </Button>
          </div>
        </div>

        {/* Right Side - Destination Price Summary */}
        <div className="lg:col-span-1">
          {selectedTour && selectedSupplier && (
            <Card className="sticky top-8 space-y-4 border-2 border-primary/10 bg-gradient-to-br from-background to-muted/20 overflow-hidden">
              {/* Destination Image */}
              {selectedTour && (
                <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <img
                    src={selectedTour.image || selectedTour.imageUrl || "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format"}
                    alt={selectedTour.name || "Destination"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // For specific tours, use other tour's image instead of placeholder
                      if (selectedTour?.name === "Museum and Art Gallery Tour" || selectedTour?.name === "Historic Walking Tour of Old Town") {
                        target.src = getAlternateImage(selectedTour.name);
                      } else {
                        target.src = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(selectedTour?.name || 'Destination')}`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              )}
              
              <div className="p-4 pt-0 space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h4 className="text-lg font-semibold text-foreground">Destination</h4>
                </div>

                <div className="space-y-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-bold text-foreground">{selectedTour.name} (Category Name)</p>
                    </div>
                  {selectedSupplier && (
                    <Badge variant="secondary" className="ml-6">
                      {selectedSupplier.name}
                    </Badge>
                  )}
                  {(selectedDate || selectedTimeSlot) && (
                    <div className="flex items-center gap-4 pl-6">
                      {selectedDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs font-semibold text-foreground">
                            {new Date(selectedDate).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      )}
                      {selectedTimeSlot && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs font-semibold text-foreground">{selectedTimeSlot.label}</p>
                          {isPremiumTime && (
                            <Badge variant="secondary" className="text-[9px] px-1.5 py-0">Premium</Badge>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-border space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Passenger Count</Label>
                  <div className="space-y-1.5 pl-2">
                    {adultCount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Adults</span>
                        <span className="text-base font-bold text-foreground">{adultCount}</span>
                      </div>
                    )}
                    {childCount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Children</span>
                        <span className="text-base font-bold text-foreground">{childCount}</span>
                      </div>
                    )}
                    {(adultCount > 0 || childCount > 0) && (
                      <div className="flex justify-between items-center pt-1.5 border-t border-border/30">
                        <span className="text-sm font-semibold text-foreground">Total Passengers</span>
                        <span className="text-lg font-bold text-primary">{adultCount + childCount}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-border space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Price Summary</Label>
                  <div className="space-y-1.5 pl-2">
                    {adultCount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Adult {adultCount} × ${adultPrice.toFixed(0)}
                          {isPremiumTime && (
                            <Badge variant="secondary" className="ml-2 text-[9px] px-1 py-0">Premium</Badge>
                          )}
                        </span>
                        <span className="font-semibold text-foreground">${adultTotal.toFixed(2)}</span>
                      </div>
                    )}
                    {childCount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Child {childCount} × ${childPrice.toFixed(0)}
                          {isPremiumTime && (
                            <Badge variant="secondary" className="ml-2 text-[9px] px-1 py-0">Premium</Badge>
                          )}
                        </span>
                        <span className="font-semibold text-foreground">${childTotal.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm pt-1.5 border-t border-border">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold text-foreground">${basePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Taxes & fees</span>
                      <span className="font-medium text-foreground">${taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Service fee</span>
                      <span className="font-medium text-foreground">${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="text-sm font-medium text-muted-foreground">Total amount due</span>
                      <span className="text-2xl font-semibold text-primary">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelerInfoForm;
