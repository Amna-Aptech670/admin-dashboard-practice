import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SiteHeader from "../site-header"
import axios from "axios"
import { Spinner } from "../ui/spinner"
import { toast } from "sonner"

const AddProductForm = () => {
  const navigate = useNavigate()
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  
    useEffect(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if (!currentUser) {
        navigate('/login')
      }
    }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name: title,
      description: description,
      price: price,
      image: image,
    }

  setIsSaving(true)
  
  try {
    await axios.post("https://6a2258865c61035328699e51.mockapi.io/Products", product)

    toast.success("Products added successfully!")
    navigate("/ProductsList")

  } catch (error) {
    console.error(error)
  } finally {
    setIsSaving(false)
  }
    
  }

  return (
    <>
  
      <SiteHeader title="Add Product" />

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <Label>Product Name</Label>
              <Input 
                required
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

             <div>
              <Label>Description</Label>
              <Input 
                required
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
              />
            </div>

            <div>
              <Label>Price (Rs.)</Label>
              <Input 
                type="number"
                required
                min="0"
                step="any"
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
              />
            </div>

            <div>
              <Label>Image URL</Label>
              {image && (
                <img 
                  src={image} 
                  className="w-20 h-20 my-2 object-cover rounded" 
                  alt="Preview"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/80"
                  }}
                />
              )}
              <Input 
                type="url"
                placeholder="https://example.com/image.jpg"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Spinner className="mr-2" />}
                {isSaving ? "Saving..." : "Save Product"}
              </Button>
              <Link to="/products">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  )
}

export default AddProductForm
