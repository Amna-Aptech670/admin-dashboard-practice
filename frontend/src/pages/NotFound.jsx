import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <h1 className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-7xl font-bold text-transparent">
        404
      </h1>
      <p className="mt-4 text-xl font-semibold">Page Not Found</p>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button className="mt-6" onClick={() => navigate('/')}>
        Go Back Home
      </Button>
    </div>
  )
}

export default NotFound