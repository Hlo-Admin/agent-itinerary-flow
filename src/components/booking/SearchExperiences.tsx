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
    <div className="space-y-6 sm:space-y-10 w-full min-w-0 max-w-full overflow-hidden animate-fade-in">
      <div className="w-full min-w-0">
        <h3 className="text-xl sm:text-3xl font-bold text-foreground tracking-tight mb-1 sm:mb-2 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">Find Experiences</h3>
        <p className="text-xs sm:text-base text-muted-foreground">Search tours and activities for your clients</p>
      </div>

      <Card className="p-4 sm:p-8 border border-border/40 bg-gradient-to-br from-background via-background to-accent-blue/5 w-full min-w-0 max-w-full box-border overflow-hidden shadow-xl animate-scale-in">
        <div className="flex items-center gap-3 mb-5 sm:mb-6 w-full min-w-0">
          <div className="p-2 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-indigo/20">
            <Sparkles className="h-5 w-5 text-accent-blue flex-shrink-0" />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-foreground">Search Criteria</h4>
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

      <div className="w-full min-w-0 overflow-hidden animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-3 mb-5 sm:mb-6 w-full min-w-0">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-pink/20">
            <Sparkles className="h-4 w-4 text-accent-purple flex-shrink-0" />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Quick Filters</h4>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-6 w-full min-w-0 max-w-full">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.name);
            const colorClasses: Record<string, { border: string; bg: string; text: string; gradient: string }> = {
              "accent-cyan": {
                border: "border-accent-cyan/40",
                bg: "bg-gradient-to-br from-accent-cyan/10 to-accent-teal/10",
                text: "text-accent-cyan",
                gradient: "from-accent-cyan/90 to-accent-teal/90",
              },
              "accent-blue": {
                border: "border-accent-blue/40",
                bg: "bg-gradient-to-br from-accent-blue/10 to-accent-indigo/10",
                text: "text-accent-blue",
                gradient: "from-accent-blue/90 to-accent-indigo/90",
              },
              "accent-teal": {
                border: "border-accent-teal/40",
                bg: "bg-gradient-to-br from-accent-teal/10 to-accent-emerald/10",
                text: "text-accent-teal",
                gradient: "from-accent-teal/90 to-accent-emerald/90",
              },
              "accent-purple": {
                border: "border-accent-purple/40",
                bg: "bg-gradient-to-br from-accent-purple/10 to-accent-pink/10",
                text: "text-accent-purple",
                gradient: "from-accent-purple/90 to-accent-pink/90",
              },
            };
            const colorClass = colorClasses[category.color] || colorClasses["accent-blue"];
            
            return (
              <button
                key={category.name}
                type="button"
                className={cn(
                  "group relative flex flex-col items-center justify-center gap-1.5 sm:gap-3 rounded-xl sm:rounded-2xl border-2 bg-background p-2.5 sm:p-5 text-[10px] sm:text-sm font-semibold text-foreground transition-all duration-500 sm:hover:scale-105 sm:hover:shadow-xl w-full min-w-0 max-w-full box-border overflow-hidden animate-scale-in",
                  isSelected 
                    ? `${colorClass.border} ${colorClass.bg} shadow-lg ring-2 ring-${category.color}/20` 
                    : "border-border/40 sm:hover:border-accent-blue/40 sm:hover:bg-gradient-to-br sm:hover:from-accent-blue/5 sm:hover:to-accent-indigo/5"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => toggleCategory(category.name)}
              >
                <div className={cn(
                  "p-2 sm:p-3 rounded-xl transition-all duration-300 flex-shrink-0 group-hover:scale-110",
                  isSelected 
                    ? `bg-gradient-to-br ${colorClass.gradient} shadow-md` 
                    : "bg-gradient-to-br from-muted/60 to-muted/40 group-hover:from-accent-blue/20 group-hover:to-accent-indigo/20"
                )}>
                  <Icon className={cn(
                    "h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300",
                    isSelected 
                      ? "text-white drop-shadow-sm"
                      : "text-muted-foreground group-hover:text-accent-blue"
                  )} />
                </div>
                <span className="text-[10px] sm:text-xs text-center line-clamp-2 font-medium">{category.name}</span>
                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center shadow-lg ring-2 ring-white animate-pulse-glow">
                    <span className="text-[9px] sm:text-[10px] text-white font-bold">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pt-3 sm:pt-4 w-full min-w-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <Button 
          onClick={handleSearch} 
          className="gap-2 h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-bold w-full sm:w-auto min-w-0 box-border shadow-lg shadow-accent-blue/30 hover:shadow-xl hover:shadow-accent-blue/40"
          size="lg"
        >
          <Search className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
          <span className="truncate">Search Experiences</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchExperiences;
