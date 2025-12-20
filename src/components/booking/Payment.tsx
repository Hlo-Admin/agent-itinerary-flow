import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CreditCard, Wallet, Building2, Banknote, FileText, Users, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PaymentProps {
  onNext: () => void;
  onBack: () => void;
  bookingData?: any;
}

const Payment = ({ onNext, onBack, bookingData }: PaymentProps) => {
  const [activeTab, setActiveTab] = useState("agent-credit");
  const [walletAmount, setWalletAmount] = useState(0);
  const [walletEnabled, setWalletEnabled] = useState(false);
  const [walletBalance, setWalletBalance] = useState("850.00");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);

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
  
  // Calculate bill amount before wallet redemption
  const billAmount = basePrice + taxes + serviceFee;
  // Calculate wallet redemption as 30% of total amount due (if enabled)
  const walletRedemptionAmount = walletEnabled ? Math.round(billAmount * 0.3 * 100) / 100 : 0;
  // Wallet redemption cannot exceed the bill amount
  const walletRedemption = walletEnabled ? Math.min(walletRedemptionAmount, billAmount) : 0;
  const total = billAmount - walletRedemption;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left side - Payment Methods and Wallet */}
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold text-foreground">Payment method</h3>
          <p className="text-sm text-muted-foreground">Choose how you'd like to pay</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 gap-2 rounded-md border border-border bg-surface-muted p-1 sm:grid-cols-3">
            <TabsTrigger value="agent-credit" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-surface data-[state=active]:shadow-sm">
              <Banknote className="h-4 w-4" />
              <span className="hidden sm:inline">Agent credit</span>
            </TabsTrigger>
            <TabsTrigger value="net-banking" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-surface data-[state=active]:shadow-sm">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Net banking</span>
            </TabsTrigger>
            <TabsTrigger value="card-upi" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-surface data-[state=active]:shadow-sm">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Card/UPI</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agent-credit" className="mt-6 space-y-4">
            <Card className="p-5">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Available credit</span>
                  <span className="text-lg font-semibold text-success">$5,000.00</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your agent credit will be used for this booking. The amount will be deducted upon confirmation.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="net-banking" className="mt-6 space-y-4">
            <Card className="p-5">
              <div className="space-y-3.5">
                <Label className="text-sm font-medium text-muted-foreground">Select your bank</Label>
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Punjab National Bank</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  You will be redirected to your bank's secure portal to complete the payment.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="card-upi" className="mt-6 space-y-4">
            <Card className="p-5">
              <div className="space-y-3.5">
                <div className="space-y-2">
                  <Label htmlFor="card-number" className="text-sm font-medium text-muted-foreground">
                    Card number
                  </Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-sm font-medium text-muted-foreground">
                      Expiry date
                    </Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-sm font-medium text-muted-foreground">
                      CVV
                    </Label>
                    <Input id="cvv" placeholder="123" type="password" maxLength={3} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-name" className="text-sm font-medium text-muted-foreground">
                    Cardholder name
                  </Label>
                  <Input id="card-name" placeholder="John Doe" />
                </div>
                <div className="mt-3.5 border-t border-border pt-3.5">
                  <Label htmlFor="upi" className="text-sm font-medium text-muted-foreground">
                    Or pay with UPI
                  </Label>
                  <Input id="upi" placeholder="yourname@upi" className="mt-2" />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Terms and Conditions */}
        <Card className="p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="rounded-none"
            />
            <div className="flex-1 space-y-1">
              <Label htmlFor="terms" className="text-sm font-medium text-foreground cursor-pointer">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsDialog(true)}
                  className="text-primary hover:underline font-semibold"
                >
                  Terms & Conditions
                </button>
              </Label>
              <p className="text-xs text-muted-foreground">
                By proceeding, you acknowledge that you have read and agree to the supplier's terms and conditions.
              </p>
            </div>
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-between">
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!termsAccepted}
          >
            {activeTab !== "net-banking" 
              ? `Proceed to Payment - $${total.toFixed(2)}`
              : "Proceed to bank portal"}
          </Button>
        </div>
      </div>

      {/* Right side - Destination Image and Fare Breakup Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-8 p-0 overflow-hidden border-2 border-primary/10 bg-gradient-to-br from-background to-muted/20">
          {/* Destination Image */}
          {bookingData?.tour && (bookingData.tour.image || bookingData.tour.imageUrl) && (
            <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
              <img
                src={bookingData.tour.image || bookingData.tour.imageUrl || "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format"}
                alt={bookingData.tour.name || "Destination image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // For specific tours, use other tour's image instead of placeholder
                  if (bookingData.tour?.name === "Museum and Art Gallery Tour" || bookingData.tour?.name === "Historic Walking Tour of Old Town") {
                    target.src = getAlternateImage(bookingData.tour.name);
                  } else {
                    target.src = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(bookingData.tour?.name || 'Destination')}`;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-lg font-bold text-white drop-shadow-lg mb-1">
                  {bookingData.tour.name || "Destination"}
                </h4>
                {bookingData?.supplier?.name && (
                  <p className="text-xs text-white/90 drop-shadow">{bookingData.supplier.name}</p>
                )}
              </div>
            </div>
          )}
          
          <div className="p-4 pt-0 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <FileText className="h-5 w-5 text-primary" />
              <h4 className="text-xl font-semibold text-foreground">Fare Breakup</h4>
            </div>

          {/* Booking Details */}
          {(selectedSupplier || adultCount > 0 || childCount > 0) && (
            <div className="space-y-2 pb-3 border-b border-border">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Booking Details</Label>
                {selectedSupplier && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-bold text-foreground">{selectedSupplier.name}</p>
                    </div>
                    {selectedTimeSlot && (
                      <div className="flex items-center gap-2 pl-6">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs font-semibold text-foreground">{selectedTimeSlot.label}</p>
                        {isPremiumTime && (
                          <Badge variant="secondary" className="text-[9px] px-1.5 py-0">Premium</Badge>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2 pt-1.5">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    {adultCount > 0 && (
                      <p className="text-xs text-muted-foreground">Adult: {adultCount}</p>
                    )}
                    {childCount > 0 && (
                      <p className="text-xs text-muted-foreground">Child: {childCount}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Price Summary</Label>
            {adultCount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Adult {adultCount} × ${adultPrice.toFixed(0)}
                  {isPremiumTime && (
                    <Badge variant="secondary" className="ml-2 text-[9px] px-1 py-0">Premium</Badge>
                  )}
                </span>
                <span className="font-semibold text-foreground">${adultTotal.toFixed(2)}</span>
              </div>
            )}
            {childCount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Child {childCount} × ${childPrice.toFixed(0)}
                  {isPremiumTime && (
                    <Badge variant="secondary" className="ml-2 text-[9px] px-1 py-0">Premium</Badge>
                  )}
                </span>
                <span className="font-semibold text-foreground">${childTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-foreground">${basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Taxes & fees</span>
              <span className="font-medium text-foreground">${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Service fee</span>
              <span className="font-medium text-foreground">${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <span className="text-sm font-medium text-muted-foreground">Total amount due</span>
              <span className="text-2xl font-semibold text-primary">${billAmount.toFixed(2)}</span>
            </div>

            {/* Wallet Section */}
            <div className="space-y-2 pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wallet-enable"
                  checked={walletEnabled}
                  onCheckedChange={(checked) => setWalletEnabled(checked === true)}
                  className="rounded-none"
                />
                <Label htmlFor="wallet-enable" className="text-sm font-semibold text-foreground cursor-pointer flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Enable Wallet Reduction
                </Label>
              </div>
              
              {walletEnabled && (
                <div className="space-y-2 pl-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Wallet Balance</span>
                    <span className="font-semibold text-foreground">${parseFloat(walletBalance || "0").toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Wallet Reduction (30%)</span>
                    <span className="font-semibold text-success">-${walletRedemption.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Final Total */}
            {walletEnabled && walletRedemption > 0 && (
              <div className="flex justify-between border-t border-border pt-3 mt-2">
                <span className="text-sm font-medium text-muted-foreground">Final amount due</span>
                <span className="text-2xl font-semibold text-primary">${total.toFixed(2)}</span>
              </div>
            )}
          </div>
          </div>
        </Card>
      </div>

      {/* Terms & Conditions Dialog */}
      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col p-0 [&>button]:right-4 [&>button]:top-4 [&>button]:z-10 [&>button]:h-8 [&>button]:w-8 [&>button]:p-0 [&>button]:flex [&>button]:items-center [&>button]:justify-center">
          <DialogHeader className="pr-8 px-6 pt-6 pb-4 border-b border-border sticky top-0 bg-background z-10">
            <DialogTitle className="text-xl font-bold">Terms & Conditions</DialogTitle>
            <DialogDescription>
              {selectedSupplier?.name || "Supplier"} Terms & Conditions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 px-6 pb-6 overflow-y-auto flex-1">
            {/* What's Included Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-accent-emerald/20 to-accent-teal/20">
                  <CheckCircle2 className="h-5 w-5 text-accent-emerald" />
                </div>
                <h3 className="text-lg font-bold text-foreground">What's Included</h3>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {(bookingData?.tour?.includedItems || [
                  "Professional local guide",
                  "Entrance fees to all attractions",
                  "Small group experience (max 15 people)",
                  "Historical information booklet",
                  "Complimentary refreshments",
                  "Photo opportunities at key locations",
                ]).map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald/10 via-emerald/5 to-transparent border border-emerald/20">
                    <div className="p-1.5 rounded-lg bg-emerald/20">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions Content */}
            <div className="prose max-w-none text-sm pt-4 border-t border-border">
              <h3 className="text-lg font-semibold mb-2">1. Booking Terms</h3>
              <p className="text-muted-foreground mb-4">
                By making a booking with us, you agree to abide by all terms and conditions outlined below. 
                All bookings are subject to availability and confirmation.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">2. Payment Terms</h3>
              <p className="text-muted-foreground mb-4">
                Payment must be made in full at the time of booking unless otherwise specified. 
                We accept various payment methods including credit cards, debit cards, and digital wallets.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">3. Cancellation Policy</h3>
              <p className="text-muted-foreground mb-4">
                {selectedSupplier?.cancellationPolicy || "Cancellation policies vary by product. Please refer to the specific product details for cancellation terms."}
              </p>
              
              <h3 className="text-lg font-semibold mb-2">4. Refund Policy</h3>
              <p className="text-muted-foreground mb-4">
                Refunds, if applicable, will be processed according to our refund policy. 
                Processing times may vary depending on the payment method used.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">5. Changes to Booking</h3>
              <p className="text-muted-foreground mb-4">
                Changes to bookings are subject to availability and may incur additional charges. 
                Please contact our customer service team for assistance with modifications.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">6. Liability</h3>
              <p className="text-muted-foreground mb-4">
                We are not responsible for any loss, damage, or injury that may occur during your experience. 
                Please ensure you have appropriate travel insurance coverage.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">7. Contact Information</h3>
              <p className="text-muted-foreground">
                For any queries or concerns regarding these terms, please contact our customer service team.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
