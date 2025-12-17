import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, Bell, CreditCard, Building2, User } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">Settings</h1>
        <p className="text-xs text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="agency" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-10 sm:h-12 bg-muted/30 backdrop-blur-sm p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-border/20 shadow-sm">
          <TabsTrigger 
            value="agency" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-blue data-[state=active]:to-accent-indigo data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-blue/30 font-medium sm:font-semibold transition-all duration-300 rounded-md sm:rounded-lg text-xs sm:text-sm"
          >
            <Building2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Agency
          </TabsTrigger>
          <TabsTrigger 
            value="account"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-purple data-[state=active]:to-accent-pink data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-purple/30 font-medium sm:font-semibold transition-all duration-300 rounded-md sm:rounded-lg text-xs sm:text-sm"
          >
            <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger 
            value="notifications"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-emerald data-[state=active]:to-accent-teal data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-emerald/30 font-medium sm:font-semibold transition-all duration-300 rounded-md sm:rounded-lg text-xs sm:text-sm"
          >
            <Bell className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="payment"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-amber data-[state=active]:to-accent-rose data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-amber/30 font-medium sm:font-semibold transition-all duration-300 rounded-md sm:rounded-lg text-xs sm:text-sm"
          >
            <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Payment
          </TabsTrigger>
          <TabsTrigger 
            value="security"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-cyan data-[state=active]:to-accent-teal data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-cyan/30 font-medium sm:font-semibold transition-all duration-300 rounded-md sm:rounded-lg text-xs sm:text-sm"
          >
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agency" className="space-y-4 sm:space-y-6 animate-fade-in">
          <Card className="hover-lift border-border/20">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent pb-3 sm:pb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Agency Information</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Update your travel agency details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5 pt-4 sm:pt-5 lg:pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agency-name" className="text-sm font-medium">Agency Name</Label>
                  <Input id="agency-name" placeholder="Your Travel Agency" defaultValue="Codetez" className="border-border/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-sm font-medium">Contact Email</Label>
                  <Input id="contact-email" type="email" placeholder="contact@agency.com" defaultValue="info@codetez.com" className="border-border/30" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" className="border-border/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license" className="text-sm font-medium">License Number</Label>
                  <Input id="license" placeholder="License #" defaultValue="LIC-2024-12345" className="border-border/30" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax-id" className="text-sm font-medium">Tax ID / VAT Number</Label>
                  <Input id="tax-id" placeholder="Tax ID" className="border-border/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium">Website</Label>
                  <Input id="website" placeholder="https://yourwebsite.com" className="border-border/30" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">Business Address</Label>
                <Textarea id="address" placeholder="Street address, City, State, ZIP" rows={3} className="border-border/30" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="hover-lift border-border/20">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Business Details</CardTitle>
                  <CardDescription>Additional business information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select defaultValue="travel-agency">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="travel-agency">Travel Agency</SelectItem>
                      <SelectItem value="tour-operator">Tour Operator</SelectItem>
                      <SelectItem value="dmo">Destination Management Organization</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Agency Description</Label>
                <Textarea id="description" placeholder="Brief description of your agency" rows={4} />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6 animate-fade-in">
          <Card className="hover-lift border-border/20">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  <User className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Profile Information</CardTitle>
                  <CardDescription>Update your personal account details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-email">Email Address</Label>
                <Input id="account-email" type="email" placeholder="john@example.com" defaultValue="john@codetez.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-phone">Phone Number</Label>
                <Input id="account-phone" placeholder="+1 (555) 000-0000" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="hover-lift border-border/20">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10">
                  <Shield className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="bg-gradient-to-r from-accent-blue to-accent-indigo hover:from-accent-blue/90 hover:to-accent-indigo/90 shadow-lg shadow-accent-blue/30">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 animate-fade-in">
          <Card className="hover-lift border-border/20">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                  <Bell className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Email Notifications</CardTitle>
                  <CardDescription>Configure email notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-border/20 bg-gradient-to-br from-background to-muted/10 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                <div>
                  <p className="font-medium text-sm">New Booking Alerts</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Receive email when a new booking is created</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-border/20 bg-gradient-to-br from-background to-muted/10 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                <div>
                  <p className="font-medium text-sm">Payment Alerts</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Get notified when payments are received</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-border/20 bg-gradient-to-br from-background to-muted/10 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                <div>
                  <p className="font-medium text-sm">Booking Reminders</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Reminders for upcoming travel dates</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-border/20 bg-gradient-to-br from-background to-muted/10 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                <div>
                  <p className="font-medium text-sm">Commission Updates</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Notifications about commission payments</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-border/20 bg-gradient-to-br from-background to-muted/10 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                <div>
                  <p className="font-medium text-sm">System Updates</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Important system announcements and updates</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6 animate-fade-in">
          <Card className="hover-lift border-border/20">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/10 to-rose-500/10">
                  <CreditCard className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Payment Settings</CardTitle>
                  <CardDescription>Configure payment methods and commission rates</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="commission">Default Commission Rate (%)</Label>
                <Input id="commission" type="number" placeholder="10" defaultValue="12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD - US Dollar</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                    <SelectItem value="gbp">GBP - British Pound</SelectItem>
                    <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input id="tax-rate" type="number" placeholder="0" defaultValue="8.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-fee">Service Fee (%)</Label>
                <Input id="service-fee" type="number" placeholder="0" defaultValue="2.5" />
              </div>
              <Button className="bg-gradient-to-r from-accent-blue to-accent-indigo hover:from-accent-blue/90 hover:to-accent-indigo/90 shadow-lg shadow-accent-blue/30">Update Settings</Button>
            </CardContent>
          </Card>

          <Card className="hover-lift border-border/20">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                  <CreditCard className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Credit Limit</CardTitle>
                  <CardDescription>Manage your agent credit limit</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="credit-limit">Current Credit Limit</Label>
                <Input id="credit-limit" type="number" placeholder="50000" defaultValue="50000" />
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald/10 to-emerald/5 border border-emerald/20">
                <p className="text-sm text-muted-foreground mb-2 font-medium">Available Credit</p>
                <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">$17,500.00</p>
              </div>
              <Button variant="outline" className="border-accent-blue/50 hover:bg-accent-blue/5 hover:border-accent-blue">Request Credit Increase</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 animate-fade-in">
          <Card className="hover-lift border-border/20">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10">
                  <Shield className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-gradient-to-r from-background to-muted/20 hover:border-accent-cyan/30 transition-all duration-300">
                <div>
                  <p className="font-medium text-sm">Enable 2FA</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Require a verification code in addition to your password</p>
                </div>
                <Switch />
              </div>
              <Button variant="outline" className="border-accent-cyan/50 hover:bg-accent-cyan/5 hover:border-accent-cyan">Setup Authenticator App</Button>
            </CardContent>
          </Card>

          <Card className="hover-lift border-border/20">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-muted/30 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                  <Shield className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Active Sessions</CardTitle>
                  <CardDescription>Manage your active login sessions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-gradient-to-r from-background to-muted/20 hover:border-accent-indigo/30 transition-all duration-300">
                <div>
                  <p className="font-medium text-sm">Current Session</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Windows • Chrome • New York, USA</p>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-gradient-to-r from-background to-muted/20 hover:border-accent-indigo/30 transition-all duration-300">
                <div>
                  <p className="font-medium text-sm">Mobile Device</p>
                  <p className="text-xs text-muted-foreground mt-0.5">iOS • Safari • San Francisco, USA</p>
                </div>
                <Button variant="outline" size="sm">Revoke</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
