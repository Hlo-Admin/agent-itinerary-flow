import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Mail, Facebook } from "lucide-react";

interface VoucherViewProps {
  onNext: () => void;
  bookingData: any;
}

const VoucherView = ({ onNext, bookingData }: VoucherViewProps) => {
  // Use a consistent booking reference (or generate one and store it)
  const bookingRef = bookingData?.bookingReference || "VJ" + Math.random().toString(36).substr(2, 6).toUpperCase().slice(0, 6);
  
  // Extract booking data from all previous steps
  const adults = bookingData?.adults || [];
  const children = bookingData?.children || [];
  const tour = bookingData?.tour || {};
  const supplier = bookingData?.supplier || {};
  const selectedDate = bookingData?.selectedDate;
  const selectedTimeSlot = bookingData?.selectedTimeSlot;
  const selectedTime = bookingData?.selectedTime;
  const tickets = bookingData?.tickets || { adult: 0, child: 0 };
  
  // Get actual ticket counts
  const adultCount = tickets.adult || adults.length || 0;
  const childCount = tickets.child || children.length || 0;
  
  // Calculate prices from supplier data
  const isPremiumTime = selectedTimeSlot?.type === "premium";
  const adultPrice = isPremiumTime 
    ? (supplier.adultPremiumPrice || supplier.adultPrice || 0) 
    : (supplier.adultPrice || 0);
  const childPrice = isPremiumTime 
    ? (supplier.childPremiumPrice || supplier.childPrice || 0) 
    : (supplier.childPrice || 0);
  const adultTotal = adultPrice * adultCount;
  const childTotal = childPrice * childCount;
  const basePrice = adultTotal + childTotal;
  
  // Use payment totals if available, otherwise calculate
  const paymentTotal = bookingData?.totalAmount || bookingData?.finalTotal;
  const paymentTaxes = bookingData?.taxes;
  const paymentServiceFee = bookingData?.serviceFee;
  const paymentDiscount = bookingData?.discount || 0;
  
  const taxes = paymentTaxes !== undefined ? paymentTaxes : Math.round(basePrice * 0.15);
  const serviceFee = paymentServiceFee !== undefined ? paymentServiceFee : Math.round(basePrice * 0.04);
  const totalAmount = paymentTotal !== undefined 
    ? paymentTotal 
    : (basePrice + taxes + serviceFee - paymentDiscount);
  
  // Lead passenger (first adult)
  const leadPassenger = adults.length > 0 ? adults[0] : { name: "", email: "", phone: "" };
  const passengerFirstName = leadPassenger.name?.split(' ')[0] || "Guest";

  // Format tour date (this is a tour booking, not hotel, so we show tour date)
  const tourDate = selectedDate ? new Date(selectedDate) : new Date();
  
  // For hotel-style display, we can show the tour date as "check-in" and calculate end date from duration
  // Tour duration is typically in hours, but for display purposes we'll use the same date
  const checkInDate = tourDate;
  const checkOutDate = new Date(tourDate); // Same day for tours, or can be calculated from tour.duration if available

  // Get tour image - prioritize actual tour data
  const tourImage = tour.image || tour.imageUrl || bookingData?.tour?.image || bookingData?.tour?.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&auto=format";
  
  // Get tour location/address
  const tourLocation = tour.location || tour.address || supplier.address || "";

  return (
    <div className="max-w-lg mx-auto space-y-3">
      <Card className="p-0 overflow-visible border border-border/50 bg-white">
        <div className="p-4 space-y-3">
          {/* Header with Logo and QR Code */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">H</span>
              </div>
              <h1 className="text-lg font-semibold text-foreground">HAVEN HOTELS</h1>
            </div>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(bookingRef)}`}
              alt="QR Code"
              className="w-14 h-14"
            />
          </div>

          {/* Greeting and Confirmation */}
          <div className="flex items-center justify-between border-t border-border/50 pt-2">
            <div>
              <p className="text-xs text-muted-foreground">Hey, {passengerFirstName}</p>
              <h2 className="text-base font-semibold text-foreground">Your reservation is confirmed!</h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase">Confirmation</p>
              <p className="text-sm font-bold text-orange-600">{bookingRef}</p>
            </div>
          </div>

          {/* Image and Details Row */}
          <div className="flex gap-3 border-t border-border/50 pt-2">
            {/* Tour Image - Compact */}
            <div className="w-28 h-20 flex-shrink-0 overflow-hidden rounded-md">
              <img
                src={tourImage}
                alt={tour.name || "Reservation image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&auto=format";
                }}
              />
            </div>
            
            {/* Details Grid */}
            <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Check-In</p>
                <p className="font-semibold text-foreground">{checkInDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Check-Out</p>
                <p className="font-semibold text-foreground">{checkOutDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Guest</p>
                <p className="font-semibold text-foreground truncate">{leadPassenger.name || "Guest"}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Guests</p>
                <p className="font-semibold text-foreground">
                  {adultCount}A{childCount > 0 ? `, ${childCount}C` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Experience and Amount Row */}
          <div className="flex items-center justify-between border-t border-border/50 pt-2">
            <div className="flex-1">
              <p className="text-[10px] text-muted-foreground uppercase">Experience</p>
              <p className="text-sm font-semibold text-foreground truncate">{tour.name || "Tour Experience"}</p>
              {(selectedTimeSlot || selectedTime) && (
                <p className="text-[10px] text-muted-foreground">
                  Time: {selectedTimeSlot?.label || selectedTime}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase">Amount</p>
              <p className="text-lg font-bold text-foreground">₹{totalAmount.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Location */}
          <div className="border-t border-border/50 pt-2">
            <p className="text-[10px] text-muted-foreground uppercase">Location</p>
            <p className="text-xs text-foreground">
              {tourLocation || supplier.address || "Location details will be provided"}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border/50 pt-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">H</span>
              </div>
              <span className="text-xs text-muted-foreground">© 2024 Haven Hotel</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-muted">
                <Facebook className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-muted">
                <span className="text-[10px] font-semibold">X</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons - Compact */}
      <div className="flex gap-2 justify-center">
        <Button size="sm" className="flex items-center gap-1.5 h-8 px-4 text-xs" onClick={() => window.print()}>
          <Download className="h-3 w-3" />
          Download
        </Button>
        <Button size="sm" variant="outline" className="flex items-center gap-1.5 h-8 px-4 text-xs">
          <Mail className="h-3 w-3" />
          Email
        </Button>
        <Button size="sm" variant="outline" className="h-8 px-4 text-xs" onClick={onNext}>
          New Booking
        </Button>
      </div>
    </div>
  );
};

export default VoucherView;
