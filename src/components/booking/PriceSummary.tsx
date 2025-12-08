import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tag, Wallet, Users, Building2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PriceSummaryProps {
  onNext: () => void;
  onBack: () => void;
  bookingData?: any;
}

const PriceSummary = ({ onNext, onBack, bookingData }: PriceSummaryProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [walletFlag, setWalletFlag] = useState<string>("No");
  const [walletBalance, setWalletBalance] = useState("850.00");

  // Extract booking details
  const tickets = bookingData?.tickets || { adult: 0, child: 0 };
  const adultCount = tickets.adult || 0;
  const childCount = tickets.child || 0;
  const selectedSupplier = bookingData?.supplier;
  const selectedTimeSlot = bookingData?.selectedTimeSlot;
  const isPremiumTime = selectedTimeSlot?.type === "premium";

  // Get prices from supplier or use defaults
  const getAdultPrice = () => {
    if (!selectedSupplier) return 0;
    return isPremiumTime ? (selectedSupplier.adultPremiumPrice || selectedSupplier.adultPrice || 0) : (selectedSupplier.adultPrice || 0);
  };

  const getChildPrice = () => {
    if (!selectedSupplier) return 0;
    return isPremiumTime ? (selectedSupplier.childPremiumPrice || selectedSupplier.childPrice || 0) : (selectedSupplier.childPrice || 0);
  };

  const adultPrice = getAdultPrice();
  const childPrice = getChildPrice();
  const adultTotal = adultPrice * adultCount;
  const childTotal = childPrice * childCount;
  const basePrice = adultTotal + childTotal || 1200;
  const taxes = Math.round(basePrice * 0.15) || 180;
  const serviceFee = Math.round(basePrice * 0.04) || 50;
  
  // Calculate wallet redemption based on balance
  const balanceValue = parseFloat(walletBalance) || 0;
  const balanceInteger = Math.floor(balanceValue);
  // Calculate 33% of integer balance, rounded down to nearest 10
  const redeemableAmount = Math.floor((balanceInteger * 0.33) / 10) * 10;
  // Calculate bill amount before wallet redemption
  const billAmount = basePrice + taxes + serviceFee - discount;
  // Wallet redemption cannot exceed the bill amount
  const walletRedemption = walletFlag === "Yes" ? Math.min(redeemableAmount, billAmount) : 0;
  const total = billAmount - walletRedemption;
  
  // Update redemption when flag changes
  const handleWalletFlagChange = (value: string) => {
    setWalletFlag(value);
  };

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

      {/* Booking Details Section */}
      {(selectedSupplier || adultCount > 0 || childCount > 0) && (
        <Card className="p-6 border border-border/50">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
            <Users className="h-5 w-5 text-primary" />
            <h4 className="text-lg font-semibold text-foreground">Booking Details</h4>
          </div>
          <div className="space-y-4">
            {/* Vendor/Supplier Info */}
            {selectedSupplier && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Vendor</Label>
                </div>
                <p className="text-sm font-bold text-foreground pl-6">{selectedSupplier.name}</p>
                {selectedTimeSlot && (
                  <div className="flex items-center gap-2 pl-6 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs font-semibold text-foreground">{selectedTimeSlot.label}</p>
                    {isPremiumTime && (
                      <Badge variant="secondary" className="text-[9px] px-1.5 py-0">Premium</Badge>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Pax Count */}
            <div className="space-y-2 pt-2 border-t border-border/30">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Passenger Count</Label>
              <div className="space-y-2 pl-2">
                {adultCount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Adults</span>
                    <span className="text-base font-bold text-foreground">{adultCount}</span>
                  </div>
                )}
                {childCount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Children</span>
                    <span className="text-base font-bold text-foreground">{childCount}</span>
                  </div>
                )}
                {(adultCount > 0 || childCount > 0) && (
                  <div className="flex justify-between items-center pt-2 border-t border-border/30">
                    <span className="text-sm font-semibold text-foreground">Total Passengers</span>
                    <span className="text-lg font-bold text-primary">{adultCount + childCount}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Vendor Price Breakdown */}
            {selectedSupplier && (adultCount > 0 || childCount > 0) && (
              <div className="space-y-2 pt-2 border-t border-border/30">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Vendor Price Breakdown</Label>
                <div className="space-y-2 pl-2">
                  {adultCount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Adult {adultCount} X {adultPrice.toFixed(0)} = {adultTotal.toFixed(0)}
                        {isPremiumTime && (
                          <Badge variant="secondary" className="ml-2 text-[9px] px-1 py-0">Premium</Badge>
                        )}
                      </span>
                      <span className="text-sm font-semibold text-foreground">${adultTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {childCount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Child {childCount} X {childPrice.toFixed(0)} = {childTotal.toFixed(0)}
                        {isPremiumTime && (
                          <Badge variant="secondary" className="ml-2 text-[9px] px-1 py-0">Premium</Badge>
                        )}
                      </span>
                      <span className="text-sm font-semibold text-foreground">${childTotal.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-border/30">
                    <span className="text-sm font-semibold text-foreground">Subtotal</span>
                    <span className="text-base font-bold text-primary">${basePrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

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
            <Select value={walletFlag} onValueChange={handleWalletFlagChange}>
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
                  Available Balance
                </Label>
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md border border-border flex items-center">
                  <span className="text-sm font-semibold text-foreground">${balanceValue.toFixed(2)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-redemption" className="text-sm font-semibold text-foreground">
                  Amount Can Be Redeemed
                </Label>
                <div className="h-11 px-3 py-2 bg-muted/50 rounded-md border border-border flex items-center">
                  <span className="text-sm font-semibold text-foreground">${redeemableAmount.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Calculated as 33% of balance (rounded down to nearest 10)
                </p>
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
