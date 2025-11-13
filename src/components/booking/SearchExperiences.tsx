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
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-foreground mb-2">Find Experiences</h3>
        <p className="text-sm text-muted-foreground font-medium">Search tours and activities for your clients</p>
      </div>

      <Card className="p-8 border-0">
        <div className="space-y-5">
          <div className="grid md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2 text-sm font-semibold">
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
              <Label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold">
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
              <Label htmlFor="guests" className="flex items-center gap-2 text-sm font-semibold">
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
        <h4 className="text-lg font-bold text-foreground mb-4">Quick Filters</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.name);
            return (
              <Card
                key={category.name}
                className={`p-5 cursor-pointer transition-all duration-300 border-0 ${
                  isSelected ? "border-2 border-primary bg-gradient-to-br from-primary/10 to-transparent shadow-lg scale-105" : "hover:shadow-md hover:scale-[1.02]"
                }`}
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex flex-col items-center gap-2.5 text-center">
                  <Icon
                    className={`h-7 w-7 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span
                    className={`text-xs font-bold ${
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

      <div className="flex justify-end pt-3">
        <Button onClick={handleSearch} className="h-11 px-6 gap-2">
          <Search className="h-4 w-4" />
          Search Experiences
        </Button>
      </div>
    </div>
  );
};

export default SearchExperiences;
