import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account and preferences.</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <CardTitle className="text-lg font-semibold">Agency Information</CardTitle>
            <CardDescription className="text-sm mt-1">Update your travel agency details</CardDescription>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agency-name" className="text-sm font-medium">Agency Name</Label>
                <Input id="agency-name" placeholder="Your Travel Agency" defaultValue="Codetez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-sm font-medium">Contact Email</Label>
                <Input id="contact-email" type="email" placeholder="contact@agency.com" defaultValue="info@codetez.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license" className="text-sm font-medium">License Number</Label>
                <Input id="license" placeholder="License #" defaultValue="LIC-2024-12345" />
              </div>
            </div>
            <Button className="mt-2">Save Changes</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
            <CardDescription className="text-sm mt-1">Configure your notification preferences</CardDescription>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-medium text-foreground text-sm">Email Notifications</p>
                <p className="text-xs text-muted-foreground mt-0.5">Receive email updates for new bookings</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-medium text-foreground text-sm">Payment Alerts</p>
                <p className="text-xs text-muted-foreground mt-0.5">Get notified when payments are received</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-medium text-foreground text-sm">Booking Reminders</p>
                <p className="text-xs text-muted-foreground mt-0.5">Reminders for upcoming travel dates</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <CardTitle className="text-lg font-semibold">Payment Settings</CardTitle>
            <CardDescription className="text-sm mt-1">Configure payment methods and commission rates</CardDescription>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="commission" className="text-sm font-medium">Default Commission Rate (%)</Label>
              <Input id="commission" type="number" placeholder="10" defaultValue="12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-sm font-medium">Default Currency</Label>
              <Input id="currency" placeholder="USD" defaultValue="USD" />
            </div>
            <Button className="mt-2">Update Settings</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
