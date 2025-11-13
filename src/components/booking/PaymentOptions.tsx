import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CreditCard, Wallet, Building2, Banknote } from "lucide-react";

interface PaymentOptionsProps {
  onNext: () => void;
  onBack: () => void;
}

const PaymentOptions = ({ onNext, onBack }: PaymentOptionsProps) => {
  const [activeTab, setActiveTab] = useState("agent-credit");
  const [walletAmount, setWalletAmount] = useState(0);
  const totalAmount = 1430;
  const remainingAmount = totalAmount - walletAmount;

  return (
    <div className="space-y-7">
      <div>
        <h3 className="text-xl font-bold text-foreground mb-2">Payment Method</h3>
        <p className="text-sm text-muted-foreground font-medium">Choose how you'd like to pay</p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-primary/10 to-transparent border-primary/30">
        <div className="flex justify-between items-center">
          <span className="text-foreground font-bold text-base">Total Amount</span>
          <span className="text-2xl font-bold text-primary">${totalAmount.toFixed(2)}</span>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agent-credit" className="flex items-center gap-2">
            <Banknote className="h-4 w-4" />
            <span className="hidden sm:inline">Agent Credit</span>
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Wallet</span>
          </TabsTrigger>
          <TabsTrigger value="net-banking" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Net Banking</span>
          </TabsTrigger>
          <TabsTrigger value="card-upi" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Card/UPI</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agent-credit" className="space-y-4 mt-5">
          <Card className="p-5">
            <div className="space-y-3.5">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Available Credit</span>
                <span className="text-lg font-bold text-success">$5,000.00</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your agent credit will be used for this booking. The amount will be deducted upon confirmation.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4 mt-5">
          <Card className="p-5">
            <div className="space-y-3.5">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Wallet Balance</span>
                <span className="text-lg font-bold text-secondary">$850.00</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-amount" className="text-sm font-semibold">Use Wallet Amount</Label>
                <Input
                  id="wallet-amount"
                  type="number"
                  placeholder="Enter amount"
                  max={850}
                  onChange={(e) => setWalletAmount(Math.min(Number(e.target.value), 850))}
                />
              </div>
              {walletAmount > 0 && remainingAmount > 0 && (
                <div className="p-3.5 bg-muted rounded-2xl">
                  <p className="text-xs font-semibold text-foreground">Remaining Amount</p>
                  <p className="text-xl font-bold text-primary">${remainingAmount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    To be paid via card or other methods
                  </p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="net-banking" className="space-y-4 mt-5">
          <Card className="p-5">
            <div className="space-y-3.5">
              <Label className="text-sm font-semibold">Select Your Bank</Label>
              <select className="w-full h-11 p-2.5 border-2 border-input rounded-2xl bg-background text-sm">
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

        <TabsContent value="card-upi" className="space-y-4 mt-5">
          <Card className="p-5">
            <div className="space-y-3.5">
              <div className="space-y-2">
                <Label htmlFor="card-number" className="text-sm font-semibold">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-sm font-semibold">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-sm font-semibold">CVV</Label>
                  <Input id="cvv" placeholder="123" type="password" maxLength={3} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-name" className="text-sm font-semibold">Cardholder Name</Label>
                <Input id="card-name" placeholder="John Doe" />
              </div>
              <div className="border-t border-border pt-3.5 mt-3.5">
                <Label htmlFor="upi" className="text-sm font-semibold">Or Pay with UPI</Label>
                <Input id="upi" placeholder="yourname@upi" className="mt-2" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-3">
        <Button onClick={onBack} variant="outline" className="h-11 px-6">
          Back
        </Button>
        {activeTab !== "net-banking" ? (
          <Button onClick={onNext} className="h-11 px-6 bg-success hover:bg-success/90 text-success-foreground">
            Pay ${(activeTab === "wallet" && walletAmount > 0 ? remainingAmount : totalAmount).toFixed(2)}
          </Button>
        ) : (
          <Button className="h-11 px-6">
            Proceed to Bank Portal
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
