import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EmailTemplateProps {
  bookingData: any;
}

const EmailTemplate = ({ bookingData }: EmailTemplateProps) => {
  const bookingRef = "TRV" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Confirmation Email</h3>
        <p className="text-base text-muted-foreground font-medium">Preview of the confirmation email sent to the traveler</p>
      </div>

      <Card className="p-10 bg-white border-0 shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Email Header */}
          <div className="text-center pb-6 border-b-2 border-primary/20">
            <h1 className="text-3xl font-bold text-primary mb-2">TravelHub Agency</h1>
            <p className="text-sm text-muted-foreground">Your Trusted Travel Partner</p>
          </div>

          {/* Confirmation Message */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-success mb-2">Booking Confirmed! ✓</h2>
            <p className="text-foreground">Your travel plans are all set</p>
          </div>

          {/* Booking Details */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Booking Details</h3>
            <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booking Reference</span>
                <span className="font-mono font-semibold text-foreground">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Passenger Name</span>
                <span className="font-semibold text-foreground">John Doe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Travel Date</span>
                <span className="font-semibold text-foreground">June 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Route</span>
                <span className="font-semibold text-foreground">New York → London</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Passengers</span>
                <span className="font-semibold text-foreground">3 (2 Adults, 1 Child)</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Payment Summary</h3>
            <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ticket Price</span>
                <span className="text-foreground">$1,200.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes & Fees</span>
                <span className="text-foreground">$180.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Fee</span>
                <span className="text-foreground">$50.00</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-foreground">Total Amount Paid</span>
                <span className="text-xl font-bold text-primary">$1,430.00</span>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>• Please arrive at the airport at least 2 hours before departure</li>
              <li>• Carry a valid ID proof and this booking confirmation</li>
              <li>• Check baggage allowance and restrictions</li>
              <li>• Contact us for any changes or cancellations</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Need help? Contact us anytime</p>
            <p className="text-sm font-medium text-foreground">info@travelhub.com | +1 (555) 123-4567</p>
            <p className="text-xs text-muted-foreground mt-4">
              This is an automated confirmation email. Please do not reply.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-center gap-4">
        <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Send Email to Customer
        </Button>
        <Button variant="outline">
          Create New Booking
        </Button>
      </div>
    </div>
  );
};

export default EmailTemplate;
