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
      <SidebarContent className="px-3 sm:px-4 lg:px-5 py-5 sm:py-6 lg:py-8">
        {!collapsed && (
          <div className="mb-8 sm:mb-10 lg:mb-12 px-3 sm:px-4 pb-6 sm:pb-7 lg:pb-8 border-b border-border/20 animate-fade-in">
            <div className="flex items-center gap-4 sm:gap-5 mb-3 group">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-2xl bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple flex items-center justify-center shadow-lg shadow-accent-blue/20 ring-1 ring-white/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-accent-blue/30">
                <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white drop-shadow-sm" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">B2B</h2>
                {/* <p className="text-sm sm:text-base text-muted-foreground mt-1 font-medium">Professional Platform</p> */}
              </div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mb-8 sm:mb-10 flex justify-center animate-fade-in">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple flex items-center justify-center shadow-lg shadow-accent-blue/20 ring-1 ring-white/20 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-accent-blue/30 cursor-pointer">
              <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-sm" />
            </div>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 sm:px-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-4 sm:mb-6 lg:mb-8">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 sm:space-y-3 lg:space-y-4">
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="relative flex items-center gap-4 sm:gap-5 lg:gap-6 rounded-xl px-4 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 text-sm sm:text-base lg:text-lg font-medium text-foreground/70 transition-all duration-300 hover:text-foreground hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent-blue/5 group overflow-hidden before:absolute before:left-0 before:top-1/2 before:h-10 sm:before:h-12 lg:before:h-14 before:w-1.5 before:-translate-y-1/2 before:rounded-r-full before:bg-gradient-to-b before:from-accent-blue before:to-accent-indigo before:scale-y-0 before:transition-transform before:duration-300 before:origin-center"
                      activeClassName="text-foreground bg-gradient-to-r from-primary/8 to-accent-blue/8 shadow-sm shadow-primary/5 before:scale-y-100 font-semibold"
                    >
                      <div className="relative z-10 flex items-center gap-4 sm:gap-5 w-full">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                          <item.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 transition-all duration-300 group-hover:text-accent-blue" />
                        </div>
                        {!collapsed && <span className="tracking-tight transition-all duration-300 flex-1">{item.title}</span>}
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
