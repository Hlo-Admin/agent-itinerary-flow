import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle2, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SupplierComparisonProps {
  onNext: (data: any) => void;
  onBack: () => void;
  bookingData: any;
}

const mockSuppliers = [
  {
    id: 1,
    name: "TourPro Adventures",
    rating: 4.9,
    reviews: 1243,
    price: 45,
    commission: 15,
    cancellationPolicy: "Free cancellation up to 24 hours",
    instantConfirmation: true,
    responseTime: "Within 2 hours",
    verified: true,
  },
  {
    id: 2,
    name: "Local Experiences Co",
    rating: 4.7,
    reviews: 876,
    price: 42,
    commission: 12,
    cancellationPolicy: "Free cancellation up to 48 hours",
    instantConfirmation: false,
    responseTime: "Within 6 hours",
    verified: true,
  },
  {
    id: 3,
    name: "Heritage Tours Ltd",
    rating: 4.8,
    reviews: 2103,
    price: 48,
    commission: 18,
    cancellationPolicy: "Free cancellation up to 72 hours",
    instantConfirmation: true,
    responseTime: "Instant",
    verified: true,
  },
];

const SupplierComparison = ({ onNext, onBack, bookingData }: SupplierComparisonProps) => {
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);

  const handleSelectSupplier = () => {
    if (selectedSupplier) {
      const supplier = mockSuppliers.find((s) => s.id === selectedSupplier);
      onNext({ supplier });
    }
  };

  const tickets = bookingData?.tickets || { adult: 2, child: 0, senior: 0 };
  const totalTickets = tickets.adult + tickets.child + tickets.senior;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-foreground">Compare suppliers</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose the best supplier for {bookingData?.tour?.name}
          </p>
        </div>
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
      </div>

      <div className="grid gap-4">
        {mockSuppliers.map((supplier) => {
          const totalPrice = supplier.price * totalTickets;
          const agentCommission = (totalPrice * supplier.commission) / 100;
          const isSelected = selectedSupplier === supplier.id;

          return (
            <Card
              key={supplier.id}
              className={cn(
                "cursor-pointer p-6 transition-shadow hover:shadow-md",
                isSelected ? "border-primary shadow-md" : "border-border",
              )}
              onClick={() => setSelectedSupplier(supplier.id)}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <h4 className="text-lg font-semibold text-foreground">{supplier.name}</h4>
                    {supplier.verified && (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Rating</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-foreground">{supplier.rating}</span>
                        <span>({supplier.reviews})</span>
                      </div>
                    </div>

                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Price per person</p>
                      <p className="text-sm font-semibold text-foreground">${supplier.price}</p>
                    </div>

                    {/* <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Your commission</p>
                      <p className="text-sm font-semibold text-success">
                        {supplier.commission}% (${agentCommission.toFixed(2)})
                      </p>
                    </div> */}

                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Response time</p>
                      <p className="text-sm font-semibold text-foreground">{supplier.responseTime}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {supplier.instantConfirmation ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>
                        {supplier.instantConfirmation ? "Instant" : "Manual"} confirmation
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      <span>{supplier.cancellationPolicy}</span>
                    </div>
                  </div>
                </div>

                <div className="text-left md:text-right">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Total price</p>
                  <p className="text-2xl font-semibold text-primary">${totalPrice}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    for {totalTickets} ticket{totalTickets > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSelectSupplier} disabled={!selectedSupplier}>
          Continue with selected supplier
        </Button>
      </div>
    </div>
  );
};

export default SupplierComparison;
