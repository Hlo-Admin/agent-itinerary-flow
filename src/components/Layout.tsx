import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SidebarProvider,
  useSidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Menu,
  LayoutGrid,
  Maximize2,
  Bell,
  CircleDollarSign,
  Plus,
  Bookmark,
  User,
  LogOut,
  List,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function SidebarMenuButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 sm:h-11 sm:w-11 hover:bg-muted/50 rounded-lg transition-all"
      onClick={toggleSidebar}
    >
      <Menu className="!h-6 !w-6" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [showExtendedSidebar, setShowExtendedSidebar] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreditLimit, setShowCreditLimit] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Only show extended sidebar if explicitly toggled, don't auto-show on route change
  // The extended sidebar should be hidden by default

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error("Error attempting to exit fullscreen:", err);
      });
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "5rem",
          "--sidebar-width-icon": "5rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        showExtendedSidebar={showExtendedSidebar}
        setShowExtendedSidebar={setShowExtendedSidebar}
      />
      <SidebarInset className="flex flex-col h-svh w-full min-w-0 overflow-hidden">
        {!showExtendedSidebar && (
          <header className="h-10 sm:h-11 border-b border-border/20 bg-background backdrop-blur-sm flex items-center justify-between px-3 sm:px-4 flex-shrink-0 z-50 shadow-sm">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-2xl">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-lg flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground hidden sm:block">LA</span>
              </div>
              <SidebarMenuButton />
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Apps/Grid Icon - Shortcuts */}
              <Popover open={showShortcuts} onOpenChange={setShowShortcuts}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground"
                  >
                    <LayoutGrid className="!h-6 !w-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-80 p-0 gap-0" 
                  align="end"
                  sideOffset={8}
                >
                  {/* Blue Header Bar */}
                  <div className="bg-primary rounded-t-lg px-4 py-2.5 flex items-center justify-between">
                    <span className="text-white font-medium text-sm">Shortcuts</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-white hover:bg-white/20 rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* White Card Content */}
                  <div className="p-6 flex flex-col items-center justify-center bg-background rounded-b-lg">
                    <div className="flex flex-col items-center gap-4">
                      <Bookmark className="h-10 w-10 text-primary/40" strokeWidth={1.5} fill="none" />
                      <div className="text-center space-y-1.5">
                        <p className="text-base font-semibold text-foreground">No shortcuts</p>
                        <p className="text-sm text-muted-foreground">
                          When you have shortcuts, they will appear here.
                        </p>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Maximize/Fullscreen Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                <Maximize2 className="!h-6 !w-6" />
              </Button>

              {/* Notification Bell */}
              <Popover open={showNotifications} onOpenChange={setShowNotifications}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground relative"
                  >
                    <Bell className="!h-6 !w-6" />
                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-80 p-0 gap-0" 
                  align="end"
                  sideOffset={8}
                >
                  {/* Blue Header Bar */}
                  <div className="bg-primary rounded-t-lg px-4 py-2.5 flex items-center justify-between">
                    <span className="text-white font-medium text-sm">Notifications</span>
                  </div>

                  {/* White Card Content */}
                  <div className="p-6 flex flex-col items-center justify-center bg-background rounded-b-lg">
                    <div className="flex flex-col items-center gap-4">
                      <Bell className="h-10 w-10 text-primary/40" strokeWidth={1.5} fill="none" />
                      <div className="text-center space-y-1.5">
                        <p className="text-base font-semibold text-foreground">No notifications</p>
                        <p className="text-sm text-muted-foreground">
                          When you have notifications, they will appear here.
                        </p>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Currency/Dollar Icon - Credit Limit */}
              <Popover open={showCreditLimit} onOpenChange={setShowCreditLimit}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground"
                  >
                    <CircleDollarSign className="!h-6 !w-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-72 p-0 gap-0" 
                  align="end"
                  sideOffset={8}
                >
                  {/* Blue Header Bar */}
                  <div className="bg-primary rounded-t-lg px-4 py-2.5 flex items-center justify-between">
                    <span className="text-white font-medium text-sm">Credit Limit</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-white hover:bg-white/20 rounded-full"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* White Card Content */}
                  <div className="p-4 bg-background rounded-b-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Credit Limit</span>
                      <span className="text-sm font-semibold text-destructive">60,000.00 AED</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Credit Utilized</span>
                      <span className="text-sm font-semibold text-destructive">0.00 AED</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                      <span className="text-xs font-medium text-foreground">Current Balance</span>
                      <span className="text-sm font-semibold text-destructive">60,000.00 AED</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* User Avatar - Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="outline-none">
                    <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-border/50 hover:ring-primary/50 transition-all">
                      <AvatarImage
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxpTZCmFkj1ydyZrkkxlyxEvijxB0aNtDCeQ&s"
                        alt="User"
                      />
                      <AvatarFallback className="bg-primary text-white text-xs font-semibold">
                        U
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-xs text-muted-foreground">Signed in as:</p>
                      <p className="text-sm font-medium">vishnuit2@convergentplatforms.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
        )}
        <main className="flex-1 overflow-y-auto w-full min-w-0 scrollbar-hide flex flex-col">
          <div className={cn(
            "w-full mx-auto min-w-0 box-border animate-fade-in flex-1",
            location.pathname === "/bookings" ? "" : "p-3 sm:p-4 md:p-5 lg:p-6"
          )}>
            {children}
          </div>
        </main>
        
        {/* Footer - Full Width */}
        <footer className="w-full border-t border-border/30 bg-background px-6 sm:px-8 lg:px-10 py-3 flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <p>© 2025. All rights reserved.</p>
            <nav className="flex items-center gap-4 sm:gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact Us</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </nav>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
