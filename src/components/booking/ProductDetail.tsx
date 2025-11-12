import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, MapPin, Users, Calendar, Upload, Plus, Minus } from "lucide-react";

interface ProductDetailProps {
  onNext: (data: any) => void;
  onBack: () => void;
  tourData: any;
}

const ProductDetail = ({ onNext, onBack, tourData }: ProductDetailProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [adultTickets, setAdultTickets] = useState(2);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);

  const tour = tourData?.tour || {
    name: "Historic Walking Tour",
    rating: 4.8,
    reviews: 234,
    duration: "3 hours",
    location: "Downtown",
    category: "History",
  };

  const adultPrice = 45;
  const childPrice = 30;
  const seniorPrice = 40;

  const totalTickets = adultTickets + childTickets + seniorTickets;
  const totalPrice = adultTickets * adultPrice + childTickets * childPrice + seniorTickets * seniorPrice;

  const handleContinue = () => {
    onNext({
      tour,
      selectedDate,
      selectedTime,
      tickets: { adult: adultTickets, child: childTickets, senior: seniorTickets },
      totalPrice,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-semibold text-foreground">{tour.name}</h3>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
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
        </div>
        <Button onClick={onBack} variant="outline">
          Back to Results
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="included">What's Included</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1555430489-29z715d2c8b8?w=800"
                  alt={tour.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-muted-foreground leading-relaxed">
                  Discover the rich history and hidden gems of the old town with our expert local guides.
                  Walk through centuries-old streets, visit iconic landmarks, and hear fascinating stories
                  about the city's past. Perfect for history enthusiasts and culture lovers.
                </p>
              </Card>
            </TabsContent>
            <TabsContent value="itinerary">
              <Card className="p-6">
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary">09:00</span>
                    <span className="text-foreground">Meeting point at Central Square</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary">09:30</span>
                    <span className="text-foreground">Historic district walking tour begins</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary">11:00</span>
                    <span className="text-foreground">Visit to the ancient cathedral</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary">12:00</span>
                    <span className="text-foreground">Tour concludes at the Old Town Gate</span>
                  </li>
                </ul>
              </Card>
            </TabsContent>
            <TabsContent value="included">
              <Card className="p-6">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-foreground">
                    ✓ Expert local guide
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    ✓ Entrance fees to all sites
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    ✓ Complimentary water bottle
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    ✓ Digital tour booklet
                  </li>
                </ul>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card className="p-8 h-fit space-y-8 border-0">
          <div>
            <h4 className="text-xl font-semibold text-foreground mb-4">Book This Experience</h4>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tour-date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Select Date
            </Label>
            <Input
              id="tour-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tour-time">Select Time</Label>
            <Input
              id="tour-time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

          <div className="space-y-4 pt-2">
            <Label>Ticket Quantity</Label>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Adult</p>
                <p className="text-sm text-muted-foreground">${adultPrice}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setAdultTickets(Math.max(0, adultTickets - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{adultTickets}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setAdultTickets(adultTickets + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Child (5-12)</p>
                <p className="text-sm text-muted-foreground">${childPrice}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setChildTickets(Math.max(0, childTickets - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{childTickets}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setChildTickets(childTickets + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Senior (65+)</p>
                <p className="text-sm text-muted-foreground">${seniorPrice}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setSeniorTickets(Math.max(0, seniorTickets - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{seniorTickets}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setSeniorTickets(seniorTickets + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Tickets</span>
              <span className="font-medium text-foreground">{totalTickets}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total Price</span>
              <span className="text-xl font-bold text-primary">${totalPrice}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Discount Documents (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Upload student/senior ID</p>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!selectedDate || !selectedTime || totalTickets === 0}
          >
            Compare Suppliers
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
