import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Grid3X3, Users, DollarSign } from "lucide-react"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const stats = [
  { title: "Total Products", value: "5", icon: Package, trend: "+2", color: "text-blue-500" },
  { title: "Total Categories", value: "3", icon: Grid3X3, trend: "Stable", color: "text-emerald-500" },
  { title: "Active Users", value: "124", icon: Users, trend: "+12%", color: "text-indigo-500" },
  { title: "Revenue", value: "Rs. 1.2M", icon: DollarSign, trend: "+8%", color: "text-amber-500" },
]

const Dashboard = () => {
   const navigate = useNavigate()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-3xl font-bold tracking-tight text-transparent">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Summary of your inventory and system performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Card key={i} className="hover:bg-accent/5 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-tight">{s.title}</CardTitle>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-[10px] text-muted-foreground mt-1">{s.trend} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
