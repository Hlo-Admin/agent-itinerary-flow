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
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Welcome back! Here's your booking overview.</p>
      </div>

      {/* Credit Limit Card */}
      <Card className="p-10 border-0">
        <div className="space-y-6">
          <div>
            <CardTitle className="text-2xl font-semibold">Agent Credit Limit</CardTitle>
            <CardDescription className="text-base mt-2">Track your available credit balance</CardDescription>
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Used Credit</span>
              <span className="text-2xl font-bold">${creditUsed.toLocaleString()}</span>
            </div>
            <Progress value={creditPercentage} className="h-3 rounded-full" />
            <div className="flex items-center justify-between pt-2">
              <div className="p-5 rounded-2xl bg-success/10">
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide mb-1">Available</p>
                <p className="text-2xl font-bold text-success">${creditAvailable.toLocaleString()}</p>
              </div>
              <div className="text-right p-5 rounded-2xl bg-muted/30">
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide mb-1">Total Limit</p>
                <p className="text-2xl font-bold">${creditLimit.toLocaleString()}</p>
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
            <Card key={stat.title} className="p-8 space-y-4 border-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.title}</CardTitle>
                <div className="p-3 rounded-2xl bg-primary/10">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold tracking-tight">{stat.value}</div>
                <p className="text-sm text-success font-medium flex items-center gap-1">
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
        <Card className="p-8 border-0">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold">Recent Bookings</CardTitle>
                <CardDescription className="text-base mt-2">Latest client reservations</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/bookings">View All</Link>
              </Button>
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-6 rounded-2xl bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-foreground text-lg">{booking.client}</p>
                      <Badge
                        variant={booking.status === "confirmed" ? "default" : "secondary"}
                        className="text-xs rounded-xl"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {booking.destination}
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">{booking.date}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-bold text-foreground text-lg">${booking.amount}</p>
                    <p className="text-sm text-success font-medium">+${booking.commission}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Categories */}
        <Card className="p-8 border-0">
          <div className="space-y-6">
            <div>
              <CardTitle className="text-2xl font-semibold">Top Categories</CardTitle>
              <CardDescription className="text-base mt-2">Best performing experience types</CardDescription>
            </div>
            <div className="space-y-5">
              {topCategories.map((category, index) => (
                <div key={category.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-primary/10 text-primary text-base font-bold">
                        {index + 1}
                      </div>
                      <span className="font-semibold text-foreground text-lg">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground text-lg">${category.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground font-medium">{category.bookings} bookings</p>
                    </div>
                  </div>
                  <Progress value={(category.bookings / 50) * 100} className="h-2.5 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-8 border-0">
        <CardTitle className="text-2xl font-semibold mb-8">Quick Actions</CardTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="h-auto py-8 flex flex-col gap-3" asChild>
            <Link to="/bookings">
              <Calendar className="h-7 w-7" />
              <span className="font-semibold">New Booking</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-8 flex flex-col gap-3">
            <Users className="h-7 w-7" />
            <span className="font-semibold">Manage Clients</span>
          </Button>
          <Button variant="outline" className="h-auto py-8 flex flex-col gap-3">
            <Star className="h-7 w-7" />
            <span className="font-semibold">Reviews</span>
          </Button>
          <Button variant="outline" className="h-auto py-8 flex flex-col gap-3" asChild>
            <Link to="/settings">
              <DollarSign className="h-7 w-7" />
              <span className="font-semibold">Payments</span>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
