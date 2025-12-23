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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function SidebarMenuButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-muted/50 rounded-lg transition-all"
      onClick={toggleSidebar}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [showExtendedSidebar, setShowExtendedSidebar] = useState(false);

  // Only show extended sidebar if explicitly toggled, don't auto-show on route change
  // The extended sidebar should be hidden by default

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
      <SidebarInset className="flex-1 w-full min-w-0">
        {!showExtendedSidebar && (
          <header className="h-10 sm:h-11 border-b border-border/20 bg-gray-50/95 backdrop-blur-sm flex items-center justify-between px-3 sm:px-4 sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-2xl">
              <SidebarMenuButton />
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Apps/Grid Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>

              {/* Maximize Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>

              {/* Notification Bell */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
              </Button>

              {/* Currency/Dollar Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted/50 rounded-lg transition-all text-muted-foreground hover:text-foreground"
              >
                <CircleDollarSign className="h-4 w-4" />
              </Button>

              {/* User Avatar */}
              <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-border/50 hover:ring-primary/50 transition-all">
                <AvatarImage
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxpTZCmFkj1ydyZrkkxlyxEvijxB0aNtDCeQ&s"
                  alt="User"
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white text-xs font-semibold">
                  U
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
        )}
        <main className="flex-1 overflow-y-auto w-full min-w-0 scrollbar-hide">
          <div className="w-full mx-auto p-3 sm:p-4 md:p-5 lg:p-6 animate-fade-in min-w-0 box-border">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
