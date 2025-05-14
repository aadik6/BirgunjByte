import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./Admin/app-sidebar"
import { Outlet } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import { useEffect } from "react";
export default function AdminLayout() {
  const {refreshToken} = useAuthStore();
  useEffect(() => {
    refreshToken();
  },[])
  return (
      <div className="bg-gradient-to-br from-background to-muted ">
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen container mx-auto  py-8 px-4">
        <SidebarTrigger />
        <Outlet/>
      </main>
    </SidebarProvider>
      </div>
  )
}
