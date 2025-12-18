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
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-0 overflow-hidden border border-border/50 bg-white">
        <div className="p-8 space-y-6">
          {/* Header with Logo */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-2xl font-semibold">H</span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground">HAVEN HOTELS</h1>
          </div>

          {/* Greeting */}
          <div>
            <p className="text-sm text-muted-foreground">Hey, {passengerFirstName}</p>
            <h2 className="text-2xl font-semibold text-foreground mt-2">Your reservation is confirmed!</h2>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50"></div>

          {/* Confirmation Number */}
          <div>
            <p className="text-sm text-muted-foreground">Confirmation Number:</p>
            <p className="text-xl font-semibold text-orange-600 mt-1">{bookingRef}</p>
          </div>

          {/* Hotel/Tour Image */}
          <div className="w-full h-64 overflow-hidden rounded-lg">
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

          {/* Reservation Details - Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Check-In */}
            <div>
              <p className="text-2xl font-semibold text-foreground">{checkInDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <p className="text-xl font-semibold text-foreground mt-1">{checkInDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wide">Check-In</p>
            </div>

            {/* Check-Out */}
            <div>
              <p className="text-2xl font-semibold text-foreground">{checkOutDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <p className="text-xl font-semibold text-foreground mt-1">{checkOutDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wide">Check-Out</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50"></div>

          {/* Guest Information - Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Name:</p>
              <p className="text-base font-semibold text-foreground mt-1">
                {leadPassenger.name || (adults.length > 0 && adults[0]?.name) || "Guest"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Experience Type:</p>
              <p className="text-base font-semibold text-foreground mt-1">
                {tour.name || "Tour Experience"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Number of Guests:</p>
            <p className="text-base font-semibold text-foreground mt-1">
              {adultCount} {adultCount === 1 ? 'Adult' : 'Adults'}{childCount > 0 ? `, ${childCount} ${childCount === 1 ? 'Child' : 'Children'}` : ''}
            </p>
            {selectedTimeSlot && (
              <p className="text-sm text-muted-foreground mt-1">
                Time: {selectedTimeSlot.label || selectedTime || ""}
              </p>
            )}
            {!selectedTimeSlot && selectedTime && (
              <p className="text-sm text-muted-foreground mt-1">
                Time: {selectedTime}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-border/50"></div>

          {/* Amount */}
          <div>
            <p className="text-sm text-muted-foreground">Amount:</p>
            <p className="text-2xl font-semibold text-foreground mt-1">₹{totalAmount.toLocaleString('en-IN')}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50"></div>

          {/* Special Requests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Special Requests:</p>
            </div>
            <div>
              <p className="text-sm text-foreground">
                If you have any special requests or need further assistance, please call 887-658-1234.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50"></div>

          {/* Location/Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Location:</p>
            </div>
            <div>
              <p className="text-sm text-foreground">
                {tourLocation || supplier.address || (tour.name ? `${tour.name}, Location TBD` : "Location details will be provided")}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50"></div>

          {/* Footer */}
          <div className="pt-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Logo and Address */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">H</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">HAVEN HOTELS</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  {tourLocation || supplier.address || "Location details available upon confirmation"}
                </p>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                  <span className="text-xs font-semibold">X</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                  <span className="text-xs font-semibold">p</span>
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">© 2024 Haven Hotel</p>
            <p className="text-xs text-muted-foreground text-center">
              If you don't want to hear from us, <a href="#" className="text-primary underline">click here</a>.
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button className="flex items-center gap-2 h-11 px-6" onClick={() => window.print()}>
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline" className="flex items-center gap-2 h-11 px-6">
          <Mail className="h-4 w-4" />
          Send Email
        </Button>
        <Button variant="outline" className="h-11 px-6" onClick={onNext}>
          Create New Booking
        </Button>
      </div>
    </div>
  );
};

export default VoucherView;
