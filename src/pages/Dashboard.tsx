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
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your booking overview</p>
      </div>

      {/* Credit Limit Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Agent Credit Limit</span>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available Credit</p>
              <p className="text-3xl font-bold text-primary">${creditAvailable.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Limit</p>
              <p className="text-xl font-semibold text-foreground">${creditLimit.toLocaleString()}</p>
            </div>
          </div>
          <Progress value={creditPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            ${creditUsed.toLocaleString()} used • {creditPercentage.toFixed(1)}% utilized
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Bookings and Top Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest client reservations</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/bookings">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{booking.client}</p>
                      <Badge
                        variant={booking.status === "confirmed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {booking.destination}
                    </div>
                    <p className="text-xs text-muted-foreground">{booking.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${booking.amount}</p>
                    <p className="text-xs text-success">+${booking.commission}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Best performing experience types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {index + 1}
                      </div>
                      <span className="font-medium text-foreground">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${category.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{category.bookings} bookings</p>
                    </div>
                  </div>
                  <Progress value={(category.bookings / 50) * 100} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link to="/bookings">
                <Calendar className="h-5 w-5 text-primary" />
                <span>New Booking</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Users className="h-5 w-5 text-secondary" />
              <span>Manage Clients</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Star className="h-5 w-5 text-accent" />
              <span>Reviews</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link to="/settings">
                <DollarSign className="h-5 w-5 text-success" />
                <span>Payments</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
