import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/40">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-20 glass border-b border-border/20 flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-2xl">
            <div className="flex items-center gap-6">
              <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-colors rounded-xl p-2" />
              <h1 className="text-2xl font-bold text-foreground tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                LocalLens
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-md flex items-center justify-center text-white font-bold text-sm hover:scale-110 transition-transform cursor-pointer">
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
