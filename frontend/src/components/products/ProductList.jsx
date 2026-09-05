import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import SiteHeader from "../site-header"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Spinner } from "../ui/spinner"

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")

   const navigate = useNavigate()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) {
      navigate('/login')
    }
  }, [navigate])

  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://6a2258865c61035328699e51.mockapi.io/Products"
      )

      setProducts(response.data)
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch products.")
    }
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `https://6a2258865c61035328699e51.mockapi.io/Products/${id}`
      )

      toast.success("Product deleted successfully!")
      getProducts()
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete product.")
    }
  }

  const handleEditClick = (product) => {
    setEditingProduct(product)
    setTitle(product.name || product.title || "")
    setDescription(product.description || "")
    setPrice(product.price || "")
    setImage(product.image || "")
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      name: title,
      description,
      price,
      image,
    }

    try {
      setIsSaving(true)

      await axios.put(
        `https://6a2258865c61035328699e51.mockapi.io/Products/${editingProduct.id}`,
        updatedProduct
      )

      toast.success("Product updated successfully!")

      setIsEditDialogOpen(false)
      setEditingProduct(null)

      getProducts()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update product.")
    } finally {
      setIsSaving(false)
    }
  }

  if (products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6 flex justify-between">
          <SiteHeader title="Products" />

          <Link to="/add-product">
            <Button>Add Product</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="py-12 text-center">
            <p>No products found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6 flex justify-between">
          <h1 className="text-2xl font-bold">Products</h1>

          <Link to="/add-product">
            <Button>Add Product</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-4">Id</th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-4">{product.id}</td>

                    <td className="p-4">
                      <Link to={`/products-detail/${product.id}`}>
                      <img
                        src={product.image || "https://via.placeholder.com/50"}
                        alt={product.name || product.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                      </Link>
                    </td>

                    <td className="p-4 font-medium">
                      <Link to={`/products-detail/${product.id}`}>
                        {product.name || product.title}
                      </Link>
                    </td>

                    <td className="p-4">{product.description}</td>

                    <td className="p-4">Rs. {product.price}</td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(product)}
                        >
                          Edit
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>

                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete "
                                {product.name || product.title}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                Cancel
                              </AlertDialogCancel>

                              <AlertDialogAction
                                onClick={() => deleteProduct(product.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate}>
            <div className="space-y-4 py-4">
              <div>
                <Label>Product Name</Label>

                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <Label>Description</Label>

                <Input
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                />
              </div>

              <div>
                <Label>Image URL</Label>

                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="my-2 h-20 w-20 rounded object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80"
                    }}
                  />
                )}

                <Input
                  type="url"
                  value={image}
                  placeholder="https://example.com/image.jpg"
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setIsEditDialogOpen(false)
                  setEditingProduct(null)
                }}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isSaving}>
                {isSaving && <Spinner className="mr-2" />}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProductList