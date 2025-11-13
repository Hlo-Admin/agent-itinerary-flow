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
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-foreground">Lead passenger information</h3>
        <p className="text-sm text-muted-foreground">Enter details for the primary traveler</p>
      </div>

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

      <div className="space-y-4 border-t border-border pt-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">Discount documents (optional)</h3>
          <p className="text-sm text-muted-foreground">
            Upload student ID, senior citizen, or military documents for potential discounts
          </p>
        </div>
        <div className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border p-6 text-center transition-colors hover:border-primary">
          <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
          <p className="mt-1 text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
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
