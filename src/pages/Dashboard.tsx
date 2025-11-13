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
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-base">Welcome back! Here's your booking overview.</p>
      </div>

      {/* Credit Limit Card */}
      <Card className="p-8 border-2">
        <div className="space-y-8">
          <div>
            <CardTitle className="text-xl font-semibold">Agent Credit Limit</CardTitle>
            <CardDescription className="text-sm mt-2">Track your available credit balance</CardDescription>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Used Credit</span>
              <span className="text-2xl font-semibold">${creditUsed.toLocaleString()}</span>
            </div>
            <Progress value={creditPercentage} className="h-2" />
            <div className="flex items-center justify-between pt-2">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Available</p>
                <p className="text-xl font-semibold text-success">${creditAvailable.toLocaleString()}</p>
              </div>
              <div className="text-right p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Total Limit</p>
                <p className="text-xl font-semibold">${creditLimit.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 space-y-4 hover:shadow-lg transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
                <div className="p-2.5 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                  <Icon className={`h-4 w-4 ${stat.color} group-hover:text-primary transition-colors`} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-semibold tracking-tight">{stat.value}</div>
                <p className="text-xs text-success font-medium flex items-center gap-1.5">
                  <ArrowUpRight className="h-3.5 w-3.5" />
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
        <Card className="p-7">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Recent Bookings</CardTitle>
                <CardDescription className="text-sm mt-2">Latest client reservations</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/bookings">View All</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition-all border border-transparent hover:border-border/50">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <p className="font-semibold text-foreground text-sm">{booking.client}</p>
                      <Badge
                        variant={booking.status === "confirmed" ? "default" : "secondary"}
                        className="text-xs font-medium"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {booking.destination}
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">{booking.date}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold text-foreground text-lg">${booking.amount}</p>
                    <p className="text-xs text-success font-semibold">+${booking.commission}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Categories */}
        <Card className="p-7">
          <div className="space-y-6">
            <div>
              <CardTitle className="text-xl font-semibold">Top Categories</CardTitle>
              <CardDescription className="text-sm mt-2">Best performing experience types</CardDescription>
            </div>
            <div className="space-y-5">
              {topCategories.map((category, index) => (
                <div key={category.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                        {index + 1}
                      </div>
                      <span className="font-semibold text-foreground text-sm">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground text-base">${category.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground font-medium">{category.bookings} bookings</p>
                    </div>
                  </div>
                  <Progress value={(category.bookings / 50) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-7">
        <CardTitle className="text-xl font-semibold mb-6">Quick Actions</CardTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="h-auto py-7 flex flex-col gap-3 hover:scale-[1.02] transition-transform" asChild>
            <Link to="/bookings">
              <Calendar className="h-6 w-6" />
              <span className="font-semibold text-sm">New Booking</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-7 flex flex-col gap-3 hover:scale-[1.02] transition-transform hover:bg-accent">
            <Users className="h-6 w-6" />
            <span className="font-semibold text-sm">Manage Clients</span>
          </Button>
          <Button variant="outline" className="h-auto py-7 flex flex-col gap-3 hover:scale-[1.02] transition-transform hover:bg-accent">
            <Star className="h-6 w-6" />
            <span className="font-semibold text-sm">Reviews</span>
          </Button>
          <Button variant="outline" className="h-auto py-7 flex flex-col gap-3 hover:scale-[1.02] transition-transform hover:bg-accent" asChild>
            <Link to="/settings">
              <DollarSign className="h-6 w-6" />
              <span className="font-semibold text-sm">Payments</span>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
