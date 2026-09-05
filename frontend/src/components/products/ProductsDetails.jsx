import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, ArrowLeft, Truck, Shield, RotateCcw} from "lucide-react";
import SiteHeader from "../site-header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "./Loader";

const ProductsDetails = () => {
  const [products, setProducts] = useState(null);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const getProduct = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://6a2258865c61035328699e51.mockapi.io/Products/${id}`
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  function toggle() {
    setActive((prev) => !prev);
  }

  return (
    <>
      <SiteHeader title="Products Details" />

      {loading ? (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen bg-background px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Column - Image */}
                  <div className="flex items-center justify-center bg-muted/40 p-8">
                    <img
                      src={products?.image}
                      alt={products?.title || products?.name}
                      className="h-auto w-full max-w-md object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="p-8 lg:p-10">
                    <h2 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
                      {products?.name || products?.title}
                    </h2>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-blue-500 lg:text-5xl">
                        {products?.price}
                      </span>
                      <span className="ml-2 text-muted-foreground">Rs</span>
                    </div>

                    {/* Description */}
                    <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                      {products?.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Truck className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">Free Shipping</span>
                      </div>

                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">2 Year Warranty</span>
                      </div>

                      <div className="flex items-center gap-3 text-muted-foreground">
                        <RotateCcw className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">30 Day Returns</span>
                      </div>

                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Heart className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">Secure Payment</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                      <Button
                        size="lg"
                        onClick={() => navigate('/ProductsList')}
                        className="flex-1 gap-2 bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <ArrowLeft className="h-5 w-5" />
                        Back to Products
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        onClick={toggle}
                        className="hover:border-red-500 hover:bg-red-500/10"
                      >
                        {active ? (
                          <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                        ) : (
                          <Heart className="h-5 w-5 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsDetails;