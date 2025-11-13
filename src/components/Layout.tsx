import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-muted rounded-md p-2 transition-colors" />
              <h1 className="text-xl font-semibold text-foreground tracking-tight">
                LocalLens
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors cursor-pointer">
                A
              </div>
            </div>
          </header>
          <main className="flex-1 p-8 overflow-auto">
            <div className="max-w-7xl mx-auto animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
