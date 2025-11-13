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
      className="border-r border-border/40 bg-background/98 backdrop-blur-2xl shadow-2xl"
    >
      <SidebarContent className="px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        {!collapsed && (
          <div className="mb-4 sm:mb-6 lg:mb-8 px-3 sm:px-4 pb-3 sm:pb-4 lg:pb-6 border-b border-border/30">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-lg ring-2 ring-primary/20">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-foreground">B2B Travel</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-semibold">Professional Platform</p>
              </div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mb-4 sm:mb-6 flex justify-center">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-lg ring-2 ring-primary/20">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 sm:px-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3 lg:mb-4">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 sm:space-y-1.5 lg:space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="relative flex items-center gap-2 sm:gap-3 lg:gap-4 rounded-xl px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold text-foreground transition-all duration-300 hover:text-foreground hover:bg-primary/5 group before:absolute before:left-0 before:top-1/2 before:h-6 sm:before:h-8 lg:before:h-10 before:w-0.5 sm:before:w-1 lg:before:w-1.5 before:-translate-y-1/2 before:rounded-r-full before:bg-transparent before:transition-all before:duration-300"
                      activeClassName="text-foreground bg-primary/10 before:bg-primary font-bold shadow-md"
                    >
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                      {!collapsed && <span className="tracking-tight">{item.title}</span>}
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
