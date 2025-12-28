import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { TrendingUp, DollarSign, Ticket, Calendar } from "lucide-react";

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

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA15E', '#BC4749', '#6A994E', '#A663CC', '#2A9D8F'];

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

  // Pie Chart Options
  const pieChartOption = useMemo(() => ({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: {
        color: '#1e293b',
        fontSize: 12
      }
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      top: 'center',
      textStyle: {
        color: '#1e293b',
        fontSize: 12
      },
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        name: 'Parks',
        type: 'pie',
        radius: ['30%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#ffffff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {d}%',
          fontSize: 11,
          color: '#1e293b'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold'
          }
        },
        data: topParksData.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: COLORS[index % COLORS.length]
          }
        })),
        animation: true,
        animationType: 'scale'
      }
    ]
  }), [topParksData]);

  // Bar Chart Options
  const barChartOption = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: {
        color: '#1e293b',
        fontSize: 12
      }
    },
    legend: {
      data: ['Tickets', "Value ('000)"],
      textStyle: {
        color: '#1e293b',
        fontSize: 12
      },
      itemWidth: 10,
      itemHeight: 10,
      top: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: fortNightsData.map(item => item.period),
      axisLabel: {
        color: '#64748b',
        fontSize: 12
      },
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Tickets',
        position: 'left',
        axisLabel: {
          color: '#2196F3',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: '#2196F3'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#e2e8f0',
            opacity: 0.3,
            type: 'dashed'
          }
        }
      },
      {
        type: 'value',
        name: "Value ('000)",
        position: 'right',
        axisLabel: {
          color: '#4ECDC4',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: '#4ECDC4'
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: 'Tickets',
        type: 'bar',
        yAxisIndex: 0,
        data: fortNightsData.map(item => item.tickets),
        itemStyle: {
          color: '#2196F3',
          borderRadius: [8, 8, 0, 0]
        }
      },
      {
        name: "Value ('000)",
        type: 'bar',
        yAxisIndex: 1,
        data: fortNightsData.map(item => item.value),
        itemStyle: {
          color: '#4ECDC4',
          borderRadius: [8, 8, 0, 0]
        }
      }
    ]
  }), [fortNightsData]);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-4 sm:mb-6">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">Analytics Overview</h1>
          <p className="text-xs text-muted-foreground mt-1">Real-time monitoring & analytics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <Label htmlFor="agency-name" className="text-xs sm:text-sm font-medium whitespace-nowrap">Agency Name:</Label>
            <Input
              id="agency-name"
              type="text"
              placeholder="Enter Agency Name"
              className="w-full sm:w-48 h-9 text-sm border-border/30 focus:border-primary/50"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <Label htmlFor="agency-balance" className="text-xs sm:text-sm font-medium whitespace-nowrap">Balance:</Label>
            <Input
              id="agency-balance"
              type="text"
              placeholder="Balance"
              className="w-full sm:w-32 h-9 text-sm border-border/30 focus:border-primary/50"
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="kpi-card bg-orange-500/10 border-orange-500/20 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-1">TOTAL TRANSACTIONS</p>
                <p className="text-base sm:text-lg font-semibold text-foreground">{formatNumber(currentMonth.ticketCount)}</p>
              </div>
              <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-green-500/10 border-green-500/20 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-1">TOTAL SALES</p>
                <p className="text-base sm:text-lg font-semibold text-foreground">{formatCurrency(currentMonth.ticketValue)}</p>
              </div>
              <div className="h-9 w-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-blue-500/10 border-blue-500/20 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-1">CURRENT MONTH</p>
                <p className="text-base sm:text-lg font-semibold text-foreground">{formatNumber(currentMonth.ticketCount)}</p>
              </div>
              <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-purple-500/10 border-purple-500/20 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-1">YEAR CUMULATIVE</p>
                <p className="text-base sm:text-lg font-semibold text-foreground">{formatCurrency(yearCumulative.ticketValue)}</p>
              </div>
              <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Ticket className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Top 10 Parks Sales Pie Chart */}
        <Card className="hover-lift">
          <CardHeader className="border-b border-border/20 bg-muted/30 pb-3 sm:pb-4">
            <CardTitle className="text-sm font-semibold">Top 10 Parks Sales Pie Chart</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 pt-4 sm:pt-5">
            <ReactECharts
              option={pieChartOption}
              style={{ height: '280px', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </CardContent>
        </Card>

        {/* Last 6 Fort Nights Bar Chart */}
        <Card className="hover-lift">
          <CardHeader className="border-b border-border/20 bg-muted/30 pb-3 sm:pb-4">
            <CardTitle className="text-sm font-semibold">
              Last 6 Fort Nights - Tickets & Transaction Value
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 pt-4 sm:pt-5">
            <ReactECharts
              option={barChartOption}
              style={{ height: '280px', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Last 12 Month Parks wise Summary Section */}
      <Card className="hover-lift">
        <CardHeader className="border-b border-border/20 bg-gradient-to-r from-primary/10 to-transparent pb-3 sm:pb-4">
          <CardTitle className="text-sm font-semibold">Last 12 Month Parks wise Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 lg:p-6 pt-4 sm:pt-5 lg:pt-6">
          <div className="overflow-x-auto scrollbar-hide -mx-4 sm:mx-0">
            <table className="w-full border-collapse text-xs sm:text-sm min-w-[600px] sm:min-w-0">
              <thead>
                <tr className="border-b border-border/30 bg-muted/30">
                  <th className="px-4 py-3 text-left font-semibold text-foreground sticky left-0 bg-muted/30 z-10">Park Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground sticky left-32 bg-muted/30 z-10">Event Name</th>
                  {months.map((month, index) => (
                    <th key={index} className="px-3 py-3 text-center font-semibold text-foreground min-w-[100px]">
                      {month.split(' ')[0]} {month.split(' ')[1].slice(2)}
                    </th>
                  ))}
                    <th className="px-2 py-2 text-center text-xs font-semibold bg-primary/5 text-foreground">12M Count</th>
                    <th className="px-2 py-2 text-center text-xs font-semibold bg-primary/5 text-foreground">12M Value</th>
                </tr>
              </thead>
              <tbody>
                {parksWiseSummary.map((park, parkIndex) => (
                  <tr key={parkIndex} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                    <td className="px-2 py-2 text-xs font-medium sticky left-0 bg-card z-10">{park.parkName}</td>
                    <td className="px-2 py-2 text-xs sticky left-32 bg-card z-10">{park.eventName}</td>
                    {park.monthData.map((monthData, monthIndex) => (
                      <td key={monthIndex} className="px-2 py-2 text-right">
                        <div className="text-xs">
                          <div className="font-medium">#{formatNumber(monthData.count)}</div>
                          <div className="text-[10px] text-muted-foreground">₹{formatNumber(Math.round(monthData.value / 1000))}K</div>
                        </div>
                      </td>
                    ))}
                    <td className="px-2 py-2 text-xs text-right font-semibold bg-primary/5">
                      {formatNumber(parksWiseTotals[parkIndex].totalCount)}
                    </td>
                    <td className="px-2 py-2 text-xs text-right font-semibold bg-primary/5">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Booking - Transaction History */}
        <Card className="lg:col-span-2 hover-lift">
          <CardHeader className="border-b border-border/20 bg-primary/10 pb-3 sm:pb-4">
            <CardTitle className="text-sm font-semibold">Recent Booking - Transaction History</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 pt-4 sm:pt-5">
            <div className="mb-3">
              <h3 className="text-xs font-semibold mb-0.5">Day wise Sales Count & Transaction Value</h3>
              <p className="text-[10px] text-muted-foreground">Columns: Month (Apr to Mar)</p>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-4 sm:mx-0">
              <table className="w-full border-collapse text-xs sm:text-sm min-w-[500px] sm:min-w-0">
                <thead>
                  <tr className="border-b border-border/30 bg-muted/30">
                    <th className="px-3 py-2 text-left text-xs font-semibold text-foreground">Day</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-foreground">Month</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-foreground">Count #</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-foreground">Tran Value</th>
                  </tr>
                </thead>
                <tbody>
                  {dayWiseSales.map((day, index) => (
                    <tr key={index} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                      <td className="px-3 py-2 text-xs">{day.day}</td>
                      <td className="px-3 py-2 text-xs">{day.month}</td>
                      <td className="px-3 py-2 text-xs text-right font-medium">{formatNumber(day.count)}</td>
                      <td className="px-3 py-2 text-xs text-right font-medium">{formatCurrency(day.value)}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary/5 font-bold border-t-2 border-border/30">
                    <td colSpan={2} className="px-3 py-2 text-xs">Total</td>
                    <td className="px-3 py-2 text-xs text-right">
                      {formatNumber(dayWiseSales.reduce((sum, day) => sum + day.count, 0))}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatCurrency(dayWiseSales.reduce((sum, day) => sum + day.value, 0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Annual Summary */}
        <Card className="hover-lift">
          <CardHeader className="border-b border-border/20 bg-primary/10 pb-3 sm:pb-4">
            <CardTitle className="text-sm font-semibold">Annual Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 pt-4 sm:pt-5">
            <div className="mb-3">
              <h3 className="text-xs font-semibold mb-0.5">Month wise Sales</h3>
              <p className="text-[10px] text-muted-foreground">Columns: Month (Apr to Mar)</p>
            </div>
            <div className="overflow-x-auto max-h-80 sm:max-h-96 overflow-y-auto scrollbar-hide -mx-4 sm:mx-0">
              <table className="w-full border-collapse text-[10px] sm:text-xs min-w-[300px] sm:min-w-0">
                <thead className="sticky top-0 bg-muted/30 z-10">
                  <tr className="border-b border-border/30">
                    <th className="px-2 py-1.5 text-left text-[10px] sm:text-xs font-semibold text-foreground">Month</th>
                    <th className="px-2 py-1.5 text-right text-[10px] sm:text-xs font-semibold text-foreground">Count #</th>
                    <th className="px-2 py-1.5 text-right text-[10px] sm:text-xs font-semibold text-foreground">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {monthWiseSales.map((month, index) => (
                    <tr key={index} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                      <td className="px-2 py-1.5 text-[10px] sm:text-xs font-medium">{month.month}</td>
                      <td className="px-2 py-1.5 text-[10px] sm:text-xs text-right">{formatNumber(month.count)}</td>
                      <td className="px-2 py-1.5 text-[10px] sm:text-xs text-right">{formatCurrency(month.value)}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary/5 font-bold border-t-2 border-border/30">
                    <td className="px-2 py-1.5 text-[10px] sm:text-xs">Total</td>
                    <td className="px-2 py-1.5 text-[10px] sm:text-xs text-right">
                      {formatNumber(monthWiseSales.reduce((sum, month) => sum + month.count, 0))}
                    </td>
                    <td className="px-2 py-1.5 text-[10px] sm:text-xs text-right">
                      {formatCurrency(monthWiseSales.reduce((sum, month) => sum + month.value, 0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Category wise Performance */}
            <div className="mt-4">
              <h3 className="text-xs font-semibold mb-2">Category wise Performance</h3>
              <div className="space-y-2">
                {categoryWiseData.map((cat, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{cat.category}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{cat.count} bookings</span>
                        <span className="font-semibold">{formatCurrency(cat.value)}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${(cat.value / 980000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
