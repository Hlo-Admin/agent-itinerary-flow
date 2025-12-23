import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Star, Clock, MapPin, CheckCircle2, Sparkles, TrendingUp, Filter, X, Calendar, Users, DollarSign, Plus, Minus, AlertCircle, ChevronDown, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
    ticketRestrictions: "both", // "adult-only", "child-only", "both"
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
    ticketRestrictions: "adult-only",
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
    ticketRestrictions: "both",
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
    ticketRestrictions: "child-only",
  },
];

const SearchResults = ({ onNext, onBack, searchData }: SearchResultsProps) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [selectedTourForPopup, setSelectedTourForPopup] = useState<any>(null);
  const [popupAdultCount, setPopupAdultCount] = useState(2);
  const [popupChildCount, setPopupChildCount] = useState(0);
  const [popupDate, setPopupDate] = useState<Date | undefined>(undefined);
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  
  // New filter states
  const [departureTime, setDepartureTime] = useState([0, 24]);
  const [arrivalTime, setArrivalTime] = useState([0, 24]);
  const [stopFilters, setStopFilters] = useState({ noStop: true, oneStop: true });
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    departure: true,
    arrival: true,
    stops: true
  });
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  const clearFilters = () => {
    setPriceRange([0, 200]);
    setDepartureTime([0, 24]);
    setArrivalTime([0, 24]);
    setStopFilters({ noStop: true, oneStop: true });
    setSortBy("price-low");
  };
  
  const formatTime = (hour: number) => {
    const h = Math.floor(hour);
    const m = Math.round((hour - h) * 60);
    return `${h.toString().padStart(1, '0')}:${m.toString().padStart(2, '0')}:00`;
  };

  // Helper function to get alternate image from other tours
  const getAlternateImage = (currentTourName: string) => {
    // Use images from other tours (Culinary Food Tasting Experience or Mountain Hiking Adventure)
    const alternateImages: Record<string, string> = {
      "Museum and Art Gallery Tour": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format", // Culinary Food Tasting
      "Historic Walking Tour of Old Town": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format", // Mountain Hiking
    };
    
    // Return alternate image if tour name matches
    if (alternateImages[currentTourName]) {
      return alternateImages[currentTourName];
    }
    
    // Fallback: find any other tour with an image
    const alternateTour = mockTours.find(tour => 
      tour.name !== currentTourName && (tour.image || tour.imageUrl)
    );
    return alternateTour?.image || alternateTour?.imageUrl || "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format";
  };
  
  // Get booking details from searchData or use defaults
  const getBookingDetails = (tour: any) => {
    const adultCount = popupAdultCount;
    const childCount = popupChildCount;
    const date = popupDate;
    const childPrice = tour.price * 0.7; // 70% of adult price
    const totalPrice = (adultCount * tour.price) + (childCount * childPrice);
    
    return {
      adultCount,
      childCount,
      date,
      price: totalPrice,
    };
  };
  
  const handleOpenPopup = (tour: any) => {
    setSelectedTourForPopup(tour);
    const restrictions = tour.ticketRestrictions || "both";
    const isAdultOnly = restrictions === "adult-only";
    const isChildOnly = restrictions === "child-only";
    
    // Initialize with searchData or defaults, respecting restrictions
    let adultCount = searchData?.tickets?.adult || 2;
    let childCount = searchData?.tickets?.child || 0;
    
    if (isAdultOnly) {
      adultCount = adultCount || 1;
      childCount = 0;
    } else if (isChildOnly) {
      adultCount = 0;
      childCount = childCount || 1;
    }
    
    setPopupAdultCount(adultCount);
    setPopupChildCount(childCount);
    setPopupDate(searchData?.date ? new Date(searchData.date) : undefined);
    setShowBookingPopup(true);
  };

  const filteredTours = mockTours.filter(
    (tour) => tour.price >= priceRange[0] && tour.price <= priceRange[1]
  );

  const handleSelectTour = (tourId: number) => {
    setSelectedTour(tourId);
    const tour = mockTours.find((t) => t.id === tourId);
    if (tour) {
      handleOpenPopup(tour);
    }
  };

  const handleConfirmBooking = () => {
    const tour = mockTours.find((t) => t.id === selectedTour);
    if (tour) {
      const bookingDetails = {
        adultCount: popupAdultCount,
        childCount: popupChildCount,
        date: popupDate,
        price: getBookingDetails(tour).price,
      };
      onNext({ 
        tour,
        bookingDetails 
      });
      setShowBookingPopup(false);
    }
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
          <Card className="p-0 lg:sticky lg:top-8 border border-border/40 bg-background overflow-hidden">
            {/* Filter Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-foreground" />
                <span className="text-sm font-semibold text-foreground">Filter</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear filter
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-8 w-8"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sort Section */}
            <div className="px-4 py-3 border-b border-border/30">
              <Label className="text-sm font-semibold text-foreground mb-2 block">Sort</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 text-sm">
                  <SelectValue placeholder="Price (Lowest)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price (Lowest)</SelectItem>
                  <SelectItem value="price-high">Price (Highest)</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Section */}
            <div className="border-b border-border/30">
              <button 
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <span className="text-sm font-semibold text-foreground">Price</span>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", expandedSections.price && "rotate-180")} />
              </button>
              {expandedSections.price && (
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-primary">AED {priceRange[0]}</span>
                    <span className="text-xs text-primary">AED {priceRange[1]}</span>
                  </div>
                  <Slider 
                    value={priceRange} 
                    onValueChange={setPriceRange} 
                    min={0} 
                    max={200} 
                    step={5} 
                    className="w-full" 
                  />
                  <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                    <span>150</span>
                    <span>200</span>
                  </div>
                </div>
              )}
            </div>

            {/* Departure Time Section */}
            <div className="border-b border-border/30">
              <button 
                onClick={() => toggleSection('departure')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <span className="text-sm font-semibold text-foreground">Departure time</span>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", expandedSections.departure && "rotate-180")} />
              </button>
              {expandedSections.departure && (
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-foreground">{formatTime(departureTime[0])}</span>
                    <span className="text-xs text-foreground">{formatTime(departureTime[1])}</span>
                  </div>
                  <Slider 
                    value={departureTime} 
                    onValueChange={setDepartureTime} 
                    min={0} 
                    max={24} 
                    step={0.5} 
                    className="w-full" 
                  />
                  <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
                    <span>0:00:00</span>
                    <span>5:30:00</span>
                    <span>12:00:00</span>
                    <span>18:30:00</span>
                    <span>24:00:00</span>
                  </div>
                </div>
              )}
            </div>

            {/* Arrival Time Section */}
            <div className="border-b border-border/30">
              <button 
                onClick={() => toggleSection('arrival')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <span className="text-sm font-semibold text-foreground">Arrival Time</span>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", expandedSections.arrival && "rotate-180")} />
              </button>
              {expandedSections.arrival && (
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-foreground">{formatTime(arrivalTime[0])}</span>
                    <span className="text-xs text-foreground">{formatTime(arrivalTime[1])}</span>
                  </div>
                  <Slider 
                    value={arrivalTime} 
                    onValueChange={setArrivalTime} 
                    min={0} 
                    max={24} 
                    step={0.5} 
                    className="w-full" 
                  />
                  <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
                    <span>0:00:00</span>
                    <span>5:30:00</span>
                    <span>12:00:00</span>
                    <span>18:30:00</span>
                    <span>24:00:00</span>
                  </div>
                </div>
              )}
            </div>

            {/* Stops Section */}
            <div>
              <button 
                onClick={() => toggleSection('stops')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <span className="text-sm font-semibold text-foreground">Stops</span>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", expandedSections.stops && "rotate-180")} />
              </button>
              {expandedSections.stops && (
                <div className="px-4 pb-4 space-y-3">
                  {/* 0 Stop */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="no-stop"
                        checked={stopFilters.noStop}
                        onCheckedChange={(checked) => setStopFilters(prev => ({ ...prev, noStop: !!checked }))}
                        className="h-4 w-4 border-primary data-[state=checked]:bg-primary"
                      />
                      <label htmlFor="no-stop" className="text-sm text-foreground cursor-pointer">
                        0 Stop(s)
                      </label>
                      <span className="text-xs text-primary font-medium">Only</span>
                    </div>
                    <span className="text-sm text-foreground">AED 905</span>
                  </div>
                  
                  {/* 1 Stop */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="one-stop"
                        checked={stopFilters.oneStop}
                        onCheckedChange={(checked) => setStopFilters(prev => ({ ...prev, oneStop: !!checked }))}
                        className="h-4 w-4 border-primary data-[state=checked]:bg-primary"
                      />
                      <label htmlFor="one-stop" className="text-sm text-foreground cursor-pointer">
                        1 Stop(s)
                      </label>
                      <span className="text-xs text-primary font-medium">Only</span>
                    </div>
                    <span className="text-sm text-foreground">AED 630</span>
                  </div>
                </div>
              )}
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
                        // For specific tours, use other tour's image instead of placeholder
                        if (tour.name === "Museum and Art Gallery Tour" || tour.name === "Historic Walking Tour of Old Town") {
                          target.src = getAlternateImage(tour.name);
                        } else {
                          target.src = `https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(tour.name)}`;
                        }
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
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Booking Details Popup */}
      <Dialog open={showBookingPopup} onOpenChange={setShowBookingPopup}>
        <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
          {selectedTourForPopup && (() => {
            const bookingDetails = getBookingDetails(selectedTourForPopup);
            const restrictions = selectedTourForPopup.ticketRestrictions || "both";
            const isAdultOnly = restrictions === "adult-only";
            const isChildOnly = restrictions === "child-only";
            const allowBoth = restrictions === "both";
            
            return (
              <div className="space-y-3 py-2">
                {/* Selected Park */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border border-accent-blue/20">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-indigo/20">
                    <MapPin className="h-4 w-4 text-accent-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Selected Park</p>
                    <p className="text-base font-bold text-foreground truncate">{selectedTourForPopup.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{selectedTourForPopup.location}</p>
                  </div>
                </div>

                {/* Ticket Restrictions Info */}
                {(isAdultOnly || isChildOnly) && (
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber/10 border border-amber/20">
                    <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground">
                      {isAdultOnly && "This park only allows adult tickets."}
                      {isChildOnly && "This park only allows child tickets."}
                    </p>
                  </div>
                )}

                {/* Date & Pax Count - Single Row */}
                <div className="flex items-end justify-between gap-4">
                  {/* Date */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-semibold text-foreground uppercase">Date</span>
                    </div>
                    <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-8 w-32 justify-start text-left text-xs font-normal",
                            !popupDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-3.5 w-3.5" />
                          {popupDate ? format(popupDate, "MMM dd, yyyy") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={popupDate}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          onSelect={(date) => {
                            setPopupDate(date);
                            setDatePopoverOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Adult Count */}
                  <div className={cn(
                    "flex flex-col items-center",
                    isChildOnly && "opacity-50"
                  )}>
                    <span className="text-xs font-semibold text-foreground mb-2">Adults</span>
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button
                        type="button"
                        className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:bg-muted/50 border-r disabled:opacity-50"
                        onClick={() => setPopupAdultCount(Math.max(0, popupAdultCount - 1))}
                        disabled={isChildOnly || popupAdultCount === 0}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-foreground">{popupAdultCount}</span>
                      <button
                        type="button"
                        className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:bg-muted/50 border-l disabled:opacity-50"
                        onClick={() => setPopupAdultCount(popupAdultCount + 1)}
                        disabled={isChildOnly}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Child Count */}
                  <div className={cn(
                    "flex flex-col items-center",
                    isAdultOnly && "opacity-50"
                  )}>
                    <span className="text-xs font-semibold text-foreground mb-2">Children</span>
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button
                        type="button"
                        className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:bg-muted/50 border-r disabled:opacity-50"
                        onClick={() => setPopupChildCount(Math.max(0, popupChildCount - 1))}
                        disabled={isAdultOnly || popupChildCount === 0}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-foreground">{popupChildCount}</span>
                      <button
                        type="button"
                        className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:bg-muted/50 border-l disabled:opacity-50"
                        onClick={() => setPopupChildCount(popupChildCount + 1)}
                        disabled={isAdultOnly}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="p-3 rounded-lg bg-gradient-to-r from-emerald/10 to-emerald/5 border border-emerald/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Total Price</p>
                      <p className="text-sm text-muted-foreground">
                        ${selectedTourForPopup.price} per adult, ${(selectedTourForPopup.price * 0.7).toFixed(0)} per child
                      </p>
                    </div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                      ${bookingDetails.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowBookingPopup(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmBooking}
                    disabled={(popupAdultCount === 0 && popupChildCount === 0) || !popupDate}
                    className="flex-1 bg-gradient-to-r from-accent-blue to-accent-indigo hover:from-accent-blue/90 hover:to-accent-indigo/90"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchResults;
