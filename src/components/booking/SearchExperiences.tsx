import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Search, MapPin, Calendar, Sparkles, Ticket, Trees, Building2, Utensils, ShoppingBag, BookOpen, Landmark, PawPrint, Ship, Waves, Umbrella, Mountain, Compass, Star, Clock, CheckCircle2, TrendingUp, Filter, X, Plus, Minus, AlertCircle, CalendarDays, Heart, History, Eye, Users } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { format } from "date-fns";

interface SearchExperiencesProps {
  onNext: (data: any) => void;
  searchData?: any;
}

const categories = [
  { name: "Themes & Adventure Parks", icon: Ticket, color: "accent-purple" },
  { name: "Public & Green Parks", icon: Trees, color: "accent-emerald" },
  { name: "Land Marks & Observation Decks", icon: Building2, color: "accent-blue" },
  { name: "Family Entertainment + Food Shows & Malls", icon: ShoppingBag, color: "accent-cyan" },
  { name: "Cultural + Heritage Museums", icon: BookOpen, color: "accent-indigo" },
  { name: "Animal & Nature Parks", icon: PawPrint, color: "accent-teal" },
  { name: "Cruises", icon: Ship, color: "accent-blue" },
  { name: "Water Parks", icon: Waves, color: "accent-cyan" },
];

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
    ticketRestrictions: "both",
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

// Mock destination suggestions
const destinationSuggestions = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ras Al Khaimah",
  "Fujairah",
  "Burj Khalifa",
  "Palm Jumeirah",
  "Dubai Mall",
  "Dubai Marina",
  "Jumeirah Beach",
  "Desert Safari",
  "Dubai Aquarium",
  "IMG Worlds",
  "Dubai Parks",
  "Global Village",
];

