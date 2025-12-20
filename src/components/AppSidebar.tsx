import React from "react";
import { useLocation } from "react-router-dom";
import { Home, Calendar, Sparkles, ChevronDown, ChevronRight, X } from "lucide-react";
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
  { title: "Dashboard", url: "/dashboard", icon: Home, subItems: [
    { title: "Visa Dashboard", url: "/dashboard/visa" },
    { title: "LA Dashboard", url: "/", },
  ]},
  { title: "LA Bookings", url: "/bookings", icon: Calendar },
];

export function AppSidebar({ showExtendedSidebar, setShowExtendedSidebar }: { showExtendedSidebar: boolean; setShowExtendedSidebar: (show: boolean) => void }) {
  const { state, isMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const toggleExtendedSidebar = () => {
    setShowExtendedSidebar(prev => !prev);
  };

  const closeExtendedSidebar = () => {
    setShowExtendedSidebar(false);
  };

  const dashboardSubItems = [
    { title: "Visa Dashboard", url: "/dashboard/visa" },
    { title: "LA Dashboard", url: "/" },
  ];

  return (
    <>
      {/* Extended Sidebar for Dashboard */}
      {showExtendedSidebar && (
        <div 
          className="fixed left-0 top-0 h-screen w-56 bg-sidebar border-r border-sidebar-border z-[60] flex flex-col shadow-lg transition-all duration-300"
          style={{ 
            marginLeft: collapsed ? "5rem" : "5rem"
          }}
        >
          <div className="p-4 border-b border-sidebar-border/30 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-sidebar-foreground">Dashboard</h3>
            <button
              onClick={closeExtendedSidebar}
              className="h-6 w-6 flex items-center justify-center rounded hover:bg-sidebar-accent transition-colors"
            >
              <X className="h-4 w-4 text-sidebar-foreground/70" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <nav className="space-y-1">
              {dashboardSubItems.map((subItem) => {
                const isActive = location.pathname === subItem.url;
                return (
                  <NavLink
                    key={subItem.url}
                    to={subItem.url}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition-all duration-300 ${
                      isActive 
                        ? 'bg-sidebar-accent text-sidebar-foreground font-semibold' 
                        : 'text-sidebar-foreground/70 font-medium hover:bg-sidebar-accent/50'
                    }`}
                    activeClassName=""
                    onClick={() => {
                      closeExtendedSidebar();
                    }}
                  >
                    {subItem.title}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Sidebar */}
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
              {items.map((item, index) => {
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isActive = item.url === "/dashboard"
                  ? (location.pathname === "/" || location.pathname.startsWith("/dashboard"))
                  : location.pathname.startsWith(item.url);
                const isSubItemActive = hasSubItems && item.subItems?.some(subItem => location.pathname === subItem.url);

                return (
                  <React.Fragment key={item.title}>
                    <SidebarMenuItem className="w-full">
                      {hasSubItems ? (
                        <SidebarMenuButton
                          onClick={toggleExtendedSidebar}
                          className={`w-full m-0 relative flex flex-col items-center justify-center rounded-lg px-2 py-2 min-h-[44px] transition-all duration-300 ${
                            (isActive || isSubItemActive || showExtendedSidebar) ? 'bg-sidebar-accent shadow-sm' : 'hover:bg-sidebar-accent/50'
                          }`}
                        >
                          <div className="flex flex-col items-center w-full gap-1">
                            <div className="transition-all duration-300 flex items-center justify-center w-full">
                              <item.icon 
                                className={`h-4 w-4 transition-all duration-300 flex-shrink-0 ${(isActive || isSubItemActive || showExtendedSidebar) ? 'text-sidebar-foreground' : 'text-sidebar-foreground/70'}`}
                                strokeWidth={(isActive || isSubItemActive || showExtendedSidebar) ? 2.5 : 2} 
                              />
                            </div>
                            {!collapsed && (
                              <span className={`text-[10px] text-center w-full leading-tight transition-all duration-300 ${(isActive || isSubItemActive || showExtendedSidebar) ? 'text-sidebar-foreground font-semibold' : 'text-sidebar-foreground/70 font-medium'}`}>
                                {item.title}
                              </span>
                            )}
                          </div>
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton asChild className="w-full m-0">
                          <NavLink
                            to={item.url}
                            end={item.url === "/"}
                            className={`relative flex flex-col items-center justify-center rounded-lg px-2 py-2 w-full min-h-[44px] transition-all duration-300 ${
                              isActive ? 'bg-sidebar-accent shadow-sm' : 'hover:bg-sidebar-accent/50'
                            }`}
                            activeClassName=""
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
                      )}
                    </SidebarMenuItem>
                  </React.Fragment>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </>
  );
}
