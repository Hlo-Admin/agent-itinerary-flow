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
    <div className="space-y-7">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-success/20 to-success/10 shadow-md">
          <CheckCircle2 className="h-7 w-7 text-success" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Booking Confirmed!</h3>
          <p className="text-sm text-muted-foreground font-semibold mt-0.5">Reference: {bookingRef}</p>
        </div>
      </div>

      <Card className="p-7 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8 border-primary/30">
        <div className="grid md:grid-cols-2 gap-6">
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

          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-3.5 rounded-2xl shadow-md">
              <QRCodeSVG value={bookingRef} size={140} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Scan for mobile voucher</p>
          </div>
        </div>
      </Card>

      <Card className="p-7 border-0">
        <h4 className="font-bold text-lg text-foreground mb-5">Financial Summary</h4>
        <div className="space-y-2.5">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Ticket Price</span>
            <span className="font-semibold text-sm text-foreground">$1,200.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Taxes & Fees</span>
            <span className="font-semibold text-sm text-foreground">$180.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Service Fee</span>
            <span className="font-semibold text-sm text-foreground">$50.00</span>
          </div>
          <div className="border-t border-border pt-2.5 flex justify-between">
            <span className="font-bold text-foreground">Total Paid</span>
            <span className="text-lg font-bold text-primary">$1,430.00</span>
          </div>
          <div className="flex justify-between items-center pt-1.5">
            <span className="text-xs text-muted-foreground">Payment Method</span>
            <span className="text-xs font-semibold text-success">Agent Credit</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <Button variant="outline" className="flex items-center gap-2 h-11 text-sm">
          <Mail className="h-4 w-4" />
          Send Email
        </Button>
        <Button variant="outline" className="flex items-center gap-2 h-11 text-sm">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline" className="flex items-center gap-2 h-11 text-sm text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
          <AlertCircle className="h-4 w-4" />
          Refund
        </Button>
        <Button variant="outline" className="flex items-center gap-2 h-11 text-sm">
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
