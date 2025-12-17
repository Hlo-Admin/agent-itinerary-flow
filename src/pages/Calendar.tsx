import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Users, Clock } from "lucide-react";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const bookings = [
    {
      id: "1",
      date: new Date(2024, 5, 15),
      client: "Sarah Johnson",
      destination: "Paris Food Tour",
      time: "09:00",
      guests: 2,
      status: "confirmed",
    },
    {
      id: "2",
      date: new Date(2024, 5, 18),
      client: "Michael Chen",
      destination: "Tokyo History Walk",
      time: "14:00",
      guests: 1,
      status: "confirmed",
    },
    {
      id: "3",
      date: new Date(2024, 5, 20),
      client: "Emma Williams",
      destination: "Bali Water Sports",
      time: "10:00",
      guests: 4,
      status: "pending",
    },
    {
      id: "4",
      date: new Date(2024, 5, 22),
      client: "James Brown",
      destination: "Rome Museum Tour",
      time: "15:30",
      guests: 2,
      status: "confirmed",
    },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const getBookingsForDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return bookings.filter(
      (booking) =>
        booking.date.getDate() === date.getDate() &&
        booking.date.getMonth() === date.getMonth() &&
        booking.date.getFullYear() === date.getFullYear()
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const todayBookings = bookings.filter(
    (booking) =>
      booking.date.getDate() === new Date().getDate() &&
      booking.date.getMonth() === new Date().getMonth() &&
      booking.date.getFullYear() === new Date().getFullYear()
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">Calendar</h1>
          <p className="text-xs text-muted-foreground">View and manage your bookings schedule</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="month">
            <SelectTrigger className="w-full sm:w-[140px] border-border/30 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="day">Day View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <Card className="hover-lift">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent pb-3 sm:pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  {monthNames[currentMonth]} {currentYear}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")} className="border-border/30">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => navigateMonth("next")} className="border-border/30">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-3 sm:pt-4 lg:pt-6">
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-1.5 sm:p-2 text-center text-[10px] sm:text-xs md:text-sm font-semibold text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const dayBookings = getBookingsForDate(day);
                  const isToday =
                    day === new Date().getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear();

                  return (
                    <div
                      key={day}
                      className={`aspect-square p-1 sm:p-1.5 md:p-2 border rounded-md sm:rounded-lg transition-all hover:shadow-md ${
                        isToday ? "bg-primary/10 border-primary shadow-sm ring-1 ring-primary/20" : "border-border/30 hover:border-primary/30"
                      }`}
                    >
                      <div
                        className={`text-[10px] sm:text-xs md:text-sm font-medium mb-0.5 sm:mb-1 ${
                          isToday ? "text-primary font-bold" : "text-foreground"
                        }`}
                      >
                        {day}
                      </div>
                      {dayBookings.length > 0 && (
                        <div className="space-y-1">
                          {dayBookings.slice(0, 2).map((booking) => (
                            <div
                              key={booking.id}
                              className={`text-[9px] sm:text-xs p-0.5 sm:p-1 rounded truncate transition-all ${
                                booking.status === "confirmed"
                                  ? "bg-primary/20 text-primary border border-primary/30"
                                  : "bg-muted text-muted-foreground border border-border/30"
                              }`}
                            >
                              {booking.time}
                            </div>
                          ))}
                          {dayBookings.length > 2 && (
                            <div className="text-xs text-muted-foreground font-medium">
                              +{dayBookings.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card className="hover-lift">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent pb-3 sm:pb-4">
              <CardTitle className="text-sm font-semibold">Today's Bookings</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {todayBookings.length} booking{todayBookings.length !== 1 ? "s" : ""} scheduled
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 lg:p-6 pt-4 sm:pt-5 lg:pt-6">
              {todayBookings.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {todayBookings.map((booking) => (
                    <div key={booking.id} className="space-y-1.5 sm:space-y-2 p-3 sm:p-4 rounded-lg border border-border/30 bg-gradient-to-br from-background to-muted/10 hover:border-primary/30 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="font-semibold text-sm">{booking.destination}</div>
                          <div className="text-xs text-muted-foreground">{booking.client}</div>
                        </div>
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"} className="ml-2">
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {booking.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {booking.guests}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No bookings scheduled for today
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent pb-3 sm:pb-4">
              <CardTitle className="text-sm font-semibold">Upcoming</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 lg:p-6 pt-4 sm:pt-5 lg:pt-6">
              <div className="space-y-2 sm:space-y-3">
                {bookings
                  .filter((booking) => booking.date > new Date())
                  .slice(0, 5)
                  .map((booking) => (
                    <div key={booking.id} className="space-y-1 p-3 sm:p-4 rounded-lg border border-border/30 bg-gradient-to-br from-background to-muted/10 hover:border-primary/30 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-sm">{booking.destination}</div>
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {booking.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at {booking.time}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
