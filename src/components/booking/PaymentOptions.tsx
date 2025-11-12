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
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Payment Method</h3>
        <p className="text-base text-muted-foreground font-medium">Choose how you'd like to pay</p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-primary/10 to-transparent border-primary/30">
        <div className="flex justify-between items-center">
          <span className="text-foreground font-bold text-lg">Total Amount</span>
          <span className="text-3xl font-extrabold text-primary">${totalAmount.toFixed(2)}</span>
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

        <TabsContent value="agent-credit" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Available Credit</span>
                <span className="text-xl font-bold text-success">$5,000.00</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your agent credit will be used for this booking. The amount will be deducted upon confirmation.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Wallet Balance</span>
                <span className="text-xl font-bold text-secondary">$850.00</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-amount">Use Wallet Amount</Label>
                <Input
                  id="wallet-amount"
                  type="number"
                  placeholder="Enter amount"
                  max={850}
                  onChange={(e) => setWalletAmount(Math.min(Number(e.target.value), 850))}
                />
              </div>
              {walletAmount > 0 && remainingAmount > 0 && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium text-foreground">Remaining Amount</p>
                  <p className="text-2xl font-bold text-primary">${remainingAmount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    To be paid via card or other methods
                  </p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="net-banking" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="space-y-4">
              <Label>Select Your Bank</Label>
              <select className="w-full p-2 border border-input rounded-lg bg-background">
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Punjab National Bank</option>
              </select>
              <p className="text-sm text-muted-foreground">
                You will be redirected to your bank's secure portal to complete the payment.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="card-upi" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" type="password" maxLength={3} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input id="card-name" placeholder="John Doe" />
              </div>
              <div className="border-t border-border pt-4 mt-4">
                <Label htmlFor="upi">Or Pay with UPI</Label>
                <Input id="upi" placeholder="yourname@upi" className="mt-2" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        {activeTab !== "net-banking" ? (
          <Button onClick={onNext} className="bg-success hover:bg-success/90 text-success-foreground">
            Pay ${(activeTab === "wallet" && walletAmount > 0 ? remainingAmount : totalAmount).toFixed(2)}
          </Button>
        ) : (
          <Button className="bg-primary hover:bg-primary/90">
            Proceed to Bank Portal
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
