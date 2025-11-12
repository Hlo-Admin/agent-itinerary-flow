import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Upload } from "lucide-react";

interface TravelerInfoFormProps {
  onNext: (data: any) => void;
}

const TravelerInfoForm = ({ onNext }: TravelerInfoFormProps) => {
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

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Lead Passenger Information</h3>
        <p className="text-base text-muted-foreground font-medium">Enter details for the primary traveler</p>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lead-name">Full Name *</Label>
            <Input id="lead-name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-email">Email *</Label>
            <Input id="lead-email" type="email" placeholder="john@example.com" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-phone">Phone Number *</Label>
          <Input id="lead-phone" placeholder="+1 (555) 000-0000" required />
        </div>
      </div>

      <div className="border-t border-border/50 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-foreground">Additional Adults</h3>
            <p className="text-base text-muted-foreground font-medium">Add other adult travelers</p>
          </div>
          <Button onClick={addAdult} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Adult
          </Button>
        </div>

        <div className="space-y-4">
          {adults.slice(1).map((adult, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <Input placeholder="Full Name" />
                  <Input type="email" placeholder="Email" />
                </div>
                <Button onClick={() => removeAdult(index + 1)} variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-foreground">Children</h3>
            <p className="text-base text-muted-foreground font-medium">Add child travelers (under 18)</p>
          </div>
          <Button onClick={addChild} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Child
          </Button>
        </div>

        <div className="space-y-4">
          {children.map((child, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <Input placeholder="Full Name" />
                  <Input type="date" placeholder="Date of Birth" />
                </div>
                <Button onClick={() => removeChild(index)} variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50 pt-8">
        <h3 className="text-xl font-bold text-foreground mb-3">Discount Documents (Optional)</h3>
        <p className="text-base text-muted-foreground mb-6 font-medium">
          Upload student ID, senior citizen, or military documents for potential discounts
        </p>
        <div className="border-2 border-dashed border-border/50 rounded-3xl p-10 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-base text-foreground font-semibold">Click to upload or drag and drop</p>
          <p className="text-sm text-muted-foreground mt-2">PDF, JPG, PNG up to 10MB</p>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
          Continue to Price Summary
        </Button>
      </div>
    </div>
  );
};

export default TravelerInfoForm;
