import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar" 
import ThemeToggle from "@/components/theme-toggle"

const DashboardLayout = () => {
  return (
    <SidebarProvider className="w-full">
      <AppSidebar />
      <SidebarInset className="bg-background min-h-screen w-full">
        <SidebarTrigger className="fixed left-4 top-4 z-50 lg:hidden" />
        <ThemeToggle className="fixed right-4 top-4 z-50 shadow-sm" />
        <main className="flex-1 p-8 pt-16 lg:p-10 lg:pt-16">
          <Outlet />  
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout