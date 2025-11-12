import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle2, XCircle, Info } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Compare Suppliers</h3>
          <p className="text-base text-muted-foreground font-medium mt-3">
            Choose the best supplier for {bookingData?.tour?.name}
          </p>
        </div>
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
      </div>

      <div className="grid gap-5">
        {mockSuppliers.map((supplier) => {
          const totalPrice = supplier.price * totalTickets;
          const agentCommission = (totalPrice * supplier.commission) / 100;
          const isSelected = selectedSupplier === supplier.id;

          return (
            <Card
              key={supplier.id}
              className={`p-10 cursor-pointer transition-all duration-300 border-0 ${
                isSelected ? "border-2 border-primary bg-gradient-to-r from-primary/10 to-transparent shadow-2xl scale-[1.02]" : "hover:shadow-xl hover:scale-[1.01]"
              }`}
              onClick={() => setSelectedSupplier(supplier.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-xl font-bold text-foreground">{supplier.name}</h4>
                    {supplier.verified && (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-foreground">{supplier.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({supplier.reviews})
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Price per Person</p>
                      <p className="font-semibold text-foreground">${supplier.price}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Your Commission</p>
                      <p className="font-semibold text-success">
                        {supplier.commission}% (${agentCommission.toFixed(2)})
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Response Time</p>
                      <p className="font-semibold text-foreground">{supplier.responseTime}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      {supplier.instantConfirmation ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {supplier.instantConfirmation ? "Instant" : "Manual"} Confirmation
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {supplier.cancellationPolicy}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Total Price</p>
                  <p className="text-2xl font-bold text-primary">${totalPrice}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    for {totalTickets} ticket{totalTickets > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSelectSupplier}
          className="bg-primary hover:bg-primary/90"
          disabled={!selectedSupplier}
        >
          Continue with Selected Supplier
        </Button>
      </div>
    </div>
  );
};

export default SupplierComparison;
