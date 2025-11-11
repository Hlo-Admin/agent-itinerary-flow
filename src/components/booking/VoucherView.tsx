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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/10">
          <CheckCircle2 className="h-6 w-6 text-success" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Booking Confirmed!</h3>
          <p className="text-sm text-muted-foreground">Reference: {bookingRef}</p>
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Passenger Name</h4>
              <p className="text-lg font-semibold text-foreground">John Doe</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Travel Date</h4>
              <p className="text-lg font-semibold text-foreground">June 15, 2024</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Route</h4>
              <p className="text-lg font-semibold text-foreground">New York → London</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Passengers</h4>
              <p className="text-lg font-semibold text-foreground">2 Adults, 1 Child</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <QRCodeSVG value={bookingRef} size={160} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Scan for mobile voucher</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold text-foreground mb-4">Financial Summary</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ticket Price</span>
            <span className="font-medium text-foreground">$1,200.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxes & Fees</span>
            <span className="font-medium text-foreground">$180.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service Fee</span>
            <span className="font-medium text-foreground">$50.00</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-semibold text-foreground">Total Paid</span>
            <span className="text-xl font-bold text-primary">$1,430.00</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-muted-foreground">Payment Method</span>
            <span className="text-sm font-medium text-success">Agent Credit</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button variant="outline" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Send Email
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline" className="flex items-center gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
          <AlertCircle className="h-4 w-4" />
          Refund
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Rebook
        </Button>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext} className="bg-primary hover:bg-primary/90">
          View Confirmation Email
        </Button>
      </div>
    </div>
  );
};

export default VoucherView;
