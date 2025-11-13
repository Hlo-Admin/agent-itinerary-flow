import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-secondary/30 to-muted/20">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-20 glass border-b border-border/30 flex items-center justify-between px-10 sticky top-0 z-10 backdrop-blur-xl">
            <div className="flex items-center gap-6">
              <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-all rounded-2xl p-2.5 duration-300" />
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                LocalLens
              </h1>
            </div>
            <div className="flex items-center gap-5">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-sm flex items-center justify-center text-white font-semibold text-sm hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer">
                A
              </div>
            </div>
          </header>
          <main className="flex-1 p-10 overflow-auto">
            <div className="max-w-7xl mx-auto animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
