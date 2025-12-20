import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SidebarProvider, useSidebar, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      style={{
        "--sidebar-width": "5rem",
        "--sidebar-width-icon": "5rem",
      } as React.CSSProperties}
    >
      <AppSidebar showExtendedSidebar={showExtendedSidebar} setShowExtendedSidebar={setShowExtendedSidebar} />
      <SidebarInset className="flex-1 w-full min-w-0">
        {!showExtendedSidebar && (
          <header className="h-10 sm:h-11 border-b border-border/20 bg-gray-50/95 backdrop-blur-sm flex items-center justify-between px-3 sm:px-4 sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-2xl">
              <SidebarMenuButton />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-sm sm:text-base font-semibold text-foreground">Codetez</span>
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple flex items-center justify-center text-white font-bold text-xs hover:scale-110 hover:shadow-lg hover:shadow-accent-blue/30 transition-all duration-300 cursor-pointer shadow-md ring-2 ring-white/20">
                B
              </div>
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
