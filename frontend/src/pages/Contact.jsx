import SiteHeader from "@/components/site-header"
import { Card, CardContent} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const Contact = () => {

  const navigate = useNavigate()
  const emptyForm = { name: "", email: "", message: "" }
  const [formData, setFormData] = useState(emptyForm)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) {
      navigate('/login')
    }
  }, [navigate])

  function handleInputChange(event) {
    const { id, value } = event.target
    setFormData({ ...formData, [id]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    toast.success("Issue reported successfully!")
    setFormData(emptyForm)
  }

  return (
    <>
      <SiteHeader title="Support" />
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-3xl font-bold tracking-tight text-transparent">Report an Issue</h1>
          <p className="text-muted-foreground text-sm">Facing a bug or need help? Let us know below.</p>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Describe the Issue</Label>
                <Textarea 
                  id="message" 
                  placeholder="What went wrong? Steps to reproduce, if any..." 
                  rows={4} 
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Submit Report</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Contact