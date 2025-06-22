import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./Admin/app-sidebar";
import { Outlet } from "react-router-dom";
import { setupInterceptors } from "@/config/axios";
import { useAuthStore } from "@/stores/authStore";
export default function AdminLayout() {
  setupInterceptors(
    () => useAuthStore.getState().token,
    useAuthStore.getState().setToken,
    useAuthStore.getState().updateUser
  );
const {token} = useAuthStore()
  return (
    <div className="bg-gradient-to-br from-background to-muted ">
      <SidebarProvider>
        {token && <AppSidebar />}
        <main className="min-h-screen container mx-auto  py-8 px-4">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
