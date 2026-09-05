import { Link, useLocation, useNavigate } from "react-router-dom"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,} from "@/components/ui/sidebar"
import { LayoutDashboard, List, PlusCircle, Command, CircleUser, LogIn, UserKey, LogOut, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"

const navItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    title: "Product List",
    path: "/products",
    icon: <List className="size-4" />,
  },
  {
    title: "Add Product",
    path: "/add-product",
    icon: <PlusCircle className="size-4" />,
  },
  {
    title: "Support",
    path: "/contact",
    icon: <CircleUser className="size-4" />,
  },
]

const AppSidebar = ({ ...props }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  function handleLogout() {
    localStorage.removeItem('currentUser')
    toast.success("Logged out successfully!")
    navigate('/login')
  }

  const filteredNavItems = navItems.filter(item => {
    if (currentUser) {
      return item.path !== '/login' && item.path !== '/signup'
    }
    return true
  })

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/50 p-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="hover:bg-transparent">
              <Link to="/" className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-xl border border-primary/30">
                  <Command className="size-6 text-primary drop-shadow-[0_0_10px_oklch(0.65_0.25_265/0.5)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight">Admin</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium">Dashboard v1.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild
                  className={`relative transition-all duration-300 group ${
                    isActive 
                      ? "bg-accent/50 text-accent-foreground shadow-[0_0_15px_oklch(0.65_0.22_265/0.2)] border-l-2 border-primary" 
                      : "hover:bg-accent/30"
                  }`}
                >
                  <Link to={item.path} className="flex items-center gap-3 px-4">
                    <div className={`${isActive ? "text-primary drop-shadow-[0_0_5px_oklch(0.65_0.22_265/0.5)]" : "text-muted-foreground group-hover:text-foreground"}`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
         
        {currentUser && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                className="w-full gap-2 justify-start hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to login again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        
        {!currentUser && (
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full gap-2 justify-start"
              onClick={() => navigate('/login')}
            >
              <LogIn className="size-4" />
              Login
            </Button>
            <Button 
              variant="default" 
              className="w-full gap-2 justify-start"
              onClick={() => navigate('/signup')}
            >
              <UserKey className="size-4" />
              Sign Up
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
