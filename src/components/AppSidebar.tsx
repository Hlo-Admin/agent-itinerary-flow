import React from "react";
import { useLocation } from "react-router-dom";
import { Home, Calendar, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "LA Dashboard", url: "/", icon: Home },
  { title: "LA Bookings", url: "/bookings", icon: Calendar },
];

export function AppSidebar({ showExtendedSidebar, setShowExtendedSidebar }: { showExtendedSidebar: boolean; setShowExtendedSidebar: (show: boolean) => void }) {
  const { state, isMobile, setOpen, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const handleMenuItemClick = () => {
    // Close the sidebar when a menu item is clicked
    if (isMobile) {
      // On mobile, close the offcanvas sidebar
      setOpenMobile(false);
    } else {
      // On desktop, collapse the sidebar if it's expanded
      if (!collapsed) {
        setOpen(false);
      }
    }
  };

  return (
    <Sidebar 
      collapsible="offcanvas" 
      variant="sidebar"
      className="border-r border-sidebar-border bg-sidebar"
      style={{ 
        "--sidebar-width": "5rem",
        "--sidebar-width-icon": "5rem"
      } as React.CSSProperties}
    >
      <SidebarContent className="px-2 py-4 w-full scrollbar-hide flex flex-col">
        {!collapsed && (
          <div className="mb-4 pb-3 border-b border-sidebar-border/30">
            <div className="flex flex-col items-center gap-1.5">
              <div className="relative h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xs text-sidebar-foreground text-center font-medium">LA</h2>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mb-4 flex justify-center">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow-lg cursor-pointer">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
        <SidebarGroup className="p-0 flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5 w-full">
              {items.map((item) => {
                const isActive = item.url === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title} className="w-full">
                    <SidebarMenuButton asChild className="w-full m-0">
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={`relative flex flex-col items-center justify-center rounded-lg px-2 py-2 w-full min-h-[44px] transition-all duration-300 ${
                          isActive ? 'bg-sidebar-accent shadow-sm' : 'hover:bg-sidebar-accent/50'
                        }`}
                        activeClassName=""
                        onClick={handleMenuItemClick}
                      >
                        <div className="flex flex-col items-center w-full gap-1">
                          <div className="transition-all duration-300 flex items-center justify-center w-full">
                            <item.icon 
                              className={`h-4 w-4 transition-all duration-300 flex-shrink-0 ${isActive ? 'text-sidebar-foreground' : 'text-sidebar-foreground/70'}`}
                              strokeWidth={isActive ? 2.5 : 2} 
                            />
                          </div>
                          {!collapsed && (
                            <span className={`text-[10px] text-center w-full leading-tight transition-all duration-300 ${isActive ? 'text-sidebar-foreground font-semibold' : 'text-sidebar-foreground/70 font-medium'}`}>
                              {item.title}
                            </span>
                          )}
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
