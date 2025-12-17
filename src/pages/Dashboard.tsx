import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Mock data for KPIs
  const currentMonth = {
    ticketCount: 99999,
    ticketValue: 12500000,
  };

  const yearCumulative = {
    ticketCount: 99999,
    ticketValue: 50000000,
  };

  // Mock data for Top 10 Parks Pie Chart (equal segments for design)
  const topParksData = [
    { name: "Park 1", value: 10 },
    { name: "Park 2", value: 10 },
    { name: "Park 3", value: 10 },
    { name: "Park 4", value: 10 },
    { name: "Park 5", value: 10 },
    { name: "Park 6", value: 10 },
    { name: "Park 7", value: 10 },
    { name: "Park 8", value: 10 },
    { name: "Park 9", value: 10 },
    { name: "Park 10", value: 10 },
  ];

  const COLORS = ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#172554', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'];

  // Mock data for Last 6 Fort Nights Bar Chart
  const fortNightsData = [
    { period: "FN 1", tickets: 450, value: 88 },
    { period: "FN 2", tickets: 520, value: 102 },
    { period: "FN 3", tickets: 480, value: 94 },
    { period: "FN 4", tickets: 600, value: 118 },
    { period: "FN 5", tickets: 550, value: 108 },
    { period: "FN 6", tickets: 620, value: 121 },
  ];

  // Mock data for Day-wise Sales (Recent Booking - Transaction History)
  // Columns: Month (Apr to Mar) - this will be shown as day-wise within current period
  const dayWiseSales = [
    { day: "Day 1", month: "Apr", count: 145, value: 125000 },
    { day: "Day 2", month: "Apr", count: 152, value: 142000 },
    { day: "Day 3", month: "Apr", count: 138, value: 108000 },
    { day: "Day 4", month: "Apr", count: 161, value: 168000 },
    { day: "Day 5", month: "Apr", count: 147, value: 132000 },
    { day: "Day 6", month: "Apr", count: 155, value: 151000 },
    { day: "Day 7", month: "Apr", count: 143, value: 119000 },
  ];

  // Mock data for Month-wise Sales (Annual Summary) - Apr to Mar
  const monthWiseSales = [
    { month: "Apr", count: 4200, value: 4250000 },
    { month: "May", count: 4350, value: 4780000 },
    { month: "Jun", count: 4280, value: 4620000 },
    { month: "Jul", count: 4450, value: 4980000 },
    { month: "Aug", count: 4320, value: 4710000 },
    { month: "Sep", count: 4180, value: 4420000 },
    { month: "Oct", count: 4420, value: 4910000 },
    { month: "Nov", count: 4390, value: 4850000 },
    { month: "Dec", count: 4520, value: 5120000 },
    { month: "Jan", count: 4480, value: 5030000 },
    { month: "Feb", count: 4410, value: 4890000 },
    { month: "Mar", count: 4550, value: 5180000 },
  ];

  // Mock data for Category-wise Performance
  const categoryWiseData = [
    { category: "Adventure", count: 420, value: 980000 },
    { category: "Historical", count: 380, value: 890000 },
    { category: "Nature", count: 350, value: 820000 },
    { category: "Cultural", count: 320, value: 750000 },
    { category: "Entertainment", count: 290, value: 680000 },
  ];

  // Mock data for Last 12 Month Parks wise Summary
  const months = ["Dec 2025", "Nov 2025", "Oct 2025", "Sep 2025", "Aug 2025", "Jul 2025", "Jun 2025", "May 2025", "Apr 2025", "Mar 2025", "Feb 2025", "Jan 2025"];
  const parksWiseSummary = [
    {
      parkName: "Central Park",
      eventName: "City Tour",
      monthData: months.map(() => ({ count: Math.floor(Math.random() * 500) + 100, value: Math.floor(Math.random() * 500000) + 100000 })),
    },
    {
      parkName: "Mountain View",
      eventName: "Adventure Trail",
      monthData: months.map(() => ({ count: Math.floor(Math.random() * 500) + 100, value: Math.floor(Math.random() * 500000) + 100000 })),
    },
    {
      parkName: "Riverside Park",
      eventName: "Nature Walk",
      monthData: months.map(() => ({ count: Math.floor(Math.random() * 500) + 100, value: Math.floor(Math.random() * 500000) + 100000 })),
    },
    {
      parkName: "Historical Museum",
      eventName: "Heritage Tour",
      monthData: months.map(() => ({ count: Math.floor(Math.random() * 500) + 100, value: Math.floor(Math.random() * 500000) + 100000 })),
    },
    {
      parkName: "Sunset Beach",
      eventName: "Beach Tour",
      monthData: months.map(() => ({ count: Math.floor(Math.random() * 500) + 100, value: Math.floor(Math.random() * 500000) + 100000 })),
    },
  ];

  // Calculate totals for parks wise summary
  const parksWiseTotals = parksWiseSummary.map(park => {
    const totalCount = park.monthData.reduce((sum, m) => sum + m.count, 0);
    const totalValue = park.monthData.reduce((sum, m) => sum + m.value, 0);
    return { totalCount, totalValue };
  });

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN');
  };

  // Format currency
  const formatCurrency = (num: number) => {
    return `₹${num.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">LOCAL ATTRACTIONS - DASH BOARD</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="agency-name" className="text-sm font-semibold whitespace-nowrap">AGENCY NAME:</Label>
            <Input
              id="agency-name"
              type="text"
              placeholder="Enter Agency Name"
              className="w-48 h-9 border-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="agency-balance" className="text-sm font-semibold whitespace-nowrap">AGENCY BALAN:</Label>
            <Input
              id="agency-balance"
              type="text"
              placeholder="Balance"
              className="w-32 h-9 border-2"
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Month */}
        <Card className="border-2 border-blue-600 shadow-lg">
          <CardHeader className="bg-blue-600 text-white py-3">
            <CardTitle className="text-lg font-bold">Cur Month</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Tkt #:</span>
              <span className="text-lg font-bold">{formatNumber(currentMonth.ticketCount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Tkt $:</span>
              <span className="text-lg font-bold">{formatCurrency(currentMonth.ticketValue)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Year Cumulative */}
        <Card className="border-2 border-blue-600 shadow-lg">
          <CardHeader className="bg-blue-600 text-white py-3">
            <CardTitle className="text-lg font-bold">Year Cumulative</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Tkt #:</span>
              <span className="text-lg font-bold">{formatNumber(yearCumulative.ticketCount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Tkt $:</span>
              <span className="text-lg font-bold">{formatCurrency(yearCumulative.ticketValue)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Parks Sales Pie Chart */}
        <Card className="border-2 border-border shadow-lg">
          <CardHeader className="bg-gray-100 py-3 border-b-2 border-gray-300">
            <CardTitle className="text-base font-bold">Top 10 Parks Sales Pie Chart</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={topParksData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topParksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Last 6 Fort Nights Bar Chart */}
        <Card className="border-2 border-border shadow-lg">
          <CardHeader className="bg-gray-100 py-3 border-b-2 border-gray-300">
            <CardTitle className="text-base font-bold">
              Last 6 Fort Nights No. of Tickets & Trans Value in '000
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={fortNightsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="tickets" fill="#3b82f6" name="Tickets" />
                <Bar yAxisId="right" dataKey="value" fill="#10b981" name="Value ('000)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Last 12 Month Parks wise Summary Section */}
      <Card className="border-2 border-border shadow-lg">
        <CardHeader className="bg-blue-600 text-white py-3">
          <CardTitle className="text-base font-bold">Last 12 Month Parks wise Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs border-2 border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold sticky left-0 bg-gray-100 z-10">Park Name</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold sticky left-24 bg-gray-100 z-10">Event Name</th>
                  {months.map((month, index) => (
                    <th key={index} className="border border-gray-300 px-2 py-2 text-center font-semibold min-w-[100px]">
                      {month.split(' ')[0]} {month.split(' ')[1].slice(2)}
                    </th>
                  ))}
                  <th className="border border-gray-300 px-3 py-2 text-center font-semibold bg-blue-50">12 Months Tran Counts #</th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-semibold bg-blue-50">12 Month Tran Value</th>
                </tr>
              </thead>
              <tbody>
                {parksWiseSummary.map((park, parkIndex) => (
                  <tr key={parkIndex} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 font-semibold sticky left-0 bg-white z-10">{park.parkName}</td>
                    <td className="border border-gray-300 px-3 py-2 sticky left-24 bg-white z-10">{park.eventName}</td>
                    {park.monthData.map((monthData, monthIndex) => (
                      <td key={monthIndex} className="border border-gray-300 px-2 py-2 text-right">
                        <div className="text-xs">
                          <div>#{formatNumber(monthData.count)}</div>
                          <div className="text-muted-foreground">₹{formatNumber(Math.round(monthData.value / 1000))}K</div>
                        </div>
                      </td>
                    ))}
                    <td className="border border-gray-300 px-3 py-2 text-right font-semibold bg-blue-50">
                      {formatNumber(parksWiseTotals[parkIndex].totalCount)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-semibold bg-blue-50">
                      {formatCurrency(parksWiseTotals[parkIndex].totalValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Booking - Transaction History */}
        <Card className="lg:col-span-2 border-2 border-border shadow-lg">
          <CardHeader className="bg-blue-600 text-white py-3">
            <CardTitle className="text-base font-bold">Recent Booking - Tran History</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Day wise Sales Count & Tran Value with Totals</h3>
              <p className="text-xs text-muted-foreground mb-3">Columns: Month (Apr to Mar)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm border-2 border-gray-300">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Day</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Month</th>
                    <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Count #</th>
                    <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Tran Value</th>
                  </tr>
                </thead>
                <tbody>
                  {dayWiseSales.map((day, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">{day.day}</td>
                      <td className="border border-gray-300 px-3 py-2">{day.month}</td>
                      <td className="border border-gray-300 px-3 py-2 text-right">{formatNumber(day.count)}</td>
                      <td className="border border-gray-300 px-3 py-2 text-right">{formatCurrency(day.value)}</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold">
                    <td colSpan={2} className="border border-gray-300 px-3 py-2">Total</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">
                      {formatNumber(dayWiseSales.reduce((sum, day) => sum + day.count, 0))}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right">
                      {formatCurrency(dayWiseSales.reduce((sum, day) => sum + day.value, 0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Annual Summary */}
        <Card className="border-2 border-border shadow-lg">
          <CardHeader className="bg-blue-600 text-white py-3">
            <CardTitle className="text-base font-bold">Annual Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Month wise Sales Count & Tran Value with Totals</h3>
              <p className="text-xs text-muted-foreground mb-3">Columns: Month (Apr to Mar)</p>
            </div>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full border-collapse text-xs border-2 border-gray-300">
                <thead className="sticky top-0 bg-gray-100 z-10">
                  <tr className="border-b-2 border-gray-300">
                    <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Month</th>
                    <th className="border border-gray-300 px-2 py-2 text-right font-semibold">Count #</th>
                    <th className="border border-gray-300 px-2 py-2 text-right font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {monthWiseSales.map((month, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-2">{month.month}</td>
                      <td className="border border-gray-300 px-2 py-2 text-right">{formatNumber(month.count)}</td>
                      <td className="border border-gray-300 px-2 py-2 text-right">{formatCurrency(month.value)}</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold">
                    <td className="border border-gray-300 px-2 py-2">Total</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">
                      {formatNumber(monthWiseSales.reduce((sum, month) => sum + month.count, 0))}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-right">
                      {formatCurrency(monthWiseSales.reduce((sum, month) => sum + month.value, 0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Category wise Performance */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3">Category wise Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs border-2 border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Category</th>
                      <th className="border border-gray-300 px-2 py-2 text-right font-semibold">Count #</th>
                      <th className="border border-gray-300 px-2 py-2 text-right font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryWiseData.map((cat, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2">{cat.category}</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">{formatNumber(cat.count)}</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">{formatCurrency(cat.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
