import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2,
  AlertCircle,
  Ticket,
  Building2,
  Phone,
  Globe
} from "lucide-react";

interface VoucherViewProps {
  onNext: () => void;
  bookingData: any;
}

const VoucherView = ({ onNext, bookingData }: VoucherViewProps) => {
  // Mock voucher data based on provided JSON structure
  // In production, this would come from bookingData or API response
  const voucherData = {
    clientRefNo: "ACT-VCHR-" + Math.random().toString(36).substr(2, 4).toUpperCase(),
    supplierRefNo: "VCHR-SUPP-" + Math.random().toString(36).substr(2, 5).toUpperCase(),
    bookingDate: new Date().toISOString().split('T')[0].replace(/-/g, ''),
    status: "Confirmed",
    totalCost: 0,
    activityInfo: {
      name: "",
      city: "Dubai",
      location: "",
      imagePath: "",
      redemptionAddress: "E-ticket scan at Ground Floor Entrance."
    },
    scheduleInfo: {
      activityDate: "",
      timeSlot: "",
      duration: "90 Minutes",
      meetingPoint: "Main Entrance - Group Tours Desk"
    },
    ticketLst: [] as any[],
    policies: {
      voucherInstructions: "Please present this voucher (printed or mobile) at the designated meeting point 15 minutes prior to your time slot. All participants must carry photo ID.",
      cancellation: "Non-refundable once booked. Changes allowed 7 days prior to activity date, subject to a 10% fee.",
      specialNotes: "Tickets include fast-track entry. Not valid for special events."
    },
    agencyInfo: {
      name: "Global Experience Tours",
      slogan: "Your Local Adventure Starts Here",
      contactEmail: "help@globaltours.com",
      logoUrl: "https://picsum.photos/seed/tours/150/50"
    }
  };

  // Extract booking data from all previous steps
  const adults = bookingData?.adults || [];
  const children = bookingData?.children || [];
  const tour = bookingData?.tour || {};
  const supplier = bookingData?.supplier || {};
  const selectedDate = bookingData?.selectedDate;
  const selectedTimeSlot = bookingData?.selectedTimeSlot;
  const selectedTime = bookingData?.selectedTime;
  const tickets = bookingData?.tickets || { adult: 0, child: 0 };
  
  // Get actual ticket counts
  const adultCount = tickets.adult || adults.length || 2;
  const childCount = tickets.child || children.length || 0;
  
  // Calculate prices from supplier data
  const isPremiumTime = selectedTimeSlot?.type === "premium";
  const adultPrice = isPremiumTime 
    ? (supplier.adultPremiumPrice || supplier.adultPrice || 149) 
    : (supplier.adultPrice || 149);
  const childPrice = isPremiumTime 
    ? (supplier.childPremiumPrice || supplier.childPrice || 99) 
    : (supplier.childPrice || 99);
  const adultTotal = adultPrice * adultCount;
  const childTotal = childPrice * childCount;
  const totalAmount = adultTotal + childTotal;

  // Build ticket list
  const ticketList = [];
  if (adultCount > 0) {
    ticketList.push({
      typeCode: "ADT",
      typeName: "Adult General Admission",
      price: adultPrice,
      currency: "AED",
      quantity: adultCount,
      paxLst: adults.length > 0 
        ? adults.map((a: any, i: number) => ({
            firstName: a.name?.split(' ')[0] || `Adult ${i + 1}`,
            lastName: a.name?.split(' ').slice(1).join(' ') || '',
            title: i === 0 ? "Ms" : "Mr",
            isLead: i === 0
          }))
        : [{ firstName: "Sarah", lastName: "Connor", title: "Ms", isLead: true }]
    });
  }
  if (childCount > 0) {
    ticketList.push({
      typeCode: "CNN",
      typeName: "Child (Age 4-12) Admission",
      price: childPrice,
      currency: "AED",
      quantity: childCount,
      paxLst: children.length > 0
        ? children.map((c: any, i: number) => ({
            firstName: c.name?.split(' ')[0] || `Child ${i + 1}`,
            lastName: c.name?.split(' ').slice(1).join(' ') || '',
            title: "Master",
            isLead: false
          }))
        : [{ firstName: "Timmy", lastName: "Connor", title: "Master", isLead: false }]
    });
  }

  // Update voucher data with actual booking info
  voucherData.totalCost = totalAmount;
  voucherData.activityInfo.name = tour.name || "Burj Khalifa At The Top - 124th Floor";
  voucherData.activityInfo.location = tour.location || "1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai";
  voucherData.activityInfo.imagePath = tour.image || tour.imageUrl || "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=600&fit=crop&auto=format";
  voucherData.scheduleInfo.activityDate = selectedDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  voucherData.scheduleInfo.timeSlot = selectedTimeSlot?.label || selectedTime || "18:00 - 19:00 (Sunset Slot)";
  voucherData.ticketLst = ticketList;

  // Format dates (YYYYMMDD format)
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    // Handle YYYYMMDD format
    if (dateStr.length === 8 && /^\d+$/.test(dateStr)) {
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const date = new Date(`${year}-${month}-${day}`);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatShortDate = (dateStr: string) => {
    if (!dateStr) return '';
    // Handle YYYYMMDD format
    if (dateStr.length === 8 && /^\d+$/.test(dateStr)) {
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const date = new Date(`${year}-${month}-${day}`);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="w-full space-y-4">
      <Card className="overflow-hidden border-0 shadow-none bg-transparent rounded-none">
        {/* Header */}
        <div className="bg-primary p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">{voucherData.agencyInfo.name}</h1>
                <p className="text-xs text-white/80">{voucherData.agencyInfo.slogan}</p>
              </div>
            </div>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(voucherData.clientRefNo)}`}
              alt="QR Code"
              className="w-16 h-16 rounded-lg bg-white p-1"
            />
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Status and Reference */}
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Booking {voucherData.status}!
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase">Client Ref No</p>
              <p className="text-sm font-bold text-primary">{voucherData.clientRefNo}</p>
              <p className="text-[10px] text-muted-foreground mt-1">Supplier: {voucherData.supplierRefNo}</p>
            </div>
          </div>

          {/* Activity Info */}
          <div className="flex gap-4">
            <div className="w-36 h-24 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={voucherData.activityInfo.imagePath}
                alt={voucherData.activityInfo.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=600&fit=crop&auto=format";
                }}
              />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Activity</p>
                <h3 className="text-base font-bold text-foreground">{voucherData.activityInfo.name}</h3>
              </div>
              <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-primary" />
                <span>{voucherData.activityInfo.location}, {voucherData.activityInfo.city}</span>
              </div>
            </div>
          </div>

          {/* Schedule Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Activity Date
              </p>
              <p className="text-sm font-semibold text-foreground">{formatShortDate(voucherData.scheduleInfo.activityDate)}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                <Clock className="h-3 w-3" /> Time Slot
              </p>
              <p className="text-sm font-semibold text-foreground">{voucherData.scheduleInfo.timeSlot}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                <Clock className="h-3 w-3" /> Duration
              </p>
              <p className="text-sm font-semibold text-foreground">{voucherData.scheduleInfo.duration}</p>
            </div>
          </div>

          {/* Meeting Point */}
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
              <MapPin className="h-3 w-3 text-primary" /> Meeting Point
            </p>
            <p className="text-sm font-medium text-foreground">{voucherData.scheduleInfo.meetingPoint}</p>
            <p className="text-xs text-muted-foreground mt-1">{voucherData.activityInfo.redemptionAddress}</p>
          </div>

          {/* Ticket Details */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground uppercase flex items-center gap-1.5">
              <Ticket className="h-4 w-4 text-primary" /> Ticket Details
            </p>
            <div className="space-y-2">
              {voucherData.ticketLst.map((ticket: any, index: number) => (
                <div key={index} className="p-3 rounded-lg border border-border/50 bg-muted/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {ticket.typeCode}
                      </Badge>
                      <span className="text-sm font-medium">{ticket.typeName}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-primary">
                        {ticket.currency} {ticket.price.toFixed(2)} × {ticket.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {ticket.paxLst.map((pax: any, paxIndex: number) => (
                      <div key={paxIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                          {paxIndex + 1}
                        </span>
                        <span>
                          {pax.title} {pax.firstName} {pax.lastName}
                          {pax.isLead && (
                            <Badge variant="outline" className="ml-2 text-[9px] px-1 py-0">Lead</Badge>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200">
            <div>
              <p className="text-xs text-muted-foreground uppercase">Total Amount Paid</p>
              <p className="text-[10px] text-muted-foreground">Booking Date: {formatShortDate(voucherData.bookingDate)}</p>
            </div>
            <p className="text-2xl font-bold text-emerald-600">
              AED {voucherData.totalCost.toFixed(2)}
            </p>
          </div>

          {/* Policies */}
          <div className="space-y-2 p-3 rounded-lg bg-amber-50/50 border border-amber-200/50">
            <p className="text-xs font-semibold text-foreground uppercase flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-amber-600" /> Important Information
            </p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p><strong className="text-foreground">Instructions:</strong> {voucherData.policies.voucherInstructions}</p>
              <p><strong className="text-foreground">Cancellation:</strong> {voucherData.policies.cancellation}</p>
              <p><strong className="text-foreground">Note:</strong> {voucherData.policies.specialNotes}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">{voucherData.agencyInfo.name}</p>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  {voucherData.agencyInfo.contactEmail}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {voucherData.status}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center pb-6 pt-4 bg-background border-t border-border/50">
        <Button className="flex items-center gap-2 shadow-md" onClick={() => window.print()}>
          <Download className="h-4 w-4" />
          Download Voucher
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Send Email
        </Button>
        <Button variant="outline" onClick={onNext}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default VoucherView;
