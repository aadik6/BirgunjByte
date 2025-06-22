import {
  ChevronUp,
  Home,
  Settings,
  User2,
  Notebook,
  NotebookPen,
  Grid2X2CheckIcon,
  Users,
  LogOut,
  UserPen,
  ChartNoAxesCombined,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../theme-toggle";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import NepaliDate from "nepali-date";
import { useAuthStore } from "@/stores/authStore";
import { authLogout } from "@/apis/user";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "News",
    url: "/admin/managenews",
    icon: Notebook,
  },
  {
    title: "Add News",
    url: "/admin/addnews",
    icon: NotebookPen,
  },
  {
    title: "Categories",
    url: "/admin/category",
    icon: Grid2X2CheckIcon,
  },
  {
    title:"Ads",
    url: "/admin/ads",
    icon: ChartNoAxesCombined,   
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/admin/profile",
    icon: Settings,
  },
];

export function AppSidebar() {
  const np = new NepaliDate(new Date()).format("mmmm D, YYYY");
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();
  const {user,setToken} = useAuthStore();
  const logout = async() => {
    try {
      const res = await authLogout();
      if (res.status === 200) {
        setToken(null);
        navigate("/login");
      }
    } catch (err) {
      console.log("logout error", err);
    }
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-between items-center container mx-auto  py-2 px-0 ">
            <div className="flex items-center gap-4">
              <SidebarGroupLabel>
                {np} {time}
              </SidebarGroupLabel>
              <ThemeToggle />
            </div>
          </div>
          <Separator />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => {
                    navigate(`${item.url}`);
                  }}
                  className="cursor-pointer"
                >
                  <SidebarMenuButton asChild>
                    <div>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <div >
                <SidebarMenuButton>
                  <User2 /> {user?.firstName} {user?.lastName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                // side="right"
                className="w-[--radix-popper-anchor-width] bg-background/50 p-2 rounded-md text-sm"

              >
                <DropdownMenuItem className="outline-0 cursor-pointer px-3 py-0.5 hover:bg-accent rounded-sm " onClick={()=>{navigate("/admin/profile")}}>
                  <div className="flex items-center gap-2"><UserPen className="h-4 w-4"/>Account</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer px-3 outline-0 py-0.5 hover:bg-accent rounded-sm" onClick={logout}>
                  <div className="flex items-center gap-2"><LogOut className="w-4 h-4"/>Sign out</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
