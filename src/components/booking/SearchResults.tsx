import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Clock, MapPin, CheckCircle2, Sparkles, TrendingUp, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResultsProps {
  onNext: (data: any) => void;
  onBack: () => void;
  searchData: any;
}

const mockTours = [
  {
    id: 1,
    name: "Historic Walking Tour of Old Town",
    category: "History",
    image: "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format",
    rating: 4.8,
    reviews: 234,
    duration: "3 hours",
    price: 45,
    location: "Downtown",
    cancellation: "Free cancellation up to 24 hours",
    suppliers: 3,
    color: "accent-blue",
  },
  {
    id: 2,
    name: "Culinary Food Tasting Experience",
    category: "Food Tours",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
    rating: 4.9,
    reviews: 456,
    duration: "4 hours",
    price: 89,
    location: "Market District",
    cancellation: "Free cancellation up to 48 hours",
    suppliers: 5,
    color: "accent-cyan",
  },
  {
    id: 3,
    name: "Mountain Hiking Adventure",
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format",
    rating: 4.7,
    reviews: 189,
    duration: "6 hours",
    price: 120,
    location: "Mountain Range",
    cancellation: "No refund",
    suppliers: 2,
    color: "accent-teal",
  },
  {
    id: 4,
    name: "Museum and Art Gallery Tour",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b64d6333?w=800&h=600&fit=crop&auto=format",
    rating: 4.6,
    reviews: 312,
    duration: "2.5 hours",
    price: 35,
    location: "Arts District",
    cancellation: "Free cancellation up to 24 hours",
    suppliers: 4,
    color: "accent-purple",
  },
];

