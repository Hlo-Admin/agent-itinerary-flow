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
import { Star, Clock, MapPin, CheckCircle2, Sparkles, TrendingUp, Filter, X, Calendar, Users, DollarSign, Plus, Minus, AlertCircle, ChevronDown, Check, Heart, ArrowLeft } from "lucide-react";
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
  const [favorites, setFavorites] = useState<number[]>([]);

  // Toggle favorite
  const toggleFavorite = (tourId: number) => {
    setFavorites((prev) =>
      prev.includes(tourId)
        ? prev.filter((id) => id !== tourId)
        : [...prev, tourId]
    );
  };

  const isFavorite = (tourId: number) => favorites.includes(tourId);
  const [selectedTourForPopup, setSelectedTourForPopup] = useState<any>(null);
  const [popupAdultCount, setPopupAdultCount] = useState(2);
  const [popupChildCount, setPopupChildCount] = useState(0);
  const [popupDate, setPopupDate] = useState<Date | undefined>(undefined);
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  
  // New filter states
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true
  });
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  const clearFilters = () => {
    setPriceRange([0, 200]);
    setCategoryFilter("all");
    setSortBy("price-low");
  };

  // Map category filter values to tour categories
  const categoryFilterMap: Record<string, string[]> = {
    all: [],
    "themes-adventure": ["Outdoor", "Adventure", "Theme"],
    "public-green": ["Park", "Nature"],
    "landmarks-observation": ["Landmark", "Observation", "History"],
    "family-entertainment": ["Food Tours", "Entertainment", "Food"],
    "cultural-heritage": ["Museums", "History", "Cultural", "Museum"],
    "animal-nature": ["Nature", "Wildlife", "Animal"],
    cruises: ["Cruise", "Boat"],
    "water-parks": ["Water"],
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

  const filteredTours = mockTours.filter((tour) => {
    const priceMatch = tour.price >= priceRange[0] && tour.price <= priceRange[1];
    
    let categoryMatch = true;
    if (categoryFilter !== "all") {
      const mappedCategories = categoryFilterMap[categoryFilter] || [];
      if (mappedCategories.length > 0) {
        categoryMatch = mappedCategories.some((cat) =>
          tour.category.toLowerCase().includes(cat.toLowerCase())
        );
      }
    }
    
    return priceMatch && categoryMatch;
  });

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
    <div className="space-y-3 sm:space-y-6 w-full min-w-0 max-w-full overflow-hidden -mx-2 sm:-mx-3 md:-mx-3 px-2 sm:px-3 md:px-3 py-2 sm:py-3 md:py-3" style={{ backgroundColor: '#f1f5f9' }}>
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

            {/* Category Section */}
            <div className="border-b border-border/30">
              <button 
                onClick={() => toggleSection('category')}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <span className="text-sm font-semibold text-foreground">Category</span>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", expandedSections.category && "rotate-180")} />
              </button>
              {expandedSections.category && (
                <div className="px-4 pb-4">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-10 text-sm">
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
                    </SelectContent>
                  </Select>
                </div>
              )}
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
          </Card>
        </div>

        {/* Results List - Tiles */}
        <div className="lg:col-span-9 w-full min-w-0 max-w-full overflow-hidden">
          <div className="space-y-3 sm:space-y-4 w-full min-w-0 max-w-full">
            {filteredTours.map((tour, index) => {
              const isActive = selectedTour === tour.id;
              const colorMap: Record<string, string> = {
                "accent-blue": "bg-accent-blue",
                "accent-cyan": "bg-accent-cyan",
                "accent-teal": "bg-accent-teal",
                "accent-purple": "bg-accent-purple",
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
                  <div className="relative w-32 sm:w-48 md:w-64 h-32 sm:h-48 flex-shrink-0 overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
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
                      `${gradientClass}`
                    )}>
                      {tour.category}
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 bg-accent-blue/10 border-2 border-accent-blue/50 z-20 animate-pulse-glow" />
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="relative flex flex-1 flex-col justify-between p-4 sm:p-6 min-w-0 bg-background">
                    {/* Favorite Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "absolute top-2 right-2 sm:top-3 sm:right-3 h-8 w-8 sm:h-9 sm:w-9 rounded-full transition-all duration-300 z-10",
                        isFavorite(tour.id)
                          ? "bg-rose-500 hover:bg-rose-600 text-white shadow-lg"
                          : "bg-muted/80 hover:bg-rose-100 text-muted-foreground hover:text-rose-500"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(tour.id);
                      }}
                    >
                      <Heart className={cn(
                        "h-4 w-4 sm:h-5 sm:w-5",
                        isFavorite(tour.id) && "fill-white"
                      )} />
                      <span className="sr-only">
                        {isFavorite(tour.id) ? "Remove from favorites" : "Add to favorites"}
                      </span>
                    </Button>
                    <div className="space-y-2 sm:space-y-3 min-w-0 flex-1 pr-10">
                      <div className="space-y-1.5 sm:space-y-2 min-w-0">
                        <h4 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-accent-blue transition-all duration-300 leading-tight line-clamp-2 break-words">
                          {tour.name}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border/30 mt-2 sm:mt-3 min-w-0">
                      <div className="flex items-center gap-2 min-w-0 flex-1 px-2 py-1.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20">
                        <div className="p-1 rounded-lg bg-accent-blue/20 flex-shrink-0">
                          <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent-blue" />
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                          <span className="font-bold text-foreground">{tour.suppliers}</span> supplier{tour.suppliers > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-blue">${tour.price}</p>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground font-semibold">per person</p>
                      </div>
                      <Button 
                          size="sm" 
                          className={cn(
                            "h-8 sm:h-9 px-3 sm:px-4 font-bold text-[10px] sm:text-xs transition-all duration-300",
                            isActive
                              ? "bg-accent-blue shadow-lg shadow-accent-blue/30 hover:shadow-xl hover:shadow-accent-blue/40"
                              : "bg-accent-blue hover:bg-accent-blue/90 shadow-md hover:shadow-lg"
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

      {/* Previous Button */}
      <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-between mt-6">
        <Button 
          onClick={onBack} 
          className="!bg-gray-500 hover:!bg-gray-600 !text-white border-0 shadow-none"
          style={{ backgroundColor: '#6C757D', backgroundImage: 'none' }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
      </div>

      {/* Booking Details Popup */}
      <Dialog open={showBookingPopup} onOpenChange={setShowBookingPopup}>
        <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto booking-popup-dialog">
          {selectedTourForPopup && (() => {
            const bookingDetails = getBookingDetails(selectedTourForPopup);
            const restrictions = selectedTourForPopup.ticketRestrictions || "both";
            const isAdultOnly = restrictions === "adult-only";
            const isChildOnly = restrictions === "child-only";
            const allowBoth = restrictions === "both";
            
            return (
              <div className="space-y-3 py-2">
                {/* Selected Park */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-accent-blue/10 border border-accent-blue/20">
                  <div className="p-1.5 rounded-lg bg-accent-blue/20">
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
                <div className="p-3 rounded-lg bg-emerald/10 border border-emerald/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Total Price</p>
                      <p className="text-sm text-muted-foreground">
                        ${selectedTourForPopup.price} per adult, ${(selectedTourForPopup.price * 0.7).toFixed(0)} per child
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600">
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
                    className="flex-1 bg-accent-blue hover:bg-accent-blue/90"
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
