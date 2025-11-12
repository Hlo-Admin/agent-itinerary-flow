import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-20 glass border-b border-border/30 flex items-center px-8 sticky top-0 z-10 backdrop-blur-xl">
            <SidebarTrigger className="mr-6" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">LocalLens</h1>
          </header>
          <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
