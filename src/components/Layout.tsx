import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "6rem",
        "--sidebar-width-icon": "6rem",
      } as React.CSSProperties}
    >
      <div className="min-h-screen flex w-full bg-background overflow-x-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 w-0">
          <header className="h-14 sm:h-16 border-b border-border/30 bg-background/95 backdrop-blur-2xl flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-2xl">
              {/* <SidebarTrigger className="hover:bg-muted/50 rounded-lg p-2 transition-all" /> */}
              <div className="relative flex-1 max-w-md hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 h-9 bg-muted/30 border-0 focus-visible:bg-background focus-visible:ring-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10 hover:bg-gradient-to-r hover:from-accent-blue/10 hover:to-accent-indigo/10 transition-all duration-300">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 hover:scale-110" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-accent-rose to-accent-pink shadow-lg animate-pulse"></span>
              </Button>
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple flex items-center justify-center text-white font-bold text-sm hover:scale-110 hover:shadow-lg hover:shadow-accent-blue/30 transition-all duration-300 cursor-pointer shadow-md ring-2 ring-white/20">
                B
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto w-full min-w-0">
            <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in min-w-0 box-border">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
