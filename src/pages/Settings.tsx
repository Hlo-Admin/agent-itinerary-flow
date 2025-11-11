import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account and application preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>Update your travel agency details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agency-name">Agency Name</Label>
              <Input id="agency-name" placeholder="Your Travel Agency" defaultValue="TravelHub Agency" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" type="email" placeholder="contact@agency.com" defaultValue="info@travelhub.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license">License Number</Label>
              <Input id="license" placeholder="License #" defaultValue="TRV-2024-12345" />
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email updates for new bookings</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Payment Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when payments are received</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Booking Reminders</p>
              <p className="text-sm text-muted-foreground">Reminders for upcoming travel dates</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>Configure payment methods and commission rates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="commission">Default Commission Rate (%)</Label>
            <Input id="commission" type="number" placeholder="10" defaultValue="12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Input id="currency" placeholder="USD" defaultValue="USD" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Update Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
