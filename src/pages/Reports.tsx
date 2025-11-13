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
      color: "text-primary",
    },
    {
      title: "Total Bookings",
      value: "168",
      change: "+12.5%",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Active Clients",
      value: "94",
      change: "+8.3%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Avg Commission",
      value: "15.2%",
      change: "+2.1%",
      icon: Percent,
      color: "text-purple-600",
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground text-sm">Track your performance and commission earnings</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue={timeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-success" />
                  <span className="text-success font-medium">{stat.change}</span>
                  <span>from last period</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Clients</CardTitle>
            <CardDescription>Highest revenue generating clients</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topClients.map((client, index) => (
                  <TableRow key={client.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{client.bookings}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${client.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-success">
                      ${client.commission.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Bookings by experience category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.category}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">{item.bookings} bookings</span>
                      <span className="font-semibold">${item.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
          <CardDescription>Revenue and commission over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{data.month}</span>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-muted-foreground">Revenue: </span>
                      <span className="font-semibold">${data.revenue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Commission: </span>
                      <span className="font-semibold text-success">
                        ${data.commission.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div
                    className="h-2 bg-primary rounded"
                    style={{ width: `${(data.revenue / 60000) * 100}%` }}
                  />
                  <div
                    className="h-2 bg-success rounded"
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

