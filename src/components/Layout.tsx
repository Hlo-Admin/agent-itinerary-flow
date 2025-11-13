import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 sm:h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-2xl">
              <SidebarTrigger className="hover:bg-muted/50 rounded-lg p-2 transition-all" />
              <div className="relative flex-1 max-w-md hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 h-9 bg-muted/30 border-0 focus-visible:bg-background focus-visible:ring-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-medium text-sm hover:from-primary/90 hover:to-primary/60 transition-all cursor-pointer shadow-sm">
                B
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto w-full min-w-0 max-w-full">
            <div className="w-full max-w-full mx-auto p-1.5 sm:p-6 lg:p-8 animate-fade-in min-w-0 box-border">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
