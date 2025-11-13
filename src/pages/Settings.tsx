import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-5xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-base font-medium">Manage your account and preferences.</p>
      </div>

      <Card className="p-10 border-0">
        <div className="space-y-7">
          <div>
            <CardTitle className="text-2xl font-bold">Agency Information</CardTitle>
            <CardDescription className="text-sm mt-1.5 font-medium">Update your travel agency details</CardDescription>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agency-name" className="text-sm font-semibold">Agency Name</Label>
                <Input id="agency-name" placeholder="Your Travel Agency" defaultValue="Codetez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-sm font-semibold">Contact Email</Label>
                <Input id="contact-email" type="email" placeholder="contact@agency.com" defaultValue="info@codetez.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license" className="text-sm font-semibold">License Number</Label>
                <Input id="license" placeholder="License #" defaultValue="LIC-2024-12345" />
              </div>
            </div>
            <Button className="mt-3 h-11 px-6">Save Changes</Button>
          </div>
        </div>
      </Card>

      <Card className="p-10 border-0">
        <div className="space-y-7">
          <div>
            <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
            <CardDescription className="text-sm mt-1.5 font-medium">Configure your notification preferences</CardDescription>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-5 rounded-2xl bg-muted/30 hover:bg-muted/40 transition-all duration-300">
              <div>
                <p className="font-semibold text-foreground text-base">Email Notifications</p>
                <p className="text-sm text-muted-foreground mt-0.5">Receive email updates for new bookings</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-5 rounded-2xl bg-muted/30 hover:bg-muted/40 transition-all duration-300">
              <div>
                <p className="font-semibold text-foreground text-base">Payment Alerts</p>
                <p className="text-sm text-muted-foreground mt-0.5">Get notified when payments are received</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-5 rounded-2xl bg-muted/30 hover:bg-muted/40 transition-all duration-300">
              <div>
                <p className="font-semibold text-foreground text-base">Booking Reminders</p>
                <p className="text-sm text-muted-foreground mt-0.5">Reminders for upcoming travel dates</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-10 border-0">
        <div className="space-y-7">
          <div>
            <CardTitle className="text-2xl font-bold">Payment Settings</CardTitle>
            <CardDescription className="text-sm mt-1.5 font-medium">Configure payment methods and commission rates</CardDescription>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="commission" className="text-sm font-semibold">Default Commission Rate (%)</Label>
              <Input id="commission" type="number" placeholder="10" defaultValue="12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-sm font-semibold">Default Currency</Label>
              <Input id="currency" placeholder="USD" defaultValue="USD" />
            </div>
            <Button className="mt-3 h-11 px-6">Update Settings</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