const SearchExperiences = ({ onNext, searchData }: SearchExperiencesProps) => {
  const [destination, setDestination] = useState(searchData?.destination || "");
  const [date, setDate] = useState<Date | undefined>(searchData?.date ? new Date(searchData.date) : undefined);
  const [searchCategory, setSearchCategory] = useState(searchData?.searchCategory || "all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchData?.categories || []);
  const [hasSearched, setHasSearched] = useState(!!(searchData?.destination || searchData?.date));
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
  const [popupDate, setPopupDate] = useState<Date | undefined>(searchData?.date ? new Date(searchData.date) : undefined);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritesPriceRange, setFavoritesPriceRange] = useState([0, 200]);
  const [favoritesCategoryFilter, setFavoritesCategoryFilter] = useState("all");
  const [favoritesSortBy, setFavoritesSortBy] = useState("popular");
  const [showFavoritesFilters, setShowFavoritesFilters] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [selectedBookingForView, setSelectedBookingForView] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock recent bookings data (park-related)
  const recentBookings = [
    { sno: 1, refNo: "BK-2024-001", leadPaxName: "VISHNU PRASATH", parkName: "Dubai Parks & Resorts", bookingDate: "2025-Dec-20", eventDate: "2025-Dec-25", status: "Booked" },
    { sno: 2, refNo: "BK-2024-002", leadPaxName: "AHMED KHAN", parkName: "IMG Worlds of Adventure", bookingDate: "2025-Dec-19", eventDate: "2025-Dec-24", status: "Booked" },
    { sno: 3, refNo: "BK-2024-003", leadPaxName: "SARA AHMED", parkName: "Atlantis Aquaventure", bookingDate: "2025-Dec-18", eventDate: "2025-Dec-23", status: "Booked" },
    { sno: 4, refNo: "BK-2024-004", leadPaxName: "JOHN MILLER", parkName: "Global Village", bookingDate: "2025-Dec-17", eventDate: "2025-Dec-22", status: "Booked" },
    { sno: 5, refNo: "BK-2024-005", leadPaxName: "FATIMA ALI", parkName: "Ferrari World Abu Dhabi", bookingDate: "2025-Dec-16", eventDate: "2025-Dec-21", status: "Booked" },
    { sno: 6, refNo: "BK-2024-006", leadPaxName: "RAJESH KUMAR", parkName: "Ski Dubai", bookingDate: "2025-Dec-15", eventDate: "2025-Dec-20", status: "Booked" },
    { sno: 7, refNo: "BK-2024-007", leadPaxName: "MARIA SANTOS", parkName: "Wild Wadi Waterpark", bookingDate: "2025-Dec-14", eventDate: "2025-Dec-19", status: "Booked" },
    { sno: 8, refNo: "BK-2024-008", leadPaxName: "MICHAEL CHEN", parkName: "Warner Bros. World", bookingDate: "2025-Dec-13", eventDate: "2025-Dec-18", status: "Booked" },
    { sno: 9, refNo: "BK-2024-009", leadPaxName: "EMMA WILLIAMS", parkName: "Yas Waterworld", bookingDate: "2025-Dec-12", eventDate: "2025-Dec-17", status: "Booked" },
    { sno: 10, refNo: "BK-2024-010", leadPaxName: "JAMES BROWN", parkName: "Legoland Dubai", bookingDate: "2025-Dec-11", eventDate: "2025-Dec-16", status: "Booked" },
  ];

  const handleViewBooking = (booking: any) => {
    setSelectedBookingForView(booking);
    setShowBookingConfirmation(true);
  };
  
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
    const alternateImages: Record<string, string> = {
      "Museum and Art Gallery Tour": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
      "Historic Walking Tour of Old Town": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format",
    };
    
    if (alternateImages[currentTourName]) {
      return alternateImages[currentTourName];
    }
    
    const alternateTour = mockTours.find(tour => 
      tour.name !== currentTourName && tour.image
    );
    return alternateTour?.image || "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format";
  };
  
  const getBookingDetails = (tour: any) => {
    const adultCount = popupAdultCount;
    const childCount = popupChildCount;
    const timeSlot = popupTimeSlot;
    const childPrice = tour.price * 0.7;
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
    
    let adultCount = searchData?.tickets?.adult || searchData?.bookingDetails?.adultCount || 2;
    let childCount = searchData?.tickets?.child || searchData?.bookingDetails?.childCount || 0;
    
    if (isAdultOnly) {
      adultCount = adultCount || 1;
      childCount = 0;
    } else if (isChildOnly) {
      adultCount = 0;
      childCount = childCount || 1;
    }
    
    setPopupAdultCount(adultCount);
    setPopupChildCount(childCount);
    setPopupTimeSlot(searchData?.selectedTimeSlot || searchData?.bookingDetails?.timeSlot || searchData?.selectedTime || "10:00 AM");
    setPopupDate(searchData?.date ? new Date(searchData.date) : date);
    setShowBookingPopup(true);
  };

  // Map category filter values to tour categories
  const categoryFilterMap: Record<string, string[]> = {
    "all": [],
    "themes-adventure": ["Outdoor", "Adventure", "Theme"],
    "public-green": ["Park", "Nature"],
    "landmarks-observation": ["Landmark", "Observation", "History"],
    "family-entertainment": ["Food Tours", "Entertainment", "Food"],
    "cultural-heritage": ["Museums", "History", "Cultural", "Museum"],
    "animal-nature": ["Nature", "Wildlife", "Animal"],
    "cruises": ["Cruise", "Boat"],
    "water-parks": ["Water"],
    "beach-marina": ["Beach", "Marina"],
    "desert-safaris": ["Safari", "Adventure", "Outdoor"],
  };

  // Map category names to tour categories for the new category dropdown
  const categoryNameToTourCategories: Record<string, string[]> = {
    "all": [],
    "Themes & Adventure Parks": ["Outdoor", "Adventure", "Theme"],
    "Public & Green Parks": ["Park", "Nature"],
    "Land Marks & Observation Decks": ["Landmark", "Observation", "History"],
    "Family Entertainment + Food Shows & Malls": ["Food Tours", "Food", "Entertainment"],
    "Cultural + Heritage Museums": ["Museums", "History", "Cultural", "Museum"],
    "Animal & Nature Parks": ["Nature", "Animal", "Wildlife"],
    "Cruises": ["Cruise", "Boat"],
    "Water Parks": ["Water"],
  };

  // Safe category selection handler
  const handleCategoryChange = (value: string) => {
    try {
      setSelectedCategory(value);
    } catch (error) {
      console.error("Error changing category:", error);
      setSelectedCategory("all");
    }
  };

  // Filter tours based on category, price range, and selected categories from quick filters
  const filteredTours = mockTours
    .filter((tour) => {
      // Price range filter
      const priceMatch = tour.price >= priceRange[0] && tour.price <= priceRange[1];
      
      // Category filter from new dropdown (next to search field)
      let newCategoryMatch = true;
      if (selectedCategory && selectedCategory !== "all") {
        try {
          const mappedCategories = categoryNameToTourCategories[selectedCategory] || [];
          if (mappedCategories.length > 0) {
            newCategoryMatch = mappedCategories.some((cat) => {
              const tourCategoryLower = (tour.category || "").toLowerCase();
              const mappedCatLower = (cat || "").toLowerCase();
              return tourCategoryLower.includes(mappedCatLower) || mappedCatLower.includes(tourCategoryLower);
            });
          }
        } catch (error) {
          // If there's any error in filtering, show all results
          console.error("Error in category filtering:", error);
          newCategoryMatch = true;
        }
      }
      
      // Category filter from dropdown
      let categoryMatch = true;
      if (categoryFilter !== "all") {
        const mappedCategories = categoryFilterMap[categoryFilter] || [];
        if (mappedCategories.length > 0) {
          categoryMatch = mappedCategories.some((cat) => 
            tour.category.toLowerCase().includes(cat.toLowerCase())
          );
        }
      }
      
      // Selected categories from quick filters (if any are selected)
      let quickFilterMatch = true;
      if (selectedCategories.length > 0) {
        // Check if tour category matches any of the selected quick filter categories
        // We'll use a simple matching logic - you can refine this based on your needs
        quickFilterMatch = selectedCategories.some((selectedCat) => {
          // Map quick filter category names to tour categories
          const quickFilterMap: Record<string, string[]> = {
            "Themes & Adventure Parks": ["Outdoor", "Adventure", "Theme"],
            "Public & Green Parks": ["Park", "Nature"],
            "Land Marks & Observation Decks": ["Landmark", "Observation", "History"],
            "Family Entertainment + Food Shows & Malls": ["Food Tours", "Food", "Entertainment"],
            "Cultural + Heritage Museums": ["Museums", "History", "Cultural", "Museum"],
            "Animal & Nature Parks": ["Nature", "Animal", "Wildlife"],
            "Cruises": ["Cruise", "Boat"],
            "Water Parks": ["Water"],
          };
          
          const mappedCats = quickFilterMap[selectedCat] || [];
          return mappedCats.some((cat) => 
            tour.category.toLowerCase().includes(cat.toLowerCase())
          );
        });
      }
      
      return priceMatch && categoryMatch && quickFilterMatch && newCategoryMatch;
    })
    .sort((a, b) => {
      // Sort based on sortBy value
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
        default:
          // Sort by reviews count (most popular)
          return b.reviews - a.reviews;
      }
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
        timeSlot: popupTimeSlot,
        price: getBookingDetails(tour).price,
      };
      onNext({ 
        destination,
        date: popupDate ? format(popupDate, 'yyyy-MM-dd') : (date ? format(date, 'yyyy-MM-dd') : ''),
        categories: selectedCategories,
        tour,
        bookingDetails: {
          ...bookingDetails,
          date: popupDate ? format(popupDate, 'yyyy-MM-dd') : (date ? format(date, 'yyyy-MM-dd') : ''),
          timeSlot: popupTimeSlot,
        }
      });
      setShowBookingPopup(false);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleFavorite = (tourId: number) => {
    setFavorites((prev) =>
      prev.includes(tourId)
        ? prev.filter((id) => id !== tourId)
        : [...prev, tourId]
    );
  };

  const isFavorite = (tourId: number) => favorites.includes(tourId);

  const favoriteTours = mockTours.filter((tour) => favorites.includes(tour.id));

  const handleSearch = () => {
    // Navigate to results screen
    onNext({
      destination,
      date: date ? format(date, 'yyyy-MM-dd') : '',
      searchCategory: selectedCategory,
      categories: selectedCategories,
      searchPerformed: true,
    });
  };

  // Filter destination suggestions based on input
  const filteredDestinations = destination
    ? destinationSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(destination.toLowerCase())
      )
    : destinationSuggestions;

  const colorMap: Record<string, string> = {
    "accent-blue": "from-accent-blue/90 to-accent-indigo/90",
    "accent-cyan": "from-accent-cyan/90 to-accent-teal/90",
    "accent-teal": "from-accent-teal/90 to-accent-emerald/90",
    "accent-purple": "from-accent-purple/90 to-accent-pink/90",
  };

  return (
    <div className="space-y-2 sm:space-y-3 w-full min-w-0 max-w-full animate-fade-in">
      {/* Search Criteria - First Section */}
      <Card className="p-3 sm:p-4 md:p-5 border border-border/20 bg-gradient-to-br from-background via-background to-primary/5 w-full min-w-0 max-w-full box-border hover-lift shadow-sm" style={{ overflow: 'visible' }}>
        <div className="flex items-center justify-between gap-2 sm:gap-3 w-full min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h3 className="text-base sm:text-md text-foreground tracking-tight whitespace-nowrap flex-shrink-0">Find Experiences</h3>
            <div className="flex items-center gap-2 min-w-0">
            <Popover open={showDestinationDropdown && destination.length > 0} onOpenChange={setShowDestinationDropdown}>
              <PopoverTrigger asChild>
                <div className="relative w-48 sm:w-64 md:w-72 min-w-0 flex-shrink-0">
            <Input
                    ref={inputRef}
              id="destination"
              placeholder="Search by city or attraction"
              value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      setShowDestinationDropdown(true);
                    }}
                    onFocus={() => {
                      if (destination.length > 0) {
                        setShowDestinationDropdown(true);
                      }
                    }}
                    className="h-9 sm:h-10 text-sm w-full min-w-0 box-border pr-8"
                  />
                  {destination && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDestination("");
                        setShowDestinationDropdown(false);
                        setSelectedCategory("all");
                        inputRef.current?.focus();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
          </div>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command>
                  <CommandList>
                    <CommandEmpty>No destinations found.</CommandEmpty>
                    <CommandGroup>
                      {filteredDestinations.slice(0, 8).map((suggestion) => (
                        <CommandItem
                          key={suggestion}
                          value={suggestion}
                          onSelect={() => {
                            setDestination(suggestion);
                            setShowDestinationDropdown(false);
                            inputRef.current?.blur();
                          }}
                          className="cursor-pointer"
                        >
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          {suggestion}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            <Select value={selectedCategory} onValueChange={handleCategoryChange} disabled={!destination.trim()}>
              <SelectTrigger className={cn(
                "h-9 sm:h-10 w-36 sm:w-44 md:w-48 text-sm min-w-0 flex-shrink-0",
                !destination.trim() && "opacity-50 cursor-not-allowed"
              )}>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFavorites(!showFavorites)}
            className={cn(
              "h-9 sm:h-10 px-3 sm:px-4 gap-1.5 sm:gap-2 text-xs sm:text-sm flex-shrink-0",
              showFavorites && "bg-rose-50 border-rose-200"
            )}
          >
            <Heart className={cn(
              "h-3.5 w-3.5 sm:h-4 sm:w-4",
              favorites.length > 0 ? "fill-rose-500 text-rose-500" : ""
            )} />
            <span className="hidden sm:inline">Favorite List</span>
            {favorites.length > 0 && (
              <span className="ml-0.5 text-xs font-semibold bg-rose-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                {favorites.length}
              </span>
            )}
          </Button>
        </div>
      </Card>

      {/* Quick Filters - Second Section */}
      <div className="w-full min-w-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 w-full min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-pink/20">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-purple flex-shrink-0" />
            </div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-foreground">Quick Filters</h4>
          </div>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategories([])}
              className="h-7 sm:h-8 px-2 sm:px-3 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-1 sm:gap-1.5 md:grid-cols-4 lg:grid-cols-8 w-full min-w-0 max-w-full mb-2">
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
              "accent-emerald": {
                border: "border-accent-emerald/40",
                bg: "bg-gradient-to-br from-accent-emerald/10 to-accent-teal/10",
                text: "text-accent-emerald",
                gradient: "from-accent-emerald/90 to-accent-teal/90",
              },
              "accent-indigo": {
                border: "border-accent-indigo/40",
                bg: "bg-gradient-to-br from-accent-indigo/10 to-accent-blue/10",
                text: "text-accent-indigo",
                gradient: "from-accent-indigo/90 to-accent-blue/90",
              },
              "accent-orange": {
                border: "border-orange-500/40",
                bg: "bg-gradient-to-br from-orange-500/10 to-amber-500/10",
                text: "text-orange-500",
                gradient: "from-orange-500/90 to-amber-500/90",
              },
            };
            const colorClass = colorClasses[category.color] || colorClasses["accent-blue"];
            
            return (
              <button
                key={category.name}
                type="button"
                className={cn(
                  "group relative flex flex-col items-center justify-center gap-1 sm:gap-1.5 rounded-lg border-2 bg-background p-2 sm:p-2.5 text-[9px] sm:text-[10px] font-medium text-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-md w-full min-w-0 max-w-full box-border overflow-visible animate-scale-in",
                  isSelected 
                    ? `${colorClass.border} ${colorClass.bg} shadow-md` 
                    : "border-border/30 hover:border-primary/40 hover:bg-primary/5"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => toggleCategory(category.name)}
              >
                <div className={cn(
                  "p-1 sm:p-1.5 rounded-lg transition-all duration-300 flex-shrink-0",
                  isSelected 
                    ? `bg-primary shadow-sm` 
                    : "bg-muted/50 group-hover:bg-primary/10"
                )}>
                  <Icon className={cn(
                    "h-3 w-3 sm:h-3.5 sm:w-3.5 transition-all duration-300",
                    isSelected 
                      ? "text-white"
                      : "text-muted-foreground group-hover:text-primary"
                  )} />
                </div>
                <span className="text-[9px] sm:text-[10px] text-center line-clamp-2 leading-tight">{category.name}</span>
                {isSelected && (
                  <div className="absolute -top-1 -right-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-primary flex items-center justify-center shadow-md ring-1 ring-white/50">
                    <span className="text-[7px] sm:text-[8px] text-white font-bold">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pt-0.5 sm:pt-1 w-full min-w-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <Button 
          onClick={handleSearch} 
          className="gap-2 h-10 sm:h-11 px-5 sm:px-6 text-sm font-semibold w-full sm:w-auto min-w-0 box-border shadow-md hover:shadow-lg"
          size="lg"
        >
          <Search className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">Search Experiences</span>
        </Button>
      </div>

      {/* Recent Bookings Section */}
      <Card className="mt-6 animate-fade-in border border-border/30 shadow-sm" style={{ animationDelay: '400ms' }}>
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <History className="h-4 w-4 text-primary" />
          </div>
          <h4 className="text-sm font-semibold text-foreground">Recent Bookings</h4>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">SNO</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ref No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lead Pax Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Park Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Booking Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {recentBookings.map((booking) => (
                <tr key={booking.sno} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-foreground">{booking.sno}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{booking.refNo}</td>
                  <td className="px-4 py-3 text-primary font-medium">{booking.leadPaxName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{booking.parkName}</td>
                  <td className="px-4 py-3 text-primary">{booking.bookingDate}</td>
                  <td className="px-4 py-3 text-primary">{booking.eventDate}</td>
                <td className="px-4 py-3">
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] px-2 py-0.5">
                      {booking.status.toUpperCase()}
                    </Badge>
                </td>
                <td className="px-4 py-3">
                    <button 
                      onClick={() => handleViewBooking(booking)}
                      className="p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                      title="View Booking"
                    >
                      <Eye className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Favorite List Section */}
      {showFavorites && (
        <div className="space-y-2 sm:space-y-3 w-full min-w-0 max-w-full mt-2 sm:mt-3">
          {/* Favorite List Header */}
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between w-full min-w-0">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
              <div className="space-y-0.5">
                <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">Favorite List</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {favorites.length > 0 ? (
                    <>
                      {favoriteTours.length} of <span className="font-semibold text-primary">{favorites.length}</span> favorites
                    </>
                  ) : (
                    "Your saved destinations and experiences"
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {(favoritesCategoryFilter !== "all" || favoritesPriceRange[0] !== 0 || favoritesPriceRange[1] !== 200 || favoritesSortBy !== "popular") && (
                <Button
                  onClick={() => {
                    setFavoritesCategoryFilter("all");
                    setFavoritesPriceRange([0, 200]);
                    setFavoritesSortBy("popular");
                  }}
                  variant="outline"
                  size="sm"
                  className="h-9 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1.5" />
                  Clear Filters
                </Button>
              )}
              <Button
                onClick={() => setShowFavoritesFilters(!showFavoritesFilters)}
                variant="outline"
                size="sm"
                className="lg:hidden h-9 text-xs"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-2 sm:gap-3 lg:grid-cols-12 w-full min-w-0 max-w-full">
            {/* Filters Sidebar */}
            <div className={cn(
              "lg:col-span-3",
              showFavoritesFilters ? "block fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto bg-background/95 backdrop-blur-lg lg:bg-transparent lg:backdrop-blur-none p-4 lg:p-0 overflow-y-auto" : "hidden lg:block"
            )}>
              <Card className="p-3 sm:p-4 lg:sticky lg:top-8 border border-primary/10 bg-gradient-to-br from-background to-muted/20">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-foreground">Filters</h4>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-8 w-8"
                    onClick={() => setShowFavoritesFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">Category</Label>
                    <Select value={favoritesCategoryFilter} onValueChange={setFavoritesCategoryFilter}>
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

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                        Price Range
                      </Label>
                      <span className="text-sm sm:text-base font-bold text-primary">${favoritesPriceRange[0]} - ${favoritesPriceRange[1]}</span>
                    </div>
                    <Slider value={favoritesPriceRange} onValueChange={setFavoritesPriceRange} max={200} step={10} className="w-full" />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">Sort By</Label>
                    <Select value={favoritesSortBy} onValueChange={setFavoritesSortBy}>
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

            {/* Favorite Tours List */}
            <div className="lg:col-span-9 w-full min-w-0 max-w-full overflow-hidden">
              {favoriteTours.length === 0 ? (
                <Card className="p-8 border border-border/20">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Heart className="h-12 w-12 text-muted-foreground/30 mb-4" />
                    <p className="text-base font-medium text-foreground mb-1">
                      {favorites.length === 0 ? "No favorites yet" : "No favorites match the filters"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {favorites.length === 0 
                        ? "Start adding destinations to your favorites list"
                        : "Try adjusting your filter criteria"
                      }
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="space-y-2 sm:space-y-3 w-full min-w-0 max-w-full">
              {favoriteTours.map((tour, index) => {
                const isActive = selectedTour === tour.id;
                const gradientClass = colorMap[tour.color] || colorMap["accent-blue"];
                
                return (
                  <Card
                    key={tour.id}
                    className={cn(
                      "group relative flex flex-row transition-all duration-300 hover:shadow-xl border w-full min-w-0 max-w-full box-border animate-scale-in",
                      isActive 
                        ? "border-primary border-2 shadow-lg shadow-primary/20" 
                        : "border-border/30 hover:border-primary/40 hover:shadow-md"
                    )}
                    style={{ animationDelay: `${index * 100}ms`, overflow: 'visible' }}
                  >
                    {/* Image Section */}
                    <div className="relative w-28 sm:w-40 md:w-56 h-28 sm:h-40 md:h-56 flex-shrink-0 overflow-hidden rounded-l-xl bg-gradient-to-br from-muted to-muted/50">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      <img 
                        src={tour.image} 
                        alt={tour.name} 
                        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105" 
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
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
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 z-20" />
                      )}
                    </div>
                    
                    {/* Content Section */}
                    <div className="relative flex flex-1 flex-col justify-between p-2.5 sm:p-3 min-w-0 bg-gradient-to-b from-background to-muted/10">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "absolute top-2 right-2 h-7 w-7 sm:h-8 sm:w-8 rounded-full transition-all duration-300 z-10",
                          "bg-rose-500/90 hover:bg-rose-600 text-white shadow-lg"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(tour.id);
                        }}
                      >
                        <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-white" />
                        <span className="sr-only">Remove from favorites</span>
                      </Button>
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="space-y-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-all duration-300 leading-tight line-clamp-2 break-words pr-8 sm:pr-10">
                            {tour.name} <span className="text-muted-foreground font-normal">({tour.category})</span>
                          </h4>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
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
                          <div className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg bg-emerald/5 border border-emerald/10 min-w-0">
                            <div className="p-0.5 rounded bg-emerald/10 flex-shrink-0">
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            </div>
                            <span className="text-[10px] font-medium text-foreground line-clamp-1 min-w-0">{tour.cancellation}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-1.5 sm:gap-2 pt-1.5 sm:pt-2 border-t border-border/20 mt-1.5 min-w-0">
                        <div className="flex items-center gap-1.5 min-w-0 flex-1 px-2 py-1 rounded-lg bg-primary/5 border border-primary/10">
                          <div className="p-0.5 rounded bg-primary/10 flex-shrink-0">
                            <TrendingUp className="h-3 w-3 text-primary" />
                          </div>
                          <p className="text-[10px] text-muted-foreground truncate">
                            <span className="font-semibold text-foreground">{tour.suppliers}</span> supplier{tour.suppliers > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg sm:text-xl font-bold text-primary">${tour.price}</p>
                          <p className="text-[9px] text-muted-foreground">per person</p>
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0 items-center">
                          <Button variant="outline" size="sm" className="h-8 text-[10px] border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            className={cn(
                              "h-8 px-3 font-semibold text-[10px] transition-all duration-300",
                              isActive
                                ? "bg-primary shadow-md shadow-primary/20"
                                : "bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md"
                            )}
                            onClick={() => handleSelectTour(tour.id)}
                          >
                            {isActive ? "✓" : "Select"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Booking Confirmation Popup - for viewing recent bookings */}
      <Dialog open={showBookingConfirmation} onOpenChange={setShowBookingConfirmation}>
        <DialogContent className="sm:max-w-[380px]">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Booking Confirmation
            </DialogTitle>
            <DialogDescription className="text-xs">
              Reference: {selectedBookingForView?.refNo}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBookingForView && (
            <div className="space-y-2">
              {/* Booking Status Banner */}
              <div className="flex items-center justify-center p-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
                <div className="text-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-1" />
                  <p className="text-base font-bold text-emerald-600">Booking Confirmed</p>
                  <p className="text-xs text-muted-foreground">Successfully confirmed</p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Reference No</p>
                    <p className="text-xs font-bold text-foreground">{selectedBookingForView.refNo}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Status</p>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] px-1.5 py-0.5">
                      {selectedBookingForView.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Park Name</p>
                  <p className="text-xs font-bold text-foreground">{selectedBookingForView.parkName}</p>
                </div>

                <div className="p-2 rounded-lg bg-muted/30 border border-border/30">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Lead Passenger</p>
                  <p className="text-xs font-bold text-primary">{selectedBookingForView.leadPaxName}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Booking Date</p>
                    <p className="text-xs font-medium text-foreground">{selectedBookingForView.bookingDate}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Event Date</p>
                    <p className="text-xs font-medium text-foreground">{selectedBookingForView.eventDate}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <Button
                  variant="outline"
                  onClick={() => setShowBookingConfirmation(false)}
                  className="flex-1 h-8 text-xs"
                >
                  Close
                </Button>
                <Button
                  className="flex-1 h-8 text-xs bg-gradient-to-r from-primary to-primary/90"
                >
                  Download Voucher
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Details Popup */}
      <Dialog open={showBookingPopup} onOpenChange={setShowBookingPopup}>
        <DialogContent className="sm:max-w-[600px] max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Booking Requirements</DialogTitle>
            <DialogDescription className="text-xs">
              Review and update your booking requirements
            </DialogDescription>
          </DialogHeader>
          
          {selectedTourForPopup && (() => {
            const bookingDetails = getBookingDetails(selectedTourForPopup);
            const restrictions = selectedTourForPopup.ticketRestrictions || "both";
            const isAdultOnly = restrictions === "adult-only";
            const isChildOnly = restrictions === "child-only";
            
            return (
              <div className="space-y-2 ">
                {/* Selected Park */}
                <div className="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border border-accent-blue/20">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-indigo/20">
                    <MapPin className="h-4 w-4 text-accent-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Selected Park</p>
                    <p className="text-sm font-bold text-foreground truncate">{selectedTourForPopup.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{selectedTourForPopup.location}</p>
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* Date Selection */}
                  <div className="space-y-1.5">
                    <Label htmlFor="popup-date" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-9 w-full justify-start text-left font-normal text-sm",
                            !popupDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarDays className="mr-2 h-3.5 w-3.5" />
                          {popupDate ? format(popupDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={popupDate}
                          onSelect={setPopupDate}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Slot Selection */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Time Slot</Label>
                    <Select value={popupTimeSlot} onValueChange={setPopupTimeSlot}>
                      <SelectTrigger className="h-9">
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
                </div>

                {/* Ticket Restrictions Info */}
                {(isAdultOnly || isChildOnly) && (
                  <div className="flex items-start gap-1.5 p-2 rounded-lg bg-amber/10 border border-amber/20">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground">
                      {isAdultOnly && "This park only allows adult tickets."}
                      {isChildOnly && "This park only allows child tickets."}
                    </p>
                  </div>
                )}

                {/* Pax Count Selection */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pax Count</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Adult Count */}
                    <div className={cn(
                      "p-2 rounded-lg border",
                      isChildOnly ? "bg-muted/50 border-muted opacity-50" : "bg-gradient-to-r from-purple/10 to-purple/5 border-purple/20"
                    )}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-foreground">Adults</span>
                        {isChildOnly && (
                          <AlertCircle className="h-3 w-3 text-amber-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setPopupAdultCount(Math.max(0, popupAdultCount - 1))}
                          disabled={isChildOnly || popupAdultCount === 0}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="flex-1 text-center text-base font-bold text-foreground">{popupAdultCount}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setPopupAdultCount(popupAdultCount + 1)}
                          disabled={isChildOnly}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Child Count */}
                    <div className={cn(
                      "p-2 rounded-lg border",
                      isAdultOnly ? "bg-muted/50 border-muted opacity-50" : "bg-gradient-to-r from-purple/10 to-purple/5 border-purple/20"
                    )}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-foreground">Children</span>
                        {isAdultOnly && (
                          <AlertCircle className="h-3 w-3 text-amber-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setPopupChildCount(Math.max(0, popupChildCount - 1))}
                          disabled={isAdultOnly || popupChildCount === 0}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="flex-1 text-center text-base font-bold text-foreground">{popupChildCount}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setPopupChildCount(popupChildCount + 1)}
                          disabled={isAdultOnly}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-1.5 border-t border-border/30">
                    <span className="text-xs font-semibold text-foreground">Total Pax</span>
                    <span className="text-base font-bold text-primary">{popupAdultCount + popupChildCount}</span>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="p-2.5 rounded-lg bg-gradient-to-r from-emerald/10 to-emerald/5 border border-emerald/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Total Price</p>
                      <p className="text-xs text-muted-foreground">
                        ${selectedTourForPopup.price} per adult, ${(selectedTourForPopup.price * 0.7).toFixed(0)} per child
                      </p>
                    </div>
                    <p className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                      ${bookingDetails.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    onClick={() => setShowBookingPopup(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmBooking}
                    disabled={(popupAdultCount === 0 && popupChildCount === 0) || !popupTimeSlot || !popupDate || !popupDate}
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

export default SearchExperiences;
