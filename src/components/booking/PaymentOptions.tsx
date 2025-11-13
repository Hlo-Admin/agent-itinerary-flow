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
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-foreground">Payment method</h3>
        <p className="text-sm text-muted-foreground">Choose how you'd like to pay</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Total amount</span>
          <span className="text-2xl font-semibold text-primary">${totalAmount.toFixed(2)}</span>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 gap-2 rounded-md border border-border bg-surface-muted p-1 sm:grid-cols-4">
          <TabsTrigger value="agent-credit" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-surface data-[state=active]:shadow-sm">
            <Banknote className="h-4 w-4" />
            <span className="hidden sm:inline">Agent credit</span>
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-surface data-[state=active]:shadow-sm">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Wallet</span>
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

        <TabsContent value="wallet" className="mt-6 space-y-4">
          <Card className="p-5">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Wallet balance</span>
                <span className="text-lg font-semibold text-foreground">$850.00</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-amount" className="text-sm font-medium text-muted-foreground">
                  Use wallet amount
                </Label>
                <Input
                  id="wallet-amount"
                  type="number"
                  placeholder="Enter amount"
                  max={850}
                  onChange={(e) => setWalletAmount(Math.min(Number(e.target.value), 850))}
                />
              </div>
              {walletAmount > 0 && remainingAmount > 0 && (
                <div className="rounded-md border border-border bg-surface-muted p-3.5">
                  <p className="text-xs font-medium text-muted-foreground">Remaining amount</p>
                  <p className="text-xl font-semibold text-primary">${remainingAmount.toFixed(2)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">To be paid via card or other methods</p>
                </div>
              )}
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

      <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        {activeTab !== "net-banking" ? (
          <Button onClick={onNext}>
            Pay ${(activeTab === "wallet" && walletAmount > 0 ? remainingAmount : totalAmount).toFixed(2)}
          </Button>
        ) : (
          <Button>
            Proceed to bank portal
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
