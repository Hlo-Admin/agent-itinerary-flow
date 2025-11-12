import { Home, Calendar, Settings } from "lucide-react";
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
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="glass border-r border-border/20 backdrop-blur-2xl">
      <SidebarContent className="bg-transparent p-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold text-primary mb-10 px-4 tracking-tight">
            {!collapsed && "LocalLens"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-5 py-3.5 mx-1 rounded-2xl transition-all duration-300 hover:bg-primary/8 hover:shadow-sm hover:translate-x-0.5 relative group"
                      activeClassName="bg-gradient-to-r from-primary/12 to-primary/8 text-primary font-semibold shadow-md border border-primary/10"
                    >
                      <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      {!collapsed && <span className="text-sm font-semibold">{item.title}</span>}
                      {!collapsed && <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>}
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
