import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Search, MapPin, Calendar, Users, Utensils, Landmark, Compass, Building2, Mountain, Waves, Sparkles } from "lucide-react";

interface SearchExperiencesProps {
  onNext: (data: any) => void;
}

const categories = [
  { name: "Food Tours", icon: Utensils, color: "accent-cyan" },
  { name: "History", icon: Landmark, color: "accent-blue" },
  { name: "Day Trips", icon: Compass, color: "accent-teal" },
  { name: "Museums", icon: Building2, color: "accent-purple" },
  { name: "Outdoor", icon: Mountain, color: "accent-teal" },
  { name: "Water Sports", icon: Waves, color: "accent-blue" },
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
    <div className="space-y-6 sm:space-y-10 w-full min-w-0 max-w-full overflow-hidden">
      <div className="w-full min-w-0">
        <h3 className="text-xl sm:text-3xl font-semibold text-foreground tracking-tight mb-1 sm:mb-2">Find Experiences</h3>
        <p className="text-xs sm:text-base text-muted-foreground">Search tours and activities for your clients</p>
      </div>

      <Card className="p-3 sm:p-8 border border-primary/10 bg-gradient-to-br from-background to-muted/20 w-full min-w-0 max-w-full box-border overflow-hidden">
        <div className="flex items-center gap-2 mb-4 sm:mb-6 w-full min-w-0">
          <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
          <h4 className="text-base sm:text-lg font-semibold text-foreground">Search Criteria</h4>
        </div>
        <div className="grid gap-3 sm:gap-6 md:grid-cols-3 w-full min-w-0 max-w-full">
          <div className="space-y-2 sm:space-y-3 w-full min-w-0">
            <Label htmlFor="destination" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              Destination
            </Label>
            <Input
              id="destination"
              placeholder="Search by city or attraction"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-10 sm:h-12 text-sm sm:text-base w-full min-w-0 box-border"
            />
          </div>
          <div className="space-y-2 sm:space-y-3 w-full min-w-0">
            <Label htmlFor="date" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              Travel Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 sm:h-12 text-sm sm:text-base w-full min-w-0 box-border"
            />
          </div>
          <div className="space-y-2 sm:space-y-3 w-full min-w-0">
            <Label htmlFor="guests" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              Guests
            </Label>
            <Input
              id="guests"
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="h-10 sm:h-12 text-sm sm:text-base w-full min-w-0 box-border"
            />
          </div>
        </div>
      </Card>

      <div className="w-full min-w-0 overflow-hidden">
        <div className="flex items-center gap-2 mb-4 sm:mb-6 w-full min-w-0">
          <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Quick Filters</h4>
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-6 w-full min-w-0 max-w-full">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.name);
            const colorClasses: Record<string, { border: string; bg: string; text: string }> = {
              "accent-cyan": {
                border: "border-accent-cyan",
                bg: "bg-accent-cyan/10",
                text: "text-accent-cyan",
              },
              "accent-blue": {
                border: "border-accent-blue",
                bg: "bg-accent-blue/10",
                text: "text-accent-blue",
              },
              "accent-teal": {
                border: "border-accent-teal",
                bg: "bg-accent-teal/10",
                text: "text-accent-teal",
              },
              "accent-purple": {
                border: "border-accent-purple",
                bg: "bg-accent-purple/10",
                text: "text-accent-purple",
              },
            };
            const colorClass = colorClasses[category.color] || colorClasses["accent-blue"];
            
            return (
              <button
                key={category.name}
                type="button"
                className={cn(
                  "group relative flex flex-col items-center justify-center gap-1 sm:gap-3 rounded-lg sm:rounded-xl border bg-background p-1.5 sm:p-5 text-[10px] sm:text-sm font-semibold text-foreground transition-all duration-300 sm:hover:scale-105 sm:hover:shadow-lg w-full min-w-0 max-w-full box-border overflow-hidden",
                  isSelected 
                    ? `${colorClass.border} ${colorClass.bg} shadow-md border-2` 
                    : "border-border sm:hover:border-primary/40"
                )}
                onClick={() => toggleCategory(category.name)}
              >
                <div className={cn(
                  "p-2 sm:p-3 rounded-lg transition-colors flex-shrink-0",
                  isSelected 
                    ? `${colorClass.bg.replace('/10', '/20')}` 
                    : "bg-muted/50 group-hover:bg-primary/10"
                )}>
                  <Icon className={cn(
                    "h-4 w-4 sm:h-5 sm:w-5 transition-colors",
                    isSelected 
                      ? colorClass.text
                      : "text-muted-foreground group-hover:text-primary"
                  )} />
                </div>
                <span className="text-[10px] sm:text-xs text-center line-clamp-2">{category.name}</span>
                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-[8px] sm:text-[10px] text-primary-foreground font-bold">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pt-3 sm:pt-4 w-full min-w-0">
        <Button onClick={handleSearch} className="gap-2 h-10 sm:h-12 px-4 sm:px-8 text-sm sm:text-base font-semibold w-full sm:w-auto min-w-0 box-border" size="lg">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
          <span className="truncate">Search Experiences</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchExperiences;
