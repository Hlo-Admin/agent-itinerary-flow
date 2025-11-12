import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, DollarSign, Users, TrendingUp, Calendar, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const creditLimit = 50000;
  const creditUsed = 32500;
  const creditAvailable = creditLimit - creditUsed;
  const creditPercentage = (creditUsed / creditLimit) * 100;

  const recentBookings = [
    {
      id: "BK001",
      client: "Sarah Johnson",
      destination: "Paris Food Tour",
      date: "2024-06-15",
      amount: 450,
      status: "confirmed",
      commission: 67.5,
    },
    {
      id: "BK002",
      client: "Michael Chen",
      destination: "Tokyo History Walk",
      date: "2024-06-18",
      amount: 320,
      status: "pending",
      commission: 48,
    },
    {
      id: "BK003",
      client: "Emma Williams",
      destination: "Bali Water Sports",
      date: "2024-06-20",
      amount: 580,
      status: "confirmed",
      commission: 87,
    },
    {
      id: "BK004",
      client: "James Brown",
      destination: "Rome Museum Tour",
      date: "2024-06-22",
      amount: 290,
      status: "confirmed",
      commission: 43.5,
    },
  ];

  const topCategories = [
    { name: "Food Tours", bookings: 45, revenue: 12450 },
    { name: "History", bookings: 38, revenue: 9870 },
    { name: "Water Sports", bookings: 32, revenue: 15600 },
    { name: "Museums", bookings: 28, revenue: 7840 },
    { name: "Day Trips", bookings: 25, revenue: 11250 },
  ];

  const stats = [
    {
      title: "Total Bookings",
      value: "168",
      change: "+12%",
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Revenue This Month",
      value: "$57,240",
      change: "+18%",
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "Active Clients",
      value: "94",
      change: "+8%",
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Avg. Commission",
      value: "15.2%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-accent",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-5xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg font-medium">Welcome back! Here's your booking overview.</p>
      </div>

      {/* Credit Limit Card */}
      <Card className="p-12 border-0 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="space-y-8">
          <div>
            <CardTitle className="text-3xl font-bold">Agent Credit Limit</CardTitle>
            <CardDescription className="text-base mt-3 font-medium">Track your available credit balance</CardDescription>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Used Credit</span>
              <span className="text-3xl font-extrabold">${creditUsed.toLocaleString()}</span>
            </div>
            <Progress value={creditPercentage} className="h-5 rounded-full shadow-sm" />
            <div className="flex items-center justify-between pt-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-success/10 to-transparent shadow-sm">
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mb-2">Available</p>
                <p className="text-3xl font-extrabold text-success">${creditAvailable.toLocaleString()}</p>
              </div>
              <div className="text-right p-6 rounded-3xl bg-muted/20 shadow-sm">
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mb-2">Total Limit</p>
                <p className="text-3xl font-extrabold">${creditLimit.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-10 space-y-5 border-0 hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</CardTitle>
                <div className="p-4 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent shadow-sm">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl font-extrabold tracking-tight">{stat.value}</div>
                <p className="text-sm text-success font-bold flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4" />
                  {stat.change} from last month
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Bookings and Top Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card className="p-10 border-0">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold">Recent Bookings</CardTitle>
                <CardDescription className="text-base mt-3 font-medium">Latest client reservations</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/bookings">View All</Link>
              </Button>
            </div>
            <div className="space-y-5">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-7 rounded-3xl bg-gradient-to-r from-muted/10 to-transparent hover:from-muted/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-foreground text-xl">{booking.client}</p>
                      <Badge
                        variant={booking.status === "confirmed" ? "default" : "secondary"}
                        className="text-xs rounded-full font-bold"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                      <MapPin className="h-4 w-4" />
                      {booking.destination}
                    </div>
                    <p className="text-xs text-muted-foreground font-semibold">{booking.date}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-extrabold text-foreground text-xl">${booking.amount}</p>
                    <p className="text-sm text-success font-bold">+${booking.commission}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Categories */}
        <Card className="p-10 border-0">
          <div className="space-y-8">
            <div>
              <CardTitle className="text-3xl font-bold">Top Categories</CardTitle>
              <CardDescription className="text-base mt-3 font-medium">Best performing experience types</CardDescription>
            </div>
            <div className="space-y-6">
              {topCategories.map((category, index) => (
                <div key={category.name} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="flex items-center justify-center w-12 h-12 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent text-primary text-lg font-extrabold shadow-sm">
                        {index + 1}
                      </div>
                      <span className="font-bold text-foreground text-xl">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-foreground text-xl">${category.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide">{category.bookings} bookings</p>
                    </div>
                  </div>
                  <Progress value={(category.bookings / 50) * 100} className="h-3 rounded-full shadow-sm" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-10 border-0">
        <CardTitle className="text-3xl font-bold mb-10">Quick Actions</CardTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <Button className="h-auto py-10 flex flex-col gap-4 hover:scale-105 transition-transform" asChild>
            <Link to="/bookings">
              <Calendar className="h-8 w-8" />
              <span className="font-bold text-base">New Booking</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-10 flex flex-col gap-4 hover:scale-105 transition-transform">
            <Users className="h-8 w-8" />
            <span className="font-bold text-base">Manage Clients</span>
          </Button>
          <Button variant="outline" className="h-auto py-10 flex flex-col gap-4 hover:scale-105 transition-transform">
            <Star className="h-8 w-8" />
            <span className="font-bold text-base">Reviews</span>
          </Button>
          <Button variant="outline" className="h-auto py-10 flex flex-col gap-4 hover:scale-105 transition-transform" asChild>
            <Link to="/settings">
              <DollarSign className="h-8 w-8" />
              <span className="font-bold text-base">Payments</span>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
