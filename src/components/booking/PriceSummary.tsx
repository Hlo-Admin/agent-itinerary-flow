import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tag } from "lucide-react";

interface PriceSummaryProps {
  onNext: () => void;
  onBack: () => void;
}

const PriceSummary = ({ onNext, onBack }: PriceSummaryProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const basePrice = 1200;
  const taxes = 180;
  const serviceFee = 50;
  const total = basePrice + taxes + serviceFee - discount;

  const applyPromo = () => {
    // Simple promo code logic
    if (promoCode.toUpperCase() === "SAVE20") {
      setDiscount(20);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Price Summary</h3>
        <p className="text-base text-muted-foreground font-medium">Review your booking charges</p>
      </div>

      <Card className="p-8 bg-gradient-to-br from-muted/20 to-transparent border-0">
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-foreground">Base Ticket Price</span>
            <span className="font-semibold text-foreground">${basePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground">Taxes & Fees</span>
            <span className="font-semibold text-foreground">${taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground">Service Fee</span>
            <span className="font-semibold text-foreground">${serviceFee.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between items-center text-success">
              <span>Promo Discount</span>
              <span className="font-semibold">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-border pt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-foreground">Total Amount Due</span>
            <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-xl font-bold text-foreground mb-4">Have a Promo Code?</h3>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={applyPromo} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Apply
          </Button>
        </div>
        {discount > 0 && (
          <p className="text-sm text-success mt-2">✓ Promo code applied successfully!</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={onNext} className="bg-primary hover:bg-primary/90">
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default PriceSummary;
