import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Search, MapPin, Calendar, Users, Utensils, Landmark, Compass, Building2, Mountain, Waves } from "lucide-react";

interface SearchExperiencesProps {
  onNext: (data: any) => void;
}

const categories = [
  { name: "Food Tours", icon: Utensils },
  { name: "History", icon: Landmark },
  { name: "Day Trips", icon: Compass },
  { name: "Museums", icon: Building2 },
  { name: "Outdoor", icon: Mountain },
  { name: "Water Sports", icon: Waves },
];

const SearchExperiences = ({ onNext }: SearchExperiencesProps) => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSearch = () => {
    onNext({ destination, date, guests, categories: selectedCategories });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Find Experiences</h3>
        <p className="text-muted-foreground">Search tours and activities for your clients</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Destination
              </Label>
              <Input
                id="destination"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Travel Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests" className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Guests
              </Label>
              <Input
                id="guests"
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </Card>

      <div>
        <h4 className="text-lg font-semibold text-foreground mb-3">Quick Filters</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.name);
            return (
              <Card
                key={category.name}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <Icon
                    className={`h-6 w-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isSelected ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {category.name}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90 gap-2">
          <Search className="h-4 w-4" />
          Search Experiences
        </Button>
      </div>
    </div>
  );
};

export default SearchExperiences;
