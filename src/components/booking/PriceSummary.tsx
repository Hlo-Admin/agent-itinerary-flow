import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tag, Wallet } from "lucide-react";

interface PriceSummaryProps {
  onNext: () => void;
  onBack: () => void;
}

const PriceSummary = ({ onNext, onBack }: PriceSummaryProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [walletFlag, setWalletFlag] = useState<string>("No");
  const [walletBalance, setWalletBalance] = useState("");
  const [transactionWalletRedemption, setTransactionWalletRedemption] = useState("");

  const basePrice = 1200;
  const taxes = 180;
  const serviceFee = 50;
  const walletRedemption = walletFlag === "Yes" && transactionWalletRedemption 
    ? parseFloat(transactionWalletRedemption) || 0 
    : 0;
  const total = basePrice + taxes + serviceFee - discount - walletRedemption;

  const applyPromo = () => {
    // Simple promo code logic
    if (promoCode.toUpperCase() === "SAVE20") {
      setDiscount(20);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-foreground">Price summary</h3>
        <p className="text-sm text-muted-foreground">Review your booking charges</p>
      </div>

      <Card className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Base ticket price</span>
            <span className="font-medium text-foreground">${basePrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Taxes & fees</span>
            <span className="font-medium text-foreground">${taxes.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Service fee</span>
            <span className="font-medium text-foreground">${serviceFee.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between text-sm text-success">
              <span>Promo discount</span>
              <span className="font-medium">-${discount.toFixed(2)}</span>
            </div>
          )}
          {walletRedemption > 0 && (
            <div className="flex items-center justify-between text-sm text-success">
              <span>Wallet redemption</span>
              <span className="font-medium">-${walletRedemption.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-medium text-muted-foreground">Total amount due</span>
            <span className="text-2xl font-semibold text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
          <Wallet className="h-5 w-5 text-primary" />
          <h4 className="text-lg font-semibold text-foreground">Wallet Adjustment</h4>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wallet-flag" className="text-sm font-semibold text-foreground">
              Wallet Flag
            </Label>
            <Select value={walletFlag} onValueChange={setWalletFlag}>
              <SelectTrigger id="wallet-flag" className="h-11">
                <SelectValue placeholder="Select wallet flag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {walletFlag === "Yes" && (
            <div className="space-y-4 pt-2 border-t border-border">
              <div className="space-y-2">
                <Label htmlFor="wallet-balance" className="text-sm font-semibold text-foreground">
                  Wallet Balance - Cash point
                </Label>
                <Input
                  id="wallet-balance"
                  type="number"
                  placeholder="Enter wallet balance"
                  value={walletBalance}
                  onChange={(e) => setWalletBalance(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-redemption" className="text-sm font-semibold text-foreground">
                  Transaction Wallet Redemption
                </Label>
                <Input
                  id="wallet-redemption"
                  type="number"
                  placeholder="Enter redemption amount"
                  value={transactionWalletRedemption}
                  onChange={(e) => setTransactionWalletRedemption(e.target.value)}
                  className="h-11"
                  max={walletBalance ? parseFloat(walletBalance) : undefined}
                />
                {walletBalance && (
                  <p className="text-xs text-muted-foreground">
                    Available balance: ${parseFloat(walletBalance) || 0}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Have a promo code?</h4>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="pl-11"
            />
          </div>
          <Button onClick={applyPromo} variant="outline" className="sm:w-auto">
            Apply
          </Button>
        </div>
        {discount > 0 && (
          <p className="text-xs font-medium text-success">Promo code applied successfully</p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={onNext}>
          Continue to payment
        </Button>
      </div>
    </div>
  );
};

export default PriceSummary;
