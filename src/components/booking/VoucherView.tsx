import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Mail, RefreshCw, AlertCircle, CheckCircle2, Users, Calendar, Clock, MapPin, Building2, Ticket, CreditCard } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Badge } from "@/components/ui/badge";

interface VoucherViewProps {
  onNext: () => void;
  bookingData: any;
}

const VoucherView = ({ onNext, bookingData }: VoucherViewProps) => {
  const bookingRef = "TRV" + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  // Extract booking data
  const adults = bookingData?.adults || [];
  const children = bookingData?.children || [];
  const tour = bookingData?.tour || {};
  const supplier = bookingData?.supplier || {};
  const selectedDate = bookingData?.selectedDate;
  const selectedTimeSlot = bookingData?.selectedTimeSlot;
  const tickets = bookingData?.tickets || { adult: 0, child: 0 };
  
  // Calculate prices
  const adultCount = tickets.adult || adults.length || 0;
  const childCount = tickets.child || children.length || 0;
  const isPremiumTime = selectedTimeSlot?.type === "premium";
  const adultPrice = isPremiumTime ? (supplier.adultPremiumPrice || supplier.adultPrice || 0) : (supplier.adultPrice || 0);
  const childPrice = isPremiumTime ? (supplier.childPremiumPrice || supplier.childPrice || 0) : (supplier.childPrice || 0);
  const adultTotal = adultPrice * adultCount;
  const childTotal = childPrice * childCount;
  const basePrice = adultTotal + childTotal || 1200;
  const taxes = Math.round(basePrice * 0.15) || 180;
  const serviceFee = Math.round(basePrice * 0.04) || 50;
  const totalAmount = basePrice + taxes + serviceFee;
  
  // Lead passenger (first adult)
  const leadPassenger = adults.length > 0 ? adults[0] : { name: "N/A", email: "", phone: "" };

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Side - Booking Details */}
      <div className="lg:col-span-2 space-y-6">
        {/* Success Header */}
        <Card className="p-6 bg-gradient-to-br from-success/10 via-success/5 to-background border-success/20">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/20 border-2 border-success/40">
              <CheckCircle2 className="h-7 w-7 text-success" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground">Booking Confirmed!</h3>
              <p className="text-sm text-muted-foreground font-medium mt-1">
                Booking Reference: <span className="font-bold text-foreground">{bookingRef}</span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant="secondary" className="bg-success/20 text-success border-success/40 px-3 py-1">
                Confirmed
              </Badge>
            </div>
          </div>
        </Card>

        {/* Ticket Details Card */}
        <Card className="p-0 overflow-hidden border-2 border-primary/10">
          <div className="p-6 bg-gradient-to-r from-primary/5 via-primary/5 to-transparent border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Ticket className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">Ticket Details</h4>
                  <p className="text-xs text-muted-foreground">Your booking confirmation</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ticket Number</p>
                <p className="text-xl font-bold text-primary mt-1">{bookingRef}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Booking Information */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Lead Passenger</h4>
                    <p className="text-base font-bold text-foreground">{leadPassenger.name || "N/A"}</p>
                    {leadPassenger.email && (
                      <p className="text-sm text-muted-foreground mt-1">{leadPassenger.email}</p>
                    )}
                  </div>
                </div>
                
                {selectedDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Travel Date</h4>
                      <p className="text-base font-bold text-foreground">
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedTimeSlot && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Time Slot</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-base font-bold text-foreground">{selectedTimeSlot.label}</p>
                        {isPremiumTime && (
                          <Badge variant="secondary" className="text-xs">Premium</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {supplier?.name && (
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Supplier</h4>
                      <p className="text-base font-bold text-foreground">{supplier.name}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* QR Code */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-5 bg-gradient-to-br from-muted/50 to-background rounded-xl border-2 border-border/50 shadow-lg">
                  <QRCodeSVG
                    value={bookingRef}
                    size={180}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground max-w-[200px]">
                  Present this QR code at the venue for entry
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Passenger Details Card */}
        {(adults.length > 0 || children.length > 0) && (
          <Card className="p-0 overflow-hidden border-2 border-border/50">
            <div className="p-6 bg-gradient-to-r from-accent-blue/5 via-accent-indigo/5 to-transparent border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent-blue/10">
                  <Users className="h-5 w-5 text-accent-blue" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">Passenger Details</h4>
                  <p className="text-xs text-muted-foreground">
                    {adultCount} Adult{adultCount !== 1 ? 's' : ''}
                    {childCount > 0 && `, ${childCount} Child${childCount !== 1 ? 'ren' : ''}`}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Adult Passengers */}
              {adults.length > 0 && (
                <div className="space-y-4">
                  <h5 className="text-sm font-semibold text-foreground uppercase tracking-wide">Adult Passengers</h5>
                  <div className="grid gap-4 md:grid-cols-2">
                    {adults.map((adult: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-bold text-foreground">{adult.name || `Adult ${index + 1}`}</p>
                              {index === 0 && (
                                <Badge variant="secondary" className="text-[10px] mt-1">Lead Passenger</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1.5 mt-3 pl-10">
                          {adult.email && (
                            <p className="text-xs text-muted-foreground">
                              <span className="font-semibold">Email:</span> {adult.email}
                            </p>
                          )}
                          {adult.phone && (
                            <p className="text-xs text-muted-foreground">
                              <span className="font-semibold">Phone:</span> {adult.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Child Passengers */}
              {children.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-border/50">
                  <h5 className="text-sm font-semibold text-foreground uppercase tracking-wide">Child Passengers</h5>
                  <div className="grid gap-4 md:grid-cols-2">
                    {children.map((child: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-accent-emerald/10 to-accent-teal/5 border border-accent-emerald/20">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-accent-emerald/20 flex items-center justify-center">
                              <span className="text-xs font-bold text-accent-emerald">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-bold text-foreground">{child.name || `Child ${index + 1}`}</p>
                              <Badge variant="secondary" className="text-[10px] mt-1 bg-accent-emerald/20 text-accent-emerald">Child</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1.5 mt-3 pl-10">
                          {child.dob && (
                            <p className="text-xs text-muted-foreground">
                              <span className="font-semibold">Date of Birth:</span> {new Date(child.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Financial Summary Card */}
        <Card className="p-0 overflow-hidden border-2 border-border/50">
          <div className="p-6 bg-gradient-to-r from-accent-indigo/5 via-accent-blue/5 to-transparent border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-indigo/10">
                <CreditCard className="h-5 w-5 text-accent-indigo" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground">Financial Summary</h4>
                <p className="text-xs text-muted-foreground">Complete payment breakdown</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {/* Price Breakdown */}
            {adultCount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Adult {adultCount} × ${adultPrice.toFixed(0)}
                  {isPremiumTime && <Badge variant="secondary" className="ml-2 text-[9px] px-1 py-0">Premium</Badge>}
                </span>
                <span className="font-semibold text-foreground">${adultTotal.toFixed(2)}</span>
              </div>
            )}
            {childCount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Child {childCount} × ${childPrice.toFixed(0)}
                  {isPremiumTime && <Badge variant="secondary" className="ml-2 text-[9px] px-1 py-0">Premium</Badge>}
                </span>
                <span className="font-semibold text-foreground">${childTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm pt-2 border-t border-border">
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
            <div className="border-t-2 border-primary/20 pt-4 flex justify-between items-center">
              <div>
                <span className="text-base font-semibold text-foreground block">Total Paid</span>
                <span className="text-xs text-muted-foreground mt-1">Payment method: Agent credit</span>
              </div>
              <span className="text-2xl font-bold text-primary">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-11 text-sm hover:bg-accent-blue/10 hover:border-accent-blue/30">
            <Mail className="h-4 w-4" />
            Send email
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-11 text-sm hover:bg-accent-indigo/10 hover:border-accent-indigo/30">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-11 text-sm text-destructive border-destructive/60 hover:bg-destructive hover:text-destructive-foreground">
            <AlertCircle className="h-4 w-4" />
            Refund
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-11 text-sm hover:bg-accent-emerald/10 hover:border-accent-emerald/30">
            <RefreshCw className="h-4 w-4" />
            Rebook
          </Button>
        </div>

        <div className="flex justify-end pt-3">
          <Button onClick={onNext} className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
            View Confirmation Email
          </Button>
        </div>
      </div>

      {/* Right Side - Destination Image */}
      {bookingData?.tour && (
        <div className="lg:col-span-1">
          <Card className="p-0 overflow-hidden sticky top-8">
            <div className="relative w-full h-96 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
              <img
                src={bookingData.tour.image || bookingData.tour.imageUrl || "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format"}
                alt={bookingData.tour.name || "Park image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // For specific tours, use other tour's image instead of placeholder
                  if (bookingData.tour?.name === "Museum and Art Gallery Tour" || bookingData.tour?.name === "Historic Walking Tour of Old Town") {
                    target.src = getAlternateImage(bookingData.tour.name);
                  } else {
                    target.src = `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent(bookingData.tour?.name || 'Park Image')}`;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-2xl font-bold text-white drop-shadow-lg mb-2">{bookingData.tour.name}</h4>
                {bookingData?.supplier?.name && (
                  <p className="text-sm text-white/90 drop-shadow">{bookingData.supplier.name}</p>
                )}
                {bookingData?.selectedDate && (
                  <p className="text-xs text-white/80 drop-shadow mt-2">
                    {new Date(bookingData.selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
                {bookingData?.selectedTimeSlot && (
                  <p className="text-xs text-white/80 drop-shadow">
                    {bookingData.selectedTimeSlot.label}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VoucherView;
