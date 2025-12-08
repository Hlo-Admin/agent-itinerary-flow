import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, MapPin, Calendar, Clock, Users, DollarSign, CheckCircle2 } from "lucide-react";

interface TravelerInfoFormProps {
  onNext: (data: any) => void;
  bookingData?: any;
}

const TravelerInfoForm = ({ onNext, bookingData }: TravelerInfoFormProps) => {
  const [adults, setAdults] = useState([{ name: "", email: "", phone: "" }]);
  const [children, setChildren] = useState<any[]>([]);

  const addAdult = () => {
    setAdults([...adults, { name: "", email: "", phone: "" }]);
  };

  const removeAdult = (index: number) => {
    if (adults.length > 1) {
      setAdults(adults.filter((_, i) => i !== index));
    }
  };

  const addChild = () => {
    setChildren([...children, { name: "", dob: "" }]);
  };

  const removeChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onNext({ adults, children });
  };

  const selectedTour = bookingData?.tour;
  const selectedSupplier = bookingData?.supplier;
  const selectedDate = bookingData?.selectedDate;
  const selectedTime = bookingData?.selectedTime;
  const tickets = bookingData?.tickets || { adult: 0, child: 0 };
  const totalPrice = bookingData?.totalPrice || 0;

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-foreground">Lead passenger information</h3>
        <p className="text-sm text-muted-foreground">Enter details for the primary traveler</p>
      </div>

      {selectedTour && selectedSupplier && (
        <Card className="p-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <h4 className="text-lg font-semibold text-foreground">Selected Booking Details</h4>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Park/Experience</p>
                  <p className="text-sm font-semibold text-foreground">{selectedTour.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Pax Count</p>
                  <div className="space-y-1">
                    {tickets.adult > 0 && (
                      <p className="text-sm font-semibold text-foreground">Adult: {tickets.adult}</p>
                    )}
                    {tickets.child > 0 && (
                      <p className="text-sm font-semibold text-foreground">Child: {tickets.child}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Date</p>
                  <p className="text-sm font-semibold text-foreground">
                    {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    }) : 'Not selected'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Time Slot</p>
                  <p className="text-sm font-semibold text-foreground">{selectedTime || 'Not selected'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Total Price</p>
                  <p className="text-lg font-bold text-primary">${totalPrice.toFixed(2)}</p>
                  <Badge variant="secondary" className="mt-1">
                    {selectedSupplier.name}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="lead-name" className="text-sm font-medium text-muted-foreground">
              Full name *
            </Label>
            <Input id="lead-name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-email" className="text-sm font-medium text-muted-foreground">
              Email *
            </Label>
            <Input id="lead-email" type="email" placeholder="john@example.com" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-phone" className="text-sm font-medium text-muted-foreground">
            Phone number *
          </Label>
          <Input id="lead-phone" placeholder="+1 (555) 000-0000" required />
        </div>
      </div>

      <div className="space-y-4 border-t border-border pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Additional adults</h3>
            <p className="text-sm text-muted-foreground">Add other adult travelers</p>
          </div>
          <Button onClick={addAdult} variant="outline" size="sm" className="flex w-full gap-2 sm:w-auto">
            <Plus className="h-4 w-4" />
            Add adult
          </Button>
        </div>

        <div className="space-y-4">
          {adults.slice(1).map((adult, index) => (
            <Card key={index} className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="grid flex-1 gap-4 md:grid-cols-2">
                  <Input placeholder="Full name" />
                  <Input type="email" placeholder="Email" />
                </div>
                <Button onClick={() => removeAdult(index + 1)} variant="ghost" size="icon" className="self-start">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t border-border pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Children</h3>
            <p className="text-sm text-muted-foreground">Add child travelers (under 18)</p>
          </div>
          <Button onClick={addChild} variant="outline" size="sm" className="flex w-full gap-2 sm:w-auto">
            <Plus className="h-4 w-4" />
            Add child
          </Button>
        </div>

        <div className="space-y-4">
          {children.map((child, index) => (
            <Card key={index} className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="grid flex-1 gap-4 md:grid-cols-2">
                  <Input placeholder="Full name" />
                  <Input type="date" placeholder="Date of birth" />
                </div>
                <Button onClick={() => removeChild(index)} variant="ghost" size="icon" className="self-start">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-3">
        <Button onClick={handleSubmit}>
          Continue to price summary
        </Button>
      </div>
    </div>
  );
};

export default TravelerInfoForm;
