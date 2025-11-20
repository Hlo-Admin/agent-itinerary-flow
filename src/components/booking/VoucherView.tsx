import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Mail, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

interface VoucherViewProps {
  onNext: () => void;
  bookingData: any;
}

const VoucherView = ({ onNext, bookingData }: VoucherViewProps) => {
  const bookingRef = "TRV" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="space-y-7">
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
  );
};

export default VoucherView;
