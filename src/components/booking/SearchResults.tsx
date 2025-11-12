import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Clock, MapPin, DollarSign, CheckCircle2 } from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1555430489-29z715d2c8b8?w=400",
    rating: 4.8,
    reviews: 234,
    duration: "3 hours",
    price: 45,
    location: "Downtown",
    cancellation: "Free cancellation up to 24 hours",
    suppliers: 3,
  },
  {
    id: 2,
    name: "Culinary Food Tasting Experience",
    category: "Food Tours",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    rating: 4.9,
    reviews: 456,
    duration: "4 hours",
    price: 89,
    location: "Market District",
    cancellation: "Free cancellation up to 48 hours",
    suppliers: 5,
  },
  {
    id: 3,
    name: "Mountain Hiking Adventure",
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
    rating: 4.7,
    reviews: 189,
    duration: "6 hours",
    price: 120,
    location: "Mountain Range",
    cancellation: "No refund",
    suppliers: 2,
  },
  {
    id: 4,
    name: "Museum and Art Gallery Tour",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b64d6333?w=400",
    rating: 4.6,
    reviews: 312,
    duration: "2.5 hours",
    price: 35,
    location: "Arts District",
    cancellation: "Free cancellation up to 24 hours",
    suppliers: 4,
  },
];

const SearchResults = ({ onNext, onBack, searchData }: SearchResultsProps) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedTour, setSelectedTour] = useState<number | null>(null);

  const filteredTours = mockTours.filter(
    (tour) => tour.price >= priceRange[0] && tour.price <= priceRange[1]
  );

  const handleSelectTour = (tourId: number) => {
    setSelectedTour(tourId);
    const tour = mockTours.find((t) => t.id === tourId);
    onNext({ tour });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Search Results</h3>
          <p className="text-base text-muted-foreground font-medium mt-3">
            Found {filteredTours.length} experiences in {searchData?.destination || "your destination"}
          </p>
        </div>
        <Button onClick={onBack} variant="outline">
          Modify Search
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <Card className="p-8 h-fit space-y-8 border-0">
          <div>
            <h4 className="font-bold text-foreground mb-4 text-xl">Filters</h4>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="food">Food Tours</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="museums">Museums</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Price Range (${priceRange[0]} - ${priceRange[1]})</Label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={200}
              step={10}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results List */}
        <div className="md:col-span-3 space-y-5">
          {filteredTours.map((tour) => (
            <Card key={tour.id} className="p-8 border-0 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex gap-8">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-56 h-40 object-cover rounded-3xl shadow-md"
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-foreground">{tour.name}</h4>
                      <Badge variant="secondary" className="mt-1">
                        {tour.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">${tour.price}</p>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">{tour.rating}</span>
                      <span>({tour.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {tour.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">{tour.cancellation}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-sm text-muted-foreground">
                      {tour.suppliers} supplier{tour.suppliers > 1 ? "s" : ""} available
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => handleSelectTour(tour.id)}
                      >
                        Select Tour
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
