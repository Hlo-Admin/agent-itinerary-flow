import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Star, Clock, MapPin, CheckCircle2, Sparkles, TrendingUp, Filter, X, Calendar, Users, DollarSign, Plus, Minus, AlertCircle } from "lucide-react";
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
  const [sortBy, setSortBy] = useState("popular");
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [selectedTourForPopup, setSelectedTourForPopup] = useState<any>(null);
  const [popupAdultCount, setPopupAdultCount] = useState(2);
  const [popupChildCount, setPopupChildCount] = useState(0);
  const [popupTimeSlot, setPopupTimeSlot] = useState("10:00 AM");
  
  // Mock time slots
  const timeSlots = [
    { id: "09:00", label: "09:00 AM", type: "normal" },
    { id: "10:00", label: "10:00 AM", type: "normal" },
    { id: "11:00", label: "11:00 AM", type: "premium" },
    { id: "14:00", label: "02:00 PM", type: "normal" },
    { id: "15:00", label: "03:00 PM", type: "premium" },
    { id: "16:00", label: "04:00 PM", type: "normal" },
    { id: "17:00", label: "05:00 PM", type: "premium" },
  ];

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
    const timeSlot = popupTimeSlot;
    const childPrice = tour.price * 0.7; // 70% of adult price
    const totalPrice = (adultCount * tour.price) + (childCount * childPrice);
    
    return {
      adultCount,
      childCount,
      timeSlot,
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
    setPopupTimeSlot(searchData?.selectedTimeSlot || searchData?.selectedTime || "10:00 AM");
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
        timeSlot: popupTimeSlot,
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
                    <SelectItem value="themes-adventure">Themes & Adventure Parks</SelectItem>
                    <SelectItem value="public-green">Public & Green Parks</SelectItem>
                    <SelectItem value="landmarks-observation">Land Marks & Observation Decks</SelectItem>
                    <SelectItem value="family-entertainment">Family Entertainment + Food Shows & Malls</SelectItem>
                    <SelectItem value="cultural-heritage">Cultural + Heritage Museums</SelectItem>
                    <SelectItem value="animal-nature">Animal & Nature Parks</SelectItem>
                    <SelectItem value="cruises">Cruises</SelectItem>
                    <SelectItem value="water-parks">Water Parks</SelectItem>
                    <SelectItem value="beach-marina">Beach & Marina Parks</SelectItem>
                    <SelectItem value="desert-safaris">Desert Safaris & Adventures</SelectItem>
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

      {/* Booking Details Popup */}
      <Dialog open={showBookingPopup} onOpenChange={setShowBookingPopup}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Booking Summary</DialogTitle>
            <DialogDescription>
              Review and update your booking details
            </DialogDescription>
          </DialogHeader>
          
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

                {/* Time Slot Selection */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Time Slot</Label>
                  <Select value={popupTimeSlot} onValueChange={setPopupTimeSlot}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.id} value={slot.label}>
                          {slot.label} {slot.type === "premium" && "(Premium)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pax Count Selection */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pax Count</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Adult Count */}
                    <div className={cn(
                      "p-3 rounded-lg border",
                      isChildOnly ? "bg-muted/50 border-muted opacity-50" : "bg-gradient-to-r from-purple/10 to-purple/5 border-purple/20"
                    )}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-foreground">Adults</span>
                        {isChildOnly && (
                          <AlertCircle className="h-3 w-3 text-amber-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setPopupAdultCount(Math.max(0, popupAdultCount - 1))}
                          disabled={isChildOnly || popupAdultCount === 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="flex-1 text-center text-lg font-bold text-foreground">{popupAdultCount}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setPopupAdultCount(popupAdultCount + 1)}
                          disabled={isChildOnly}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Child Count */}
                    <div className={cn(
                      "p-3 rounded-lg border",
                      isAdultOnly ? "bg-muted/50 border-muted opacity-50" : "bg-gradient-to-r from-purple/10 to-purple/5 border-purple/20"
                    )}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-foreground">Children</span>
                        {isAdultOnly && (
                          <AlertCircle className="h-3 w-3 text-amber-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setPopupChildCount(Math.max(0, popupChildCount - 1))}
                          disabled={isAdultOnly || popupChildCount === 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="flex-1 text-center text-lg font-bold text-foreground">{popupChildCount}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setPopupChildCount(popupChildCount + 1)}
                          disabled={isAdultOnly}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border/30">
                    <span className="text-xs font-semibold text-foreground">Total Pax</span>
                    <span className="text-lg font-bold text-primary">{popupAdultCount + popupChildCount}</span>
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
                    disabled={(popupAdultCount === 0 && popupChildCount === 0) || !popupTimeSlot}
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
