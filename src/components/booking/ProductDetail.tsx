import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, MapPin, Users, Calendar, Upload, Plus, Minus, CheckCircle2, Sparkles } from "lucide-react";

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
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-3xl font-semibold text-foreground tracking-tight mb-2">{tour.name}</h3>
          <div className="flex flex-wrap items-center gap-5 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground">{tour.rating}</span>
              <span className="text-muted-foreground">({tour.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {tour.duration}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {tour.location}
            </div>
          </div>
        </div>
        <Button onClick={onBack} variant="outline" size="lg">
          Back to Results
        </Button>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6 animate-slide-in-right">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-14 bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80 backdrop-blur-sm p-1.5 rounded-xl border border-border/30 shadow-sm">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-blue data-[state=active]:to-accent-indigo data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-blue/30 font-semibold transition-all duration-300 rounded-lg"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="itinerary"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-purple data-[state=active]:to-accent-pink data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-purple/30 font-semibold transition-all duration-300 rounded-lg"
              >
                Itinerary
              </TabsTrigger>
              <TabsTrigger 
                value="included"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-emerald data-[state=active]:to-accent-teal data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-emerald/30 font-semibold transition-all duration-300 rounded-lg"
              >
                What's Included
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-4 animate-fade-in">
              <Card className="overflow-hidden border border-border/40 shadow-xl bg-gradient-to-br from-background to-muted/20">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5 z-10" />
                  <img
                    src={tourData?.tour?.image || "https://images.unsplash.com/photo-1555430489-29f715d2c8b8?w=800&h=600&fit=crop&auto=format"}
                    alt={tour.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(tour.name)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
                </div>
                <div className="p-6 sm:p-8 space-y-4 bg-gradient-to-b from-background to-muted/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-indigo/20">
                      <Sparkles className="h-5 w-5 text-accent-blue" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">About This Experience</h4>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Discover the rich history and hidden gems of the old town with our expert local guides. Walk through
                    centuries-old streets, visit iconic landmarks, and hear fascinating stories about the city's past.
                    Perfect for history enthusiasts and culture lovers.
                  </p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="itinerary" className="mt-6 animate-fade-in">
              <Card className="p-6 sm:p-8 border border-border/40 shadow-xl bg-gradient-to-br from-background to-muted/10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20">
                      <Clock className="h-5 w-5 text-accent-purple" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Day Schedule</h4>
                  </div>
                  <div className="space-y-5">
                    {[
                      { time: "09:00", activity: "Meeting point at Central Square" },
                      { time: "09:30", activity: "Historic district walking tour begins" },
                      { time: "11:00", activity: "Visit to the ancient cathedral" },
                      { time: "12:00", activity: "Tour concludes at the Old Town Gate" },
                    ].map((item, index) => (
                      <div key={index} className="flex gap-5 group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="flex flex-col items-center">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center border-2 border-accent-purple/30 group-hover:border-accent-purple/60 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
                            <span className="text-sm font-bold text-accent-purple">{item.time}</span>
                          </div>
                          {index < 3 && (
                            <div className="w-0.5 h-12 bg-gradient-to-b from-accent-purple/30 to-accent-pink/30 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-base font-medium text-foreground group-hover:text-accent-purple transition-all duration-300">
                            {item.activity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="included" className="mt-6 animate-fade-in">
              <Card className="p-6 sm:p-8 border border-border/40 shadow-xl bg-gradient-to-br from-background to-muted/10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-accent-emerald/20 to-accent-teal/20">
                      <CheckCircle2 className="h-5 w-5 text-accent-emerald" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">What's Included</h4>
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
                      <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald/10 via-emerald/5 to-transparent border border-emerald/20 group hover:border-emerald/40 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                        <div className="p-1.5 rounded-lg bg-emerald/20 group-hover:bg-emerald/30 transition-colors">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card className="h-fit lg:sticky lg:top-8 p-8 space-y-6 border-2 border-primary/10 bg-gradient-to-br from-background to-muted/20">
          <div className="flex items-center gap-2 pb-4 border-b border-border">
            <Calendar className="h-5 w-5 text-primary" />
            <h4 className="text-xl font-semibold text-foreground">Book This Experience</h4>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tour-date" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Select Date
              </Label>
              <Input
                id="tour-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tour-time" className="text-sm font-semibold text-foreground">
                Select Time
              </Label>
              <Input
                id="tour-time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <Label className="text-sm font-semibold text-foreground">Ticket Quantity</Label>
            
            <div className="space-y-3">
              {[
                { label: "Adult", price: adultPrice, count: adultTickets, setCount: setAdultTickets },
                { label: "Child (5-12)", price: childPrice, count: childTickets, setCount: setChildTickets },
                { label: "Senior (65+)", price: seniorPrice, count: seniorTickets, setCount: setSeniorTickets },
              ].map((ticket) => (
                <div key={ticket.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{ticket.label}</p>
                    <p className="text-xs text-muted-foreground">${ticket.price} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => ticket.setCount(Math.max(0, ticket.count - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-bold text-foreground">{ticket.count}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => ticket.setCount(ticket.count + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Tickets</span>
              <span className="font-semibold text-foreground">{totalTickets}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="text-base font-semibold text-foreground">Total Price</span>
              <span className="text-3xl font-bold text-primary">${totalPrice}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label className="text-xs font-medium text-muted-foreground">Discount Documents (Optional)</Label>
            <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 text-center transition-all hover:border-primary hover:bg-primary/5">
              <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
              <p className="text-xs font-medium text-foreground">Upload student or senior ID</p>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime || totalTickets === 0}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            Compare Suppliers
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
