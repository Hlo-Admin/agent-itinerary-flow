import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EmailTemplateProps {
  bookingData: any;
}

const EmailTemplate = ({ bookingData }: EmailTemplateProps) => {
  const bookingRef = "TRV" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="space-y-7">
      <div>
        <h3 className="text-xl font-bold text-foreground mb-2">Confirmation Email</h3>
        <p className="text-sm text-muted-foreground font-medium">Preview of the confirmation email sent to the traveler</p>
      </div>

      <Card className="p-8 bg-white border-0 shadow-lg">
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Email Header */}
          <div className="text-center pb-5 border-b-2 border-primary/20">
            <h1 className="text-2xl font-bold text-primary mb-1.5">TravelHub Agency</h1>
            <p className="text-xs text-muted-foreground">Your Trusted Travel Partner</p>
          </div>

          {/* Confirmation Message */}
          <div className="bg-success/10 border border-success/20 rounded-2xl p-5 text-center">
            <h2 className="text-xl font-bold text-success mb-1.5">Booking Confirmed! ✓</h2>
            <p className="text-sm text-foreground">Your travel plans are all set</p>
          </div>

          {/* Booking Details */}
          <div>
            <h3 className="text-base font-bold text-foreground mb-3">Booking Details</h3>
            <div className="space-y-2.5 bg-muted/50 p-3.5 rounded-2xl">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Booking Reference</span>
                <span className="font-mono font-semibold text-xs text-foreground">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Passenger Name</span>
                <span className="font-semibold text-xs text-foreground">John Doe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Travel Date</span>
                <span className="font-semibold text-xs text-foreground">June 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Route</span>
                <span className="font-semibold text-xs text-foreground">New York → London</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Total Passengers</span>
                <span className="font-semibold text-xs text-foreground">3 (2 Adults, 1 Child)</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div>
            <h3 className="text-base font-bold text-foreground mb-3">Payment Summary</h3>
            <div className="space-y-2.5 bg-muted/50 p-3.5 rounded-2xl">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Ticket Price</span>
                <span className="text-xs text-foreground">$1,200.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Taxes & Fees</span>
                <span className="text-xs text-foreground">$180.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Service Fee</span>
                <span className="text-xs text-foreground">$50.00</span>
              </div>
              <div className="border-t border-border pt-2.5 flex justify-between">
                <span className="font-semibold text-xs text-foreground">Total Amount Paid</span>
                <span className="text-lg font-bold text-primary">$1,430.00</span>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5">
            <h3 className="text-base font-bold text-foreground mb-2.5">Important Information</h3>
            <ul className="space-y-1.5 text-xs text-foreground">
              <li>• Please arrive at the airport at least 2 hours before departure</li>
              <li>• Carry a valid ID proof and this booking confirmation</li>
              <li>• Check baggage allowance and restrictions</li>
              <li>• Contact us for any changes or cancellations</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="text-center pt-5 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1.5">Need help? Contact us anytime</p>
            <p className="text-xs font-semibold text-foreground">info@travelhub.com | +1 (555) 123-4567</p>
            <p className="text-xs text-muted-foreground mt-3">
              This is an automated confirmation email. Please do not reply.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-center gap-3">
        <Button className="h-11 px-6 flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Send Email to Customer
        </Button>
        <Button variant="outline" className="h-11 px-6">
          Create New Booking
        </Button>
      </div>
    </div>
  );
};

export default EmailTemplate;
