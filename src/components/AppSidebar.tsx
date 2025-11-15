import { Home, Calendar, Settings, Users, BarChart3, CalendarDays, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Bookings", url: "/bookings", icon: Calendar },
  { title: "Calendar", url: "/calendar", icon: CalendarDays },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state, isMobile } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border/30 bg-gradient-to-b from-background via-background to-muted/20 backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.03)]"
    >
      <SidebarContent className="px-2 sm:px-3 py-4 sm:py-6 lg:py-8">
        {!collapsed && (
          <div className="mb-6 sm:mb-8 lg:mb-10 px-2 sm:px-3 pb-4 sm:pb-5 lg:pb-6 border-b border-border/20 animate-fade-in">
            <div className="flex items-center gap-3 sm:gap-4 mb-2 group">
              <div className="relative h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-2xl bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple flex items-center justify-center shadow-lg shadow-accent-blue/20 ring-1 ring-white/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-accent-blue/30">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white drop-shadow-sm" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">B2B Travel</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">Professional Platform</p>
              </div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mb-6 sm:mb-8 flex justify-center animate-fade-in">
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple flex items-center justify-center shadow-lg shadow-accent-blue/20 ring-1 ring-white/20 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-accent-blue/30 cursor-pointer">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-sm" />
            </div>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 sm:px-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-3 sm:mb-4 lg:mb-5">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 sm:space-y-1.5 lg:space-y-2">
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="relative flex items-center gap-3 sm:gap-4 lg:gap-5 rounded-xl px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base lg:text-lg font-medium text-foreground/70 transition-all duration-300 hover:text-foreground hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent-blue/5 group overflow-hidden before:absolute before:left-0 before:top-1/2 before:h-8 sm:before:h-10 lg:before:h-12 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-gradient-to-b before:from-accent-blue before:to-accent-indigo before:scale-y-0 before:transition-transform before:duration-300 before:origin-center"
                      activeClassName="text-foreground bg-gradient-to-r from-primary/8 to-accent-blue/8 shadow-sm shadow-primary/5 before:scale-y-100 font-semibold"
                    >
                      <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-all duration-300 group-hover:scale-110">
                          <item.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 transition-all duration-300 group-hover:text-accent-blue flex-shrink-0" />
                        </div>
                        {!collapsed && <span className="tracking-tight transition-all duration-300">{item.title}</span>}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/0 via-accent-blue/5 to-accent-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