const SearchResults = ({ onNext, onBack, searchData }: SearchResultsProps) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTours = mockTours.filter(
    (tour) => tour.price >= priceRange[0] && tour.price <= priceRange[1]
  );

  const handleSelectTour = (tourId: number) => {
    setSelectedTour(tourId);
    const tour = mockTours.find((t) => t.id === tourId);
    onNext({ tour });
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      "accent-blue": "bg-accent-blue/90",
      "accent-cyan": "bg-accent-cyan/90",
      "accent-teal": "bg-accent-teal/90",
      "accent-purple": "bg-accent-purple/90",
    };
    return colors[color] || colors["accent-blue"];
  };

  return (
    <div className="space-y-3 sm:space-y-6 w-full min-w-0 max-w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full min-w-0">
        <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
          <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">Search Results</h3>
          <p className="text-xs sm:text-base lg:text-lg text-muted-foreground">
            Found <span className="font-bold text-primary">{filteredTours.length}</span> experiences in {searchData?.destination || "your destination"}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="sm"
            className="lg:hidden h-9 text-xs"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={onBack} variant="outline" size="sm" className="h-9 sm:h-12 sm:px-6 text-xs sm:text-base">
            Modify Search
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 w-full min-w-0 max-w-full">
        {/* Filters Sidebar */}
        <div className={cn(
          "lg:col-span-3",
          showFilters ? "block fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto bg-background/95 backdrop-blur-lg lg:bg-transparent lg:backdrop-blur-none p-4 lg:p-0 overflow-y-auto" : "hidden lg:block"
        )}>
          <Card className="p-4 sm:p-6 lg:sticky lg:top-8 border border-primary/10 bg-gradient-to-br from-background to-muted/20">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-foreground">Filters</h4>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="food">Food tours</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="museums">Museums</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                    Price Range
                  </Label>
                  <span className="text-sm sm:text-base font-bold text-primary">${priceRange[0]} - ${priceRange[1]}</span>
                </div>
                <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={10} className="w-full" />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base">
                    <SelectValue placeholder="Most popular" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most popular</SelectItem>
                    <SelectItem value="price-low">Price: low to high</SelectItem>
                    <SelectItem value="price-high">Price: high to low</SelectItem>
                    <SelectItem value="rating">Highest rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        {/* Results List - Tiles */}
        <div className="lg:col-span-9 w-full min-w-0 max-w-full overflow-hidden">
          <div className="space-y-3 sm:space-y-4 w-full min-w-0 max-w-full">
            {filteredTours.map((tour, index) => {
              const isActive = selectedTour === tour.id;
              const colorMap: Record<string, string> = {
                "accent-blue": "from-accent-blue/90 to-accent-indigo/90",
                "accent-cyan": "from-accent-cyan/90 to-accent-teal/90",
                "accent-teal": "from-accent-teal/90 to-accent-emerald/90",
                "accent-purple": "from-accent-purple/90 to-accent-pink/90",
              };
              const gradientClass = colorMap[tour.color] || colorMap["accent-blue"];
              
              return (
                <Card
                  key={tour.id}
                  className={cn(
                    "group relative flex flex-row overflow-hidden transition-all duration-500 hover:shadow-2xl border w-full min-w-0 max-w-full box-border animate-scale-in",
                    isActive 
                      ? "border-accent-blue border-2 shadow-xl shadow-accent-blue/20 ring-2 ring-accent-blue/20" 
                      : "border-border/40 hover:border-accent-blue/40 hover:shadow-lg"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Section */}
                  <div className="relative w-32 sm:w-48 md:w-64 h-32 sm:h-48 flex-shrink-0 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <img 
                      src={tour.image} 
                      alt={tour.name} 
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" 
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(tour.name)}`;
                      }}
                    />
                    <div className={cn(
                      "absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-xs font-bold backdrop-blur-xl text-white shadow-xl border border-white/20 transition-all duration-300 group-hover:scale-105",
                      `bg-gradient-to-r ${gradientClass}`
                    )}>
                      {tour.category}
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-accent-indigo/5 to-transparent border-2 border-accent-blue/50 z-20 animate-pulse-glow" />
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-6 min-w-0 bg-gradient-to-b from-background to-muted/20">
                    <div className="space-y-2 sm:space-y-3 min-w-0 flex-1">
                      <div className="space-y-1.5 sm:space-y-2 min-w-0">
                        <h4 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-accent-blue transition-all duration-300 leading-tight line-clamp-2 break-words">
                          {tour.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                          <div className="flex items-center gap-1 flex-shrink-0 px-2 py-0.5 rounded-lg bg-amber/10 border border-amber/20">
                            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500 flex-shrink-0" />
                            <span className="font-bold text-foreground text-xs">{tour.rating}</span>
                            <span className="text-muted-foreground text-[10px] sm:text-xs">({tour.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0 px-2 py-0.5 rounded-lg bg-muted/50">
                            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                            <span className="font-medium text-[10px] sm:text-xs">{tour.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0 px-2 py-0.5 rounded-lg bg-muted/30">
                            <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0 text-accent-blue" />
                            <span className="font-medium text-[10px] sm:text-xs truncate">{tour.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-emerald/10 via-emerald/5 to-transparent border border-emerald/20 min-w-0 backdrop-blur-sm">
                          <div className="p-1 rounded-lg bg-emerald/20 flex-shrink-0">
                            <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                          </div>
                          <span className="text-[10px] sm:text-xs font-medium text-foreground line-clamp-1 min-w-0">{tour.cancellation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border/30 mt-2 sm:mt-3 min-w-0">
                      <div className="flex items-center gap-2 min-w-0 flex-1 px-2 py-1.5 rounded-lg bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border border-accent-blue/20">
                        <div className="p-1 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-indigo/20 flex-shrink-0">
                          <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent-blue" />
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                          <span className="font-bold text-foreground">{tour.suppliers}</span> supplier{tour.suppliers > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent-blue to-accent-indigo bg-clip-text text-transparent">${tour.price}</p>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground font-semibold">per person</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button variant="outline" size="sm" className="h-8 sm:h-9 text-[10px] sm:text-xs border-border/50 hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all duration-300">
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          className={cn(
                            "h-8 sm:h-9 px-3 sm:px-4 font-bold text-[10px] sm:text-xs transition-all duration-300",
                            isActive
                              ? "bg-gradient-to-r from-accent-blue to-accent-indigo shadow-lg shadow-accent-blue/30 hover:shadow-xl hover:shadow-accent-blue/40"
                              : "bg-gradient-to-r from-accent-blue to-accent-indigo hover:from-accent-blue/90 hover:to-accent-indigo/90 shadow-md hover:shadow-lg"
                          )}
                          onClick={() => handleSelectTour(tour.id)}
                        >
                          {isActive ? "✓ Selected" : "Select"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
