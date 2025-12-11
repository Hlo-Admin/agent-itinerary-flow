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
                      className={(props) => {
                        const isActive = item.url === "/" 
                          ? location.pathname === "/"
                          : location.pathname.startsWith(item.url);
                        return `relative flex flex-col items-center justify-center rounded-md px-0 py-8 w-full transition-all duration-300 ${
                          isActive ? 'bg-muted/80' : ''
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
                            <div className="transition-all duration-300 flex items-center justify-center">
                              <item.icon 
                                className={`h-6 w-6 transition-all duration-300 ${isActive ? 'text-foreground stroke-[2]' : 'text-foreground/70'}`}
                                strokeWidth={1.5} 
                              />
                            </div>
                            {!collapsed && (
                              <span className={`text-xs text-center w-full leading-tight transition-all duration-300 ${isActive ? 'text-foreground font-semibold' : 'text-foreground/70 font-normal'}`}>
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
