import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Percent,
  ArrowUpRight,
} from "lucide-react";

const Reports = () => {
  const timeRange = "this-month";

  const stats = [
    {
      title: "Total Revenue",
      value: "$57,240",
      change: "+18.2%",
      icon: DollarSign,
      color: "from-green-500/10 to-green-600/5",
      borderColor: "border-green-500/20",
      iconColor: "text-green-500",
      iconBg: "bg-green-500/10",
    },
    {
      title: "Total Bookings",
      value: "168",
      change: "+12.5%",
      icon: Calendar,
      color: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-500/20",
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Active Clients",
      value: "94",
      change: "+8.3%",
      icon: Users,
      color: "from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-500/20",
      iconColor: "text-purple-500",
      iconBg: "bg-purple-500/10",
    },
    {
      title: "Avg Commission",
      value: "15.2%",
      change: "+2.1%",
      icon: Percent,
      color: "from-orange-500/10 to-orange-600/5",
      borderColor: "border-orange-500/20",
      iconColor: "text-orange-500",
      iconBg: "bg-orange-500/10",
    },
  ];

  const topClients = [
    { name: "Emma Williams", bookings: 15, revenue: 22350, commission: 3352.5 },
    { name: "Sarah Johnson", bookings: 12, revenue: 15420, commission: 2313 },
    { name: "Michael Chen", bookings: 8, revenue: 9870, commission: 1480.5 },
    { name: "David Lee", bookings: 6, revenue: 7650, commission: 1147.5 },
    { name: "Lisa Anderson", bookings: 5, revenue: 6420, commission: 963 },
  ];

  const categoryPerformance = [
    { category: "Food Tours", bookings: 45, revenue: 12450, percentage: 28 },
    { category: "History", bookings: 38, revenue: 9870, percentage: 23 },
    { category: "Water Sports", bookings: 32, revenue: 15600, percentage: 19 },
    { category: "Museums", bookings: 28, revenue: 7840, percentage: 16 },
    { category: "Day Trips", bookings: 25, revenue: 11250, percentage: 14 },
  ];

  const monthlyData = [
    { month: "Jan", revenue: 42000, commission: 6300 },
    { month: "Feb", revenue: 38000, commission: 5700 },
    { month: "Mar", revenue: 45000, commission: 6750 },
    { month: "Apr", revenue: 52000, commission: 7800 },
    { month: "May", revenue: 48000, commission: 7200 },
    { month: "Jun", revenue: 57240, commission: 8586 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">Reports & Analytics</h1>
          <p className="text-xs text-muted-foreground">Track your performance and commission earnings</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select defaultValue={timeRange}>
            <SelectTrigger className="w-full sm:w-[180px] border-border/30 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-border/30 w-full sm:w-auto text-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={`kpi-card bg-gradient-to-br ${stat.color} ${stat.borderColor} hover-lift`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`h-10 w-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-5 lg:p-6">
                <div className="text-lg sm:text-xl font-semibold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">{stat.change}</span>
                  <span>from last period</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="hover-lift">
          <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent pb-3 sm:pb-4">
            <CardTitle className="text-sm font-semibold">Top Clients</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Highest revenue generating clients</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 lg:p-6 pt-4 sm:pt-5 lg:pt-6">
            <div className="overflow-x-auto scrollbar-hide -mx-4 sm:mx-0">
              <Table className="min-w-[600px] sm:min-w-0">
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-border/30">
                  <TableHead className="font-semibold text-foreground">Client</TableHead>
                  <TableHead className="font-semibold text-foreground">Bookings</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Revenue</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topClients.map((client, index) => (
                  <TableRow key={client.name} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                          {index + 1}
                        </div>
                        <span className="font-semibold">{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{client.bookings}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${client.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-green-500">
                      ${client.commission.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent pb-3 sm:pb-4">
            <CardTitle className="text-sm font-semibold">Category Performance</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Bookings by experience category</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 lg:p-6 pt-4 sm:pt-5 lg:pt-6">
            <div className="space-y-4 sm:space-y-5">
              {categoryPerformance.map((item) => (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{item.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{item.bookings} bookings</span>
                      <span className="font-semibold">${item.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover-lift">
        <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent pb-3 sm:pb-4">
          <CardTitle className="text-sm font-semibold">Monthly Revenue Trend</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Revenue and commission over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 lg:p-6 pt-4 sm:pt-5 lg:pt-6">
          <div className="space-y-3 sm:space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{data.month}</span>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-muted-foreground">Revenue: </span>
                      <span className="font-semibold">${data.revenue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Commission: </span>
                      <span className="font-semibold text-green-500">
                        ${data.commission.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div
                    className="h-1.5 bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                    style={{ width: `${(data.revenue / 60000) * 100}%` }}
                  />
                  <div
                    className="h-1.5 bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                    style={{ width: `${(data.commission / 9000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
