import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Star,
  Clock,
  MapPin,
  Users,
  Calendar,
  Plus,
  Minus,
  CheckCircle2,
  Sparkles,
  Badge as BadgeIcon,
  Info,
  Filter,
  X,
  TrendingUp,
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Heart,
  Ticket,
  Trees,
  Building2,
  ShoppingBag,
  BookOpen,
  PawPrint,
  Ship,
  Waves,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Slider } from "@/components/ui/slider";

interface ProductDetailProps {
  onNext: (data: any) => void;
  onBack: () => void;
  tourData: any;
}

// Mock tours data (same as SearchExperiences)
const mockTours = [
  {
    id: 1,
    name: "Historic Walking Tour of Old Town",
    category: "History",
    image:
      "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format",
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
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
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
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format",
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
    image:
      "https://images.unsplash.com/photo-1566127444979-b3d2b64d6333?w=800&h=600&fit=crop&auto=format",
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

// Mock time slots - In production, this would come from API
const timeSlots = [
  { id: "09:00", label: "09:00 AM", type: "normal" },
  { id: "10:00", label: "10:00 AM", type: "normal" },
  { id: "11:00", label: "11:00 AM", type: "premium" },
  { id: "14:00", label: "02:00 PM", type: "normal" },
  { id: "15:00", label: "03:00 PM", type: "premium" },
  { id: "16:00", label: "04:00 PM", type: "normal" },
  { id: "17:00", label: "05:00 PM", type: "premium" },
];

const mockSuppliers = [
  {
    id: 1,
    name: "TourPro Adventures",
    rating: 4.9,
    reviews: 1243,
    adultPrice: 45,
    childPrice: 30,
    adultPremiumPrice: 55,
    childPremiumPrice: 38,
    commission: 15,
    cancellationPolicy: "Free cancellation up to 24 hours",
    instantConfirmation: true,
    verified: true,
  },
  {
    id: 2,
    name: "Local Experiences Co",
    rating: 4.7,
    reviews: 876,
    adultPrice: 42,
    childPrice: 28,
    adultPremiumPrice: 50,
    childPremiumPrice: 35,
    commission: 12,
    cancellationPolicy: "Free cancellation up to 48 hours",
    instantConfirmation: false,
    verified: true,
  },
  {
    id: 3,
    name: "Heritage Tours Ltd",
    rating: 4.8,
    reviews: 2103,
    adultPrice: 48,
    childPrice: 32,
    adultPremiumPrice: 58,
    childPremiumPrice: 40,
    commission: 18,
    cancellationPolicy: "Free cancellation up to 72 hours",
    instantConfirmation: true,
    verified: true,
  },
];

const ProductDetail = ({ onNext, onBack, tourData }: ProductDetailProps) => {
  // Check if we're showing results (coming from search) or detail view (tour selected)
  const showResults = tourData?.searchPerformed && !tourData?.tour;

  // Results list state
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
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
  const [popupTimeSlot, setPopupTimeSlot] = useState("10:00 AM");

  // Initialize from bookingDetails if available (from popup) - MUST be defined before useState calls that use it
  const bookingDetails = tourData?.bookingDetails || {};

  const [popupDate, setPopupDate] = useState<Date | undefined>(() => {
    if (tourData?.bookingDetails?.date) {
      return new Date(tourData.bookingDetails.date);
    }
    if (tourData?.date) {
      return new Date(tourData.date);
    }
    return undefined;
  });

  // Convert timeSlot label to id if needed (popup uses label format "10:00 AM", we need id "10:00")
  const getTimeSlotId = (timeSlotLabel: string) => {
    if (!timeSlotLabel) return "";
    const matchingSlot = timeSlots.find((slot) => slot.label === timeSlotLabel);
    return matchingSlot ? matchingSlot.id : timeSlotLabel;
  };

  const [selectedDate, setSelectedDate] = useState(() => {
    if (tourData?.bookingDetails?.date) {
      // Convert Date object to YYYY-MM-DD string format
      const date = new Date(tourData.bookingDetails.date);
      return date.toISOString().split("T")[0];
    }
    return tourData?.date || "";
  });
  const [selectedTime, setSelectedTime] = useState(
    tourData?.bookingDetails?.timeSlot
      ? getTimeSlotId(tourData.bookingDetails.timeSlot)
      : tourData?.selectedTime || ""
  );
  const [adultTickets, setAdultTickets] = useState(
    tourData?.bookingDetails?.adultCount || tourData?.tickets?.adult || 2
  );
  const [childTickets, setChildTickets] = useState(
    tourData?.bookingDetails?.childCount || tourData?.tickets?.child || 0
  );
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(
    tourData?.supplier?.id || mockSuppliers[0]?.id || null
  );

  // Carousel state for overview images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Multiple images for carousel
  const carouselImages = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format",
  ];

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Manual navigation
  const goToPrevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  }, [carouselImages.length]);

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  // Helper function to get alternate image for specific tours
  const getAlternateImage = (tourName: string) => {
    // Use images from other tours as alternates
    const alternateImages: Record<string, string> = {
      "Museum and Art Gallery Tour":
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format", // Culinary Food Tasting
      "Historic Walking Tour of Old Town":
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format", // Mountain Hiking
    };

    // Return alternate image if tour name matches
    if (alternateImages[tourName]) {
      return alternateImages[tourName];
    }
    // Fallback to default
    return "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format";
  };

  const tour = tourData?.tour || {
    name: "Historic Walking Tour",
    rating: 4.8,
    reviews: 234,
    duration: "3 hours",
    location: "Downtown",
    category: "History",
    image:
      "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format",
  };

  // Ensure image is preserved from tourData if available
  if (tourData?.tour?.image || tourData?.tour?.imageUrl) {
    tour.image = tourData.tour.image || tourData.tour.imageUrl;
  }

  const totalTickets = adultTickets + childTickets;

  // Get selected time slot details
  const selectedTimeSlot = timeSlots.find((ts) => ts.id === selectedTime);
  const isPremiumTime = selectedTimeSlot?.type === "premium";

  // Calculate prices based on time slot type
  const selectedSupplierData = selectedSupplier
    ? mockSuppliers.find((s) => s.id === selectedSupplier)
    : null;
  const getAdultPrice = (supplier: (typeof mockSuppliers)[0] | null) => {
    if (!supplier) return 0;
    return isPremiumTime ? supplier.adultPremiumPrice : supplier.adultPrice;
  };
  const getChildPrice = (supplier: (typeof mockSuppliers)[0] | null) => {
    if (!supplier) return 0;
    return isPremiumTime ? supplier.childPremiumPrice : supplier.childPrice;
  };

  const selectedAdultPrice = getAdultPrice(selectedSupplierData);
  const selectedChildPrice = getChildPrice(selectedSupplierData);
  const selectedAdultTotal = selectedAdultPrice * adultTickets;
  const selectedChildTotal = selectedChildPrice * childTickets;
  const selectedGrandTotal = selectedAdultTotal + selectedChildTotal;

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

  // Map category names to tour categories
  const categoryNameToTourCategories: Record<string, string[]> = {
    all: [],
    "Themes & Adventure Parks": ["Outdoor", "Adventure", "Theme"],
    "Public & Green Parks": ["Park", "Nature"],
    "Land Marks & Observation Decks": ["Landmark", "Observation", "History"],
    "Family Entertainment + Food Shows & Malls": [
      "Food Tours",
      "Food",
      "Entertainment",
    ],
    "Cultural + Heritage Museums": ["Museums", "History", "Cultural", "Museum"],
    "Animal & Nature Parks": ["Nature", "Animal", "Wildlife"],
    Cruises: ["Cruise", "Boat"],
    "Water Parks": ["Water"],
  };

  // Filter tours based on category, price range
  const filteredTours = mockTours
    .filter((tour) => {
      const priceMatch =
        tour.price >= priceRange[0] && tour.price <= priceRange[1];

      let categoryMatch = true;
      if (categoryFilter !== "all") {
        const mappedCategories = categoryFilterMap[categoryFilter] || [];
        if (mappedCategories.length > 0) {
          categoryMatch = mappedCategories.some((cat) =>
            tour.category.toLowerCase().includes(cat.toLowerCase())
          );
        }
      }

      // Filter by selectedCategory from search if available
      if (tourData?.searchCategory && tourData.searchCategory !== "all") {
        const mappedCategories =
          categoryNameToTourCategories[tourData.searchCategory] || [];
        if (mappedCategories.length > 0) {
          categoryMatch =
            categoryMatch &&
            mappedCategories.some((cat) =>
              tour.category.toLowerCase().includes(cat.toLowerCase())
            );
        }
      }

      return priceMatch && categoryMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
        default:
          return b.reviews - a.reviews;
      }
    });

  const colorMap: Record<string, string> = {
    "accent-blue": "bg-accent-blue",
    "accent-cyan": "bg-accent-cyan",
    "accent-teal": "bg-accent-teal",
    "accent-purple": "bg-accent-purple",
  };

  // Popup handlers for results view
  const getBookingDetails = (tour: any) => {
    const childPrice = tour.price * 0.7;
    const totalPrice =
      popupAdultCount * tour.price + popupChildCount * childPrice;
    return {
      adultCount: popupAdultCount,
      childCount: popupChildCount,
      timeSlot: popupTimeSlot,
      price: totalPrice,
    };
  };

  const handleOpenPopup = (tour: any) => {
    setSelectedTourForPopup(tour);
    const restrictions = tour.ticketRestrictions || "both";
    const isAdultOnly = restrictions === "adult-only";
    const isChildOnly = restrictions === "child-only";
    let adultCount = tourData?.tickets?.adult || 2;
    let childCount = tourData?.tickets?.child || 0;
    if (isAdultOnly) {
      adultCount = adultCount || 1;
      childCount = 0;
    } else if (isChildOnly) {
      adultCount = 0;
      childCount = childCount || 1;
    }
    setPopupAdultCount(adultCount);
    setPopupChildCount(childCount);
    setPopupTimeSlot(tourData?.selectedTimeSlot || "10:00 AM");
    setPopupDate(tourData?.date ? new Date(tourData.date) : undefined);
    setShowBookingPopup(true);
  };

  const handleSelectTour = (tourId: number) => {
    setSelectedTour(tourId);
    const tour = mockTours.find((t) => t.id === tourId);
    if (tour) handleOpenPopup(tour);
  };

  const handleConfirmBooking = () => {
    const tour = mockTours.find((t) => t.id === selectedTour);
    if (tour) {
      const bookingDetails = getBookingDetails(tour);
      onNext({
        destination: tourData?.destination,
        date: popupDate
          ? format(popupDate, "yyyy-MM-dd")
          : tourData?.date || "",
        categories: tourData?.categories || [],
        tour,
        bookingDetails: {
          ...bookingDetails,
          date: popupDate
            ? format(popupDate, "yyyy-MM-dd")
            : tourData?.date || "",
          timeSlot: popupTimeSlot,
        },
      });
      setShowBookingPopup(false);
    }
  };

  // If showing results (coming from search), show results list with popup
  if (showResults) {
    return (
      <div className="space-y-2 sm:space-y-3 w-full min-w-0 max-w-full animate-fade-in">
        {/* Results Header */}
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between w-full min-w-0">
          <div className="space-y-0.5 min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
              Search Results
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Found{" "}
              <span className="font-semibold text-primary">
                {filteredTours.length}
              </span>{" "}
              experiences in {tourData?.destination || "your destination"}
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
          </div>
        </div>

        <div className="grid gap-2 sm:gap-3 lg:grid-cols-12 w-full min-w-0 max-w-full">
          {/* Filters Sidebar */}
          <div
            className={cn(
              "lg:col-span-3",
              showFilters
                ? "block fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto bg-background/95 backdrop-blur-lg lg:bg-transparent lg:backdrop-blur-none p-4 lg:p-0 overflow-y-auto"
                : "hidden lg:block"
            )}
          >
            <Card className="p-3 sm:p-4 lg:sticky lg:top-8 border border-primary/10 bg-background">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="!h-6 !w-6 text-primary" />
                  <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-foreground">
                    Filters
                  </h4>
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

              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                    Category
                  </Label>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      <SelectItem value="themes-adventure">
                        Themes & Adventure Parks
                      </SelectItem>
                      <SelectItem value="public-green">
                        Public & Green Parks
                      </SelectItem>
                      <SelectItem value="landmarks-observation">
                        Land Marks & Observation Decks
                      </SelectItem>
                      <SelectItem value="family-entertainment">
                        Family Entertainment + Food Shows & Malls
                      </SelectItem>
                      <SelectItem value="cultural-heritage">
                        Cultural + Heritage Museums
                      </SelectItem>
                      <SelectItem value="animal-nature">
                        Animal & Nature Parks
                      </SelectItem>
                      <SelectItem value="cruises">Cruises</SelectItem>
                      <SelectItem value="water-parks">Water Parks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                      Price Range
                    </Label>
                    <span className="text-sm sm:text-base font-bold text-primary">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                    Sort By
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base">
                      <SelectValue placeholder="Most popular" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most popular</SelectItem>
                      <SelectItem value="price-low">
                        Price: low to high
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: high to low
                      </SelectItem>
                      <SelectItem value="rating">Highest rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Results List */}
          <div className="lg:col-span-9 w-full min-w-0 max-w-full overflow-hidden">
            <div className="space-y-2 sm:space-y-3 w-full min-w-0 max-w-full">
              {filteredTours.map((tour, index) => {
                const isActive = selectedTour === tour.id;
                const gradientClass =
                  colorMap[tour.color] || colorMap["accent-blue"];

                return (
                  <Card
                    key={tour.id}
                    className={cn(
                      "group relative flex flex-row transition-all duration-300 hover:shadow-xl border w-full min-w-0 max-w-full box-border animate-scale-in",
                      isActive
                        ? "border-primary border-2 shadow-lg shadow-primary/20"
                        : "border-border/30 hover:border-primary/40 hover:shadow-md"
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      overflow: "visible",
                    }}
                  >
                    {/* Image Section */}
                    <div className="relative w-28 sm:w-40 md:w-56 h-28 sm:h-40 md:h-56 flex-shrink-0 overflow-hidden rounded-l-xl bg-muted">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (
                            tour.name === "Museum and Art Gallery Tour" ||
                            tour.name === "Historic Walking Tour of Old Town"
                          ) {
                            target.src = getAlternateImage(tour.name);
                          } else {
                            target.src = `https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(
                              tour.name
                            )}`;
                          }
                        }}
                      />
                      <div
                        className={cn(
                          "absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-xs font-bold backdrop-blur-xl text-white shadow-xl border border-white/20 transition-all duration-300 group-hover:scale-105",
                          `${gradientClass}`
                        )}
                      >
                        {tour.category}
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 bg-primary/10 border-2 border-primary/30 z-20" />
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="relative flex flex-1 flex-col justify-between p-2.5 sm:p-3 min-w-0 bg-background">
                      {/* Favorite Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "absolute top-2 right-2 h-7 w-7 sm:h-8 sm:w-8 rounded-full transition-all duration-300 z-10",
                          isFavorite(tour.id)
                            ? "bg-rose-500/90 hover:bg-rose-600 text-white shadow-lg"
                            : "bg-muted/80 hover:bg-rose-100 text-muted-foreground hover:text-rose-500"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(tour.id);
                        }}
                      >
                        <Heart
                          className={cn(
                            "h-3.5 w-3.5 sm:h-4 sm:w-4",
                            isFavorite(tour.id) && "fill-white"
                          )}
                        />
                        <span className="sr-only">
                          {isFavorite(tour.id)
                            ? "Remove from favorites"
                            : "Add to favorites"}
                        </span>
                      </Button>
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="space-y-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-all duration-300 leading-tight line-clamp-2 break-words pr-8 sm:pr-10">
                            {tour.name}{" "}
                            <span className="text-muted-foreground font-normal">
                              ({tour.category})
                            </span>
                          </h4>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
                            <div className="flex items-center gap-1 flex-shrink-0 px-2 py-0.5 rounded-lg bg-amber/10 border border-amber/20">
                              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500 flex-shrink-0" />
                              <span className="font-bold text-foreground text-xs">
                                {tour.rating}
                              </span>
                              <span className="text-muted-foreground text-[10px] sm:text-xs">
                                ({tour.reviews})
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0 px-2 py-0.5 rounded-lg bg-muted/50">
                              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                              <span className="font-medium text-[10px] sm:text-xs">
                                {tour.duration}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0 px-2 py-0.5 rounded-lg bg-muted/30">
                              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0 text-accent-blue" />
                              <span className="font-medium text-[10px] sm:text-xs truncate">
                                {tour.location}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg bg-emerald/5 border border-emerald/10 min-w-0">
                            <div className="p-0.5 rounded bg-emerald/10 flex-shrink-0">
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            </div>
                            <span className="text-[10px] font-medium text-foreground line-clamp-1 min-w-0">
                              {tour.cancellation}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-1.5 sm:gap-2 pt-1.5 sm:pt-2 border-t border-border/20 mt-1.5 min-w-0">
                        <div className="flex items-center gap-1.5 min-w-0 flex-1 px-2 py-1 rounded-lg bg-primary/5 border border-primary/10">
                          <div className="p-0.5 rounded bg-primary/10 flex-shrink-0">
                            <TrendingUp className="h-3 w-3 text-primary" />
                          </div>
                          <p className="text-[10px] text-muted-foreground truncate">
                            <span className="font-semibold text-foreground">
                              {tour.suppliers}
                            </span>{" "}
                            supplier{tour.suppliers > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg sm:text-xl font-bold text-primary">
                            ${tour.price}
                          </p>
                          <p className="text-[9px] text-muted-foreground">
                            per person
                          </p>
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0 items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-[10px] border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                          >
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
          </div>
        </div>

        {/* Booking Details Popup */}
        <Dialog open={showBookingPopup} onOpenChange={setShowBookingPopup}>
          <DialogContent className="sm:max-w-[600px] max-h-[92vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Booking Requirements
              </DialogTitle>
              <DialogDescription className="text-xs">
                Review and update your booking requirements
              </DialogDescription>
            </DialogHeader>

            {selectedTourForPopup &&
              (() => {
                const bookingDetails = getBookingDetails(selectedTourForPopup);
                const restrictions =
                  selectedTourForPopup.ticketRestrictions || "both";
                const isAdultOnly = restrictions === "adult-only";
                const isChildOnly = restrictions === "child-only";

                return (
                  <div className="space-y-2 ">
                    {/* Selected Park */}
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-accent-blue/10 border border-accent-blue/20">
                      <div className="p-1.5 rounded-lg bg-accent-blue/20">
                        <MapPin className="h-4 w-4 text-accent-blue" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">
                          Selected Park
                        </p>
                        <p className="text-sm font-bold text-foreground truncate">
                          {selectedTourForPopup.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {selectedTourForPopup.location}
                        </p>
                      </div>
                    </div>

                    {/* Date and Time Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {/* Date Selection */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="popup-date"
                          className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5"
                        >
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
                              {popupDate ? (
                                format(popupDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={popupDate}
                              onSelect={setPopupDate}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Time Slot Selection */}
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Time Slot
                        </Label>
                        <Select
                          value={popupTimeSlot}
                          onValueChange={setPopupTimeSlot}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot.id} value={slot.label}>
                                {slot.label}{" "}
                                {slot.type === "premium" && "(Premium)"}
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
                          {isAdultOnly &&
                            "This park only allows adult tickets."}
                          {isChildOnly &&
                            "This park only allows child tickets."}
                        </p>
                      </div>
                    )}

                    {/* Pax Count Selection */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Pax Count
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Adult Count */}
                        <div
                          className={cn(
                            "p-2 rounded-lg border",
                            isChildOnly
                              ? "bg-muted/50 border-muted opacity-50"
                              : "bg-purple/10 border-purple/20"
                          )}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-foreground">
                              Adults
                            </span>
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
                              onClick={() =>
                                setPopupAdultCount(
                                  Math.max(0, popupAdultCount - 1)
                                )
                              }
                              disabled={isChildOnly || popupAdultCount === 0}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <span className="flex-1 text-center text-base font-bold text-foreground">
                              {popupAdultCount}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                setPopupAdultCount(popupAdultCount + 1)
                              }
                              disabled={isChildOnly}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>

                        {/* Child Count */}
                        <div
                          className={cn(
                            "p-2 rounded-lg border",
                            isAdultOnly
                              ? "bg-muted/50 border-muted opacity-50"
                              : "bg-purple/10 border-purple/20"
                          )}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-foreground">
                              Children
                            </span>
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
                              onClick={() =>
                                setPopupChildCount(
                                  Math.max(0, popupChildCount - 1)
                                )
                              }
                              disabled={isAdultOnly || popupChildCount === 0}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <span className="flex-1 text-center text-base font-bold text-foreground">
                              {popupChildCount}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                setPopupChildCount(popupChildCount + 1)
                              }
                              disabled={isAdultOnly}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-1.5 border-t border-border/30">
                        <span className="text-xs font-semibold text-foreground">
                          Total Pax
                        </span>
                        <span className="text-base font-bold text-primary">
                          {popupAdultCount + popupChildCount}
                        </span>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="p-2.5 rounded-lg bg-emerald/10 border border-emerald/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">
                            Total Price
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${selectedTourForPopup.price} per adult, $
                            {(selectedTourForPopup.price * 0.7).toFixed(0)} per
                            child
                          </p>
                        </div>
                        <p className="text-xl font-bold text-emerald-600">
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
                        disabled={
                          (popupAdultCount === 0 && popupChildCount === 0) ||
                          !popupTimeSlot ||
                          !popupDate
                        }
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
  }

  // Otherwise show the detail view (when tour is selected)
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in -mx-2 sm:-mx-3 md:-mx-3 px-2 sm:px-3 md:px-3 py-2 sm:py-3 md:py-3" style={{ backgroundColor: '#f1f5f9' }}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-3xl font-semibold text-foreground tracking-tight">
            {tour.name}
          </h3>
        </div>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6 animate-slide-in-right">
          <Tabs defaultValue="pricing" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-14 bg-muted/80 backdrop-blur-sm p-1.5 rounded-xl border border-border/30 shadow-sm">
              <TabsTrigger
                value="pricing"
                className="data-[state=active]:bg-accent-emerald data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-emerald/30 font-semibold transition-all duration-300 rounded-lg"
              >
                Pricing
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-accent-blue data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-blue/30 font-semibold transition-all duration-300 rounded-lg"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="included"
                className="data-[state=active]:bg-accent-emerald data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-emerald/30 font-semibold transition-all duration-300 rounded-lg"
              >
                What's Included
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="pricing"
              className="mt-6 space-y-4 animate-fade-in"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-accent-emerald/20">
                    <BadgeIcon className="h-5 w-5 text-accent-emerald" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">
                    Compare Supplier Prices
                  </h4>
                </div>
                <div className="space-y-4">
                  {mockSuppliers.map((supplier, index) => {
                    const adultPrice = isPremiumTime
                      ? supplier.adultPremiumPrice
                      : supplier.adultPrice;
                    const childPrice = isPremiumTime
                      ? supplier.childPremiumPrice
                      : supplier.childPrice;
                    const adultTotal = adultPrice * adultTickets;
                    const childTotal = childPrice * childTickets;
                    const grandTotal = adultTotal + childTotal;
                    const agentCommission =
                      (grandTotal * supplier.commission) / 100;

                    const isSelected = selectedSupplier === supplier.id;

                    return (
                      <Card
                        key={supplier.id}
                        className={cn(
                          "p-6 border transition-all duration-300 hover:shadow-md cursor-pointer",
                          isSelected
                            ? "border-primary border-2 shadow-xl shadow-primary/20 ring-2 ring-primary/20 bg-primary/5"
                            : "border-border/40 shadow-lg bg-background hover:border-primary/40"
                        )}
                        onClick={() => setSelectedSupplier(supplier.id)}
                      >
                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                          <div className="flex-1">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                              <h5 className="text-lg font-semibold text-foreground">
                                {supplier.name}
                              </h5>
                              {supplier.verified && (
                                <Badge variant="secondary" className="gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Verified
                                </Badge>
                              )}
                              {isSelected && (
                                <Badge className="gap-1 bg-primary text-primary-foreground">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Selected
                                </Badge>
                              )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-3 mb-4">
                              <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                  Price per person
                                </p>
                                <div className="space-y-1">
                                  {adultTickets > 0 && (
                                    <div className="flex items-center gap-1">
                                      <p className="text-sm font-semibold text-foreground">
                                        Adult: ${adultPrice}
                                      </p>
                                      {isPremiumTime && (
                                        <Badge
                                          variant="secondary"
                                          className="text-[9px] px-1 py-0"
                                        >
                                          Premium
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                  {childTickets > 0 && (
                                    <div className="flex items-center gap-1">
                                      <p className="text-sm font-semibold text-foreground">
                                        Child: ${childPrice}
                                      </p>
                                      {isPremiumTime && (
                                        <Badge
                                          variant="secondary"
                                          className="text-[9px] px-1 py-0"
                                        >
                                          Premium
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Your commission</p>
                                <p className="text-sm font-semibold text-success">
                                  {supplier.commission}% (${agentCommission.toFixed(2)})
                                </p>
                              </div> */}

                              <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                  Pax breakdown
                                </p>
                                <div className="space-y-1">
                                  {adultTickets > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                      Adult: {adultTickets} × ${adultPrice}
                                    </p>
                                  )}
                                  {childTickets > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                      Child: {childTickets} × ${childPrice}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-left md:text-right space-y-2">
                            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              Total price
                            </p>
                            <p className="text-2xl font-semibold text-primary">
                              ${grandTotal.toFixed(2)}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              for {totalTickets} ticket
                              {totalTickets > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
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
              </div>
            </TabsContent>

            <TabsContent
              value="overview"
              className="mt-6 space-y-4 animate-fade-in"
            >
              <Card className="overflow-hidden border border-border/40 shadow-xl bg-background">
                {/* Image Carousel */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-muted group">
                  <div className="absolute inset-0 bg-accent-blue/5 z-10 pointer-events-none" />

                  {/* Carousel Images */}
                  <div className="relative h-full w-full">
                    {carouselImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${tour.name} - Image ${index + 1}`}
                        className={cn(
                          "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                          index === currentImageIndex
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-105"
                        )}
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>

                  {/* Left Arrow */}
                  <button
                    onClick={goToPrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                  >
                    <ChevronLeft className="h-6 w-6 text-foreground" />
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={goToNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                  >
                    <ChevronRight className="h-6 w-6 text-foreground" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          index === currentImageIndex
                            ? "w-6 bg-white"
                            : "w-2 bg-white/50 hover:bg-white/70"
                        )}
                      />
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-background/40 z-10 pointer-events-none" />
                </div>
                <div className="p-6 sm:p-8 space-y-4 bg-background">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-accent-blue/20">
                      <Sparkles className="h-5 w-5 text-accent-blue" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground">
                      About This Experience
                    </h4>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Discover the rich history and hidden gems of the old town
                    with our expert local guides. Walk through centuries-old
                    streets, visit iconic landmarks, and hear fascinating
                    stories about the city's past. Perfect for history
                    enthusiasts and culture lovers.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="included" className="mt-6 animate-fade-in">
              <Card className="p-6 sm:p-8 border border-border/40 shadow-xl bg-background">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-accent-emerald/20">
                      <CheckCircle2 className="h-5 w-5 text-accent-emerald" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground">
                      What's Included
                    </h4>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      "Professional local guide",
                      "Entrance fees to all attractions",
                      "Small group experience (max 15 people)",
                      "Historical information booklet",
                      "Complimentary refreshments",
                      "Photo opportunities at key locations",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl bg-emerald/10 border border-emerald/20 group hover:border-emerald/40 hover:shadow-md transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="p-1.5 rounded-lg bg-emerald/20 group-hover:bg-emerald/30 transition-colors">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card className="h-fit lg:sticky lg:top-8 p-8 space-y-6 border-2 border-primary/10 bg-background">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Calendar className="h-5 w-5 text-primary" />
            <h4 className="text-xl font-semibold text-foreground">
              Trip Summary
            </h4>
          </div>

          {/* Selected Park & Supplier Info */}
          <div className="space-y-3 pb-4 border-b border-border">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Selected Park
              </Label>
              <p className="text-sm font-semibold text-foreground leading-tight">
                {tour.name}
              </p>
            </div>
            {selectedSupplierData && (
              <div className="space-y-1">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Supplier
                </Label>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    {selectedSupplierData.name}
                  </p>
                  {selectedSupplierData.verified && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-primary/10 text-primary border-0"
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Date and Time in same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="tour-date"
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Select Date
                </Label>
                <Input
                  id="tour-date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="h-11"
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="tour-time"
                  className="text-sm font-semibold text-foreground"
                >
                  Select Time Slot
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger id="tour-time" className="h-11">
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.id} value={slot.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{slot.label}</span>
                          {slot.type === "premium" && (
                            <Badge
                              variant="secondary"
                              className="ml-2 text-[10px]"
                            >
                              Premium
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-1 pt-1 border-t border-border">
            <Label className="text-xs font-semibold text-foreground">
              Ticket Quantity
            </Label>

            {/* Adult and Child in same row */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Adult",
                  count: adultTickets,
                  setCount: setAdultTickets,
                },
                {
                  label: "Child (5-12)",
                  count: childTickets,
                  setCount: setChildTickets,
                },
              ].map((ticket) => (
                <div key={ticket.label} className="flex items-center gap-1.5">
                  <p className="font-medium text-foreground text-xs whitespace-nowrap">
                    {ticket.label}
                  </p>
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      type="button"
                      className="h-6 w-6 flex items-center justify-center text-muted-foreground hover:bg-muted/50 border-r"
                      onClick={() =>
                        ticket.setCount(Math.max(0, ticket.count - 1))
                      }
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-foreground">
                      {ticket.count}
                    </span>
                    <button
                      type="button"
                      className="h-6 w-6 flex items-center justify-center text-muted-foreground hover:bg-muted/50 border-l"
                      onClick={() => ticket.setCount(ticket.count + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trip Summary */}
          {/* <div className="space-y-3 border-t border-border pt-4"> */}
          {/* <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Trip  
            </h4> */}

          {/* <div className="space-y-3">
              <div className="flex items-start justify-between gap-2 text-xs">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {tour.location || "Dubai Bus Station"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    (
                    {selectedDate
                      ? new Date(selectedDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Select date"}
                    )
                  </p>
                </div>
                <div className="flex flex-col items-center px-2">
                  <span className="text-[10px] text-muted-foreground">
                    1 Stop
                  </span>
                </div>
                <div className="flex-1 text-right">
                  <p className="font-semibold text-foreground">
                    {tourData?.destination || "MANAMA (BAH)"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    (
                    {selectedDate
                      ? new Date(
                          new Date(selectedDate).setDate(
                            new Date(selectedDate).getDate() + 1
                          )
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Next day"}
                    )
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-2 text-xs">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {tourData?.destination || "MANAMA (BAH)"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    (
                    {selectedDate
                      ? new Date(
                          new Date(selectedDate).setDate(
                            new Date(selectedDate).getDate() + 3
                          )
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Return date"}
                    )
                  </p>
                </div>
                <div className="flex flex-col items-center px-2">
                  <span className="text-[10px] text-muted-foreground">
                    1 Stop
                  </span>
                </div>
                <div className="flex-1 text-right">
                  <p className="font-semibold text-foreground">
                    {tour.location || "Dubai Bus Station"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    (
                    {selectedDate
                      ? new Date(
                          new Date(selectedDate).setDate(
                            new Date(selectedDate).getDate() + 3
                          )
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Return date"}
                    )
                  </p>
                </div>
              </div>
            </div> */}

          {/* Ticket Count & Trip Type */}
          {/* <div className="flex justify-between items-center pt-2 border-t border-border/50">
              <span className="text-sm text-foreground">
                {totalTickets} Ticket(s)
              </span>
              <span className="text-sm font-semibold text-primary">
                Round Trip
              </span>
            </div>
          </div> */}

          {/* Fare Breakdown */}
          {selectedSupplierData && (
            <div className="space-y-2 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Adult ({adultTickets} x AED {selectedAdultPrice.toFixed(2)})
                </span>
                <span className="font-medium text-foreground">
                  AED {selectedAdultTotal.toFixed(2)}
                </span>
              </div>
              {childTickets > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Child ({childTickets} x AED {selectedChildPrice.toFixed(2)})
                  </span>
                  <span className="font-medium text-foreground">
                    AED {selectedChildTotal.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Taxes ({totalTickets} x AED 250.00)
                </span>
                <span className="font-medium text-foreground">
                  AED {(totalTickets * 250).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform Fee</span>
                <span className="font-medium text-foreground">AED 0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount(-)</span>
                <span className="font-medium text-primary">AED 0.00</span>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-center pt-3 border-t border-border mt-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  Grand Total
                </span>
                <span className="text-lg font-bold text-primary">
                  AED {(selectedGrandTotal + totalTickets * 250).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <Button
            onClick={() => {
              if (selectedSupplierData) {
                onNext({
                  tour,
                  selectedDate,
                  selectedTime,
                  selectedTimeSlot,
                  tickets: { adult: adultTickets, child: childTickets },
                  supplier: selectedSupplierData,
                  totalPrice: selectedGrandTotal,
                });
              }
            }}
            disabled={
              !selectedDate ||
              !selectedTime ||
              totalTickets === 0 ||
              !selectedSupplierData
            }
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            Continue
          </Button>
        </Card>
      </div>

      {/* Booking Details Popup */}
      <Dialog open={showBookingPopup} onOpenChange={setShowBookingPopup}>
        <DialogContent className="sm:max-w-[600px] max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Booking Requirements
            </DialogTitle>
            <DialogDescription className="text-xs">
              Review and update your booking requirements
            </DialogDescription>
          </DialogHeader>

          {selectedTourForPopup &&
            (() => {
              const bookingDetails = getBookingDetails(selectedTourForPopup);
              const restrictions =
                selectedTourForPopup.ticketRestrictions || "both";
              const isAdultOnly = restrictions === "adult-only";
              const isChildOnly = restrictions === "child-only";

              return (
                <div className="space-y-2 ">
                  {/* Selected Park */}
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-accent-blue/10 border border-accent-blue/20">
                    <div className="p-1.5 rounded-lg bg-accent-blue/20">
                      <MapPin className="h-4 w-4 text-accent-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">
                        Selected Park
                      </p>
                      <p className="text-sm font-bold text-foreground truncate">
                        {selectedTourForPopup.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {selectedTourForPopup.location}
                      </p>
                    </div>
                  </div>

                  {/* Date and Time Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Date Selection */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="popup-date"
                        className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5"
                      >
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
                            {popupDate ? (
                              format(popupDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={popupDate}
                            onSelect={setPopupDate}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time Slot Selection */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Time Slot
                      </Label>
                      <Select
                        value={popupTimeSlot}
                        onValueChange={setPopupTimeSlot}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot.id} value={slot.label}>
                              {slot.label}{" "}
                              {slot.type === "premium" && "(Premium)"}
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
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Pax Count
                    </Label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {/* Adult Count */}
                      <div
                        className={cn(
                          "p-1.5 rounded-lg border",
                          isChildOnly
                            ? "bg-muted/50 border-muted opacity-50"
                            : "bg-purple/10 border-purple/20"
                        )}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">
                            Adults
                          </span>
                          {isChildOnly && (
                            <AlertCircle className="h-3 w-3 text-amber-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              setPopupAdultCount(
                                Math.max(0, popupAdultCount - 1)
                              )
                            }
                            disabled={isChildOnly || popupAdultCount === 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="flex-1 text-center text-sm font-bold text-foreground">
                            {popupAdultCount}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              setPopupAdultCount(popupAdultCount + 1)
                            }
                            disabled={isChildOnly}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Child Count */}
                      <div
                        className={cn(
                          "p-1.5 rounded-lg border",
                          isAdultOnly
                            ? "bg-muted/50 border-muted opacity-50"
                            : "bg-purple/10 border-purple/20"
                        )}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">
                            Children
                          </span>
                          {isAdultOnly && (
                            <AlertCircle className="h-3 w-3 text-amber-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              setPopupChildCount(
                                Math.max(0, popupChildCount - 1)
                              )
                            }
                            disabled={isAdultOnly || popupChildCount === 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="flex-1 text-center text-sm font-bold text-foreground">
                            {popupChildCount}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              setPopupChildCount(popupChildCount + 1)
                            }
                            disabled={isAdultOnly}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-border/30">
                      <span className="text-xs font-semibold text-foreground">
                        Total Pax
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {popupAdultCount + popupChildCount}
                      </span>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="p-2.5 rounded-lg bg-emerald/10 border border-emerald/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">
                          Total Price
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${selectedTourForPopup.price} per adult, $
                          {(selectedTourForPopup.price * 0.7).toFixed(0)} per
                          child
                        </p>
                      </div>
                      <p className="text-xl font-bold text-emerald-600">
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
                      disabled={
                        (popupAdultCount === 0 && popupChildCount === 0) ||
                        !popupTimeSlot ||
                        !popupDate
                      }
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

export default ProductDetail;
