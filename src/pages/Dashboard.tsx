import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, DollarSign, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Bookings",
      value: "247",
      change: "+12% from last month",
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Active Travelers",
      value: "1,834",
      change: "+8% from last month",
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+23% from last month",
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "Conversion Rate",
      value: "68%",
      change: "+5% from last month",
      icon: TrendingUp,
      color: "text-accent",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your business overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Your latest travel bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <div>
                    <p className="font-medium text-foreground">New York → London</p>
                    <p className="text-sm text-muted-foreground">John Doe • 2 passengers</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">$1,240</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                Create New Booking
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium">
                View All Travelers
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors font-medium">
                Generate Report
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
