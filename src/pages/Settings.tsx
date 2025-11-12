import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your account and preferences.</p>
      </div>

      <Card className="p-10 border-0">
        <div className="space-y-8">
          <div>
            <CardTitle className="text-2xl font-semibold">Agency Information</CardTitle>
            <CardDescription className="text-base mt-2">Update your travel agency details</CardDescription>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agency-name">Agency Name</Label>
                <Input id="agency-name" placeholder="Your Travel Agency" defaultValue="Codetez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" placeholder="contact@agency.com" defaultValue="info@codetez.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">License Number</Label>
                <Input id="license" placeholder="License #" defaultValue="LIC-2024-12345" />
              </div>
            </div>
            <Button className="mt-4">Save Changes</Button>
          </div>
        </div>
      </Card>

      <Card className="p-10 border-0">
        <div className="space-y-8">
          <div>
            <CardTitle className="text-2xl font-semibold">Notifications</CardTitle>
            <CardDescription className="text-base mt-2">Configure your notification preferences</CardDescription>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 rounded-2xl bg-muted/20 hover:bg-muted/30 transition-colors duration-300">
              <div>
                <p className="font-semibold text-foreground text-lg">Email Notifications</p>
                <p className="text-sm text-muted-foreground mt-1">Receive email updates for new bookings</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-6 rounded-2xl bg-muted/20 hover:bg-muted/30 transition-colors duration-300">
              <div>
                <p className="font-semibold text-foreground text-lg">Payment Alerts</p>
                <p className="text-sm text-muted-foreground mt-1">Get notified when payments are received</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-6 rounded-2xl bg-muted/20 hover:bg-muted/30 transition-colors duration-300">
              <div>
                <p className="font-semibold text-foreground text-lg">Booking Reminders</p>
                <p className="text-sm text-muted-foreground mt-1">Reminders for upcoming travel dates</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-10 border-0">
        <div className="space-y-8">
          <div>
            <CardTitle className="text-2xl font-semibold">Payment Settings</CardTitle>
            <CardDescription className="text-base mt-2">Configure payment methods and commission rates</CardDescription>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="commission">Default Commission Rate (%)</Label>
              <Input id="commission" type="number" placeholder="10" defaultValue="12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Input id="currency" placeholder="USD" defaultValue="USD" />
            </div>
            <Button className="mt-4">Update Settings</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
