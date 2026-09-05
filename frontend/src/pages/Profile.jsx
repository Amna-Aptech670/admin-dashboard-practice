import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useSelector } from 'react-redux'
import { User, Mail, Calendar } from "lucide-react"

const Profile = () => {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No user data found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          Profile
        </h1>
        <p className="text-muted-foreground text-sm">Your account information.</p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              {user.name ? user.name.charAt(0).toUpperCase() : "?"}
            </div>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          {user.createdAt && (
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Joined:</span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile