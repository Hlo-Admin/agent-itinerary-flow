import React from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  return (
    <Sidebar 
      collapsible="icon" 
      variant="sidebar"
      className="border-r border-sidebar-border bg-sidebar"
      style={{ 
        "--sidebar-width": "6rem",
        "--sidebar-width-icon": "6rem"
      } as React.CSSProperties}
    >
      <SidebarContent className="px-3 py-6 w-full scrollbar-hide flex flex-col">
        {!collapsed && (
          <div className="mb-6 pb-4 border-b border-sidebar-border/30">
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-12 w-12 rounded-lg bg-primary flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-sm text-sidebar-foreground text-center font-medium">B2B</h2>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mb-6 flex justify-center">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center shadow-lg cursor-pointer">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
        <SidebarGroup className="p-0 flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5 w-full">
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title} className="w-full">
                  <SidebarMenuButton asChild className="w-full m-0">
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={(props) => {
                        const isActive = item.url === "/" 
                          ? location.pathname === "/"
                          : location.pathname.startsWith(item.url);
                        return `relative flex flex-col items-center justify-center rounded-lg px-2 py-3 w-full min-h-[56px] transition-all duration-300 ${
                          isActive ? 'bg-sidebar-accent shadow-sm' : 'hover:bg-sidebar-accent/50'
                        }`;
                      }}
                      activeClassName=""
                    >
                      {(() => {
                        const isActive = item.url === "/" 
                          ? location.pathname === "/"
                          : location.pathname.startsWith(item.url);
                        return (
                          <div className="flex flex-col items-center w-full gap-1.5">
                            <div className="transition-all duration-300 flex items-center justify-center w-full">
                              <item.icon 
                                className={`h-5 w-5 transition-all duration-300 flex-shrink-0 ${isActive ? 'text-sidebar-foreground' : 'text-sidebar-foreground/70'}`}
                                strokeWidth={isActive ? 2.5 : 2} 
                              />
                            </div>
                            {!collapsed && (
                              <span className={`text-[11px] text-center w-full leading-tight transition-all duration-300 ${isActive ? 'text-sidebar-foreground font-semibold' : 'text-sidebar-foreground/70 font-medium'}`}>
                                {item.title}
                              </span>
                            )}
                          </div>
                        );
                      })()}
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
