import React from "react";
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
      variant="sidebar"
      className="border-r border-border/30 bg-background"
      style={{ 
        "--sidebar-width": "6rem",
        "--sidebar-width-icon": "6rem"
      } as React.CSSProperties}
    >
      <SidebarContent className="px-2 py-4 w-full">
        {!collapsed && (
          <div className="mb-4 pb-3 border-b border-border/20">
            <div className="flex flex-col items-center gap-1.5">
              <div className="relative h-12 w-12 rounded-lg bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-[16px]  text-foreground text-center">B2B</h2>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mb-4 flex justify-center">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple flex items-center justify-center shadow-lg cursor-pointer">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-5">
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="relative flex flex-col items-center justify-center rounded-md px-0 py-8 w-full transition-all duration-300 hover:bg-muted/20 group"
                      activeClassName="bg-muted/30 "
                    >
                      <div className="flex flex-col  w-full gap-0">
                      <div className="transition-all duration-300 flex items-center justify-center w-16 h-8">
                          <item.icon className="h-7 w-7 text-foreground transition-all duration-300" strokeWidth={2.5} style={{ color: 'rgb(0, 0, 0)' }} />
                        </div>
                        {!collapsed && (
                          <span className="text-xs text-foreground text-center w-full leading-tight mb-1" style={{ opacity: 1, fontWeight: 700, display: 'block', color: 'rgb(0, 0, 0)' }}>
                            {item.title}
                          </span>
                        )}
                        
                      </div>
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
