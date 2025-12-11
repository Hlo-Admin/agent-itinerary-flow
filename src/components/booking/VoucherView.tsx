import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Mail, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface VoucherViewProps {
  onNext: () => void;
  bookingData: any;
}

const VoucherView = ({ onNext, bookingData }: VoucherViewProps) => {
  const bookingRef = "TRV" + Math.random().toString(36).substr(2, 9).toUpperCase();

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
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-success/30 bg-success/5 text-success">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">Booking confirmed</h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">Reference: {bookingRef}</p>
          </div>
        </div>

        <Card className="p-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3.5">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-1">Passenger Name</h4>
                <p className="text-base font-bold text-foreground">John Doe</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-1">Travel Date</h4>
                <p className="text-base font-bold text-foreground">June 15, 2024</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-1">Route</h4>
                <p className="text-base font-bold text-foreground">New York → London</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-1">Passengers</h4>
                <p className="text-base font-bold text-foreground">2 Adults, 1 Child</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="text-center">
                <h4 className="text-xs font-semibold text-muted-foreground mb-2">Ticket Number</h4>
                <p className="text-lg font-bold text-foreground mb-3">{bookingRef}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-border/50">
                <QRCodeSVG
                  value={bookingRef}
                  size={160}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-7 border border-border/50">
          <h4 className="font-semibold text-lg text-foreground mb-5">Financial summary</h4>
          <div className="space-y-2.5">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Ticket price</span>
              <span className="font-semibold text-sm text-foreground">$1,200.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Taxes & fees</span>
              <span className="font-semibold text-sm text-foreground">$180.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Service fee</span>
              <span className="font-semibold text-sm text-foreground">$50.00</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-semibold text-foreground">Total paid</span>
              <span className="text-lg font-semibold text-primary">$1,430.00</span>
            </div>
            <div className="flex justify-between items-center pt-1.5">
              <span className="text-xs text-muted-foreground">Payment method</span>
              <span className="text-xs font-semibold text-success">Agent credit</span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-10 text-sm">
            <Mail className="h-4 w-4" />
            Send email
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-10 text-sm">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-10 text-sm text-destructive border-destructive/60 hover:bg-destructive hover:text-destructive-foreground">
            <AlertCircle className="h-4 w-4" />
            Refund
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-10 text-sm">
            <RefreshCw className="h-4 w-4" />
            Rebook
          </Button>
        </div>

        <div className="flex justify-end pt-3">
          <Button onClick={onNext} className="h-11 px-6">
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
