import type { Product } from "@/types";
import { Icons } from "../icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { AspectRatio } from "../ui/aspect-ratio";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const imageUrl = import.meta.env.VITE_IMG_URL;

export default function ProductCard({ product, className }: ProductProps) {
  const { carts, addItem } = useCartStore();

  const cartItem = carts.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0].path,
      quantity: 1,
    });
  };

  return (
    // py-0
    <Card
      className={cn("size-full overflow-hidden rounded-lg py-0", className)}
    >
      <Link to={`/products/${product.id}`} aria-label={product.name}>
        <CardHeader className="p-0">
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <img
              src={imageUrl + product.images[0].path}
              alt="product image"
              className="size-full border-b object-contain"
              loading={"lazy"}
              decoding="async"
            />
          </AspectRatio>
        </CardHeader>
        {/* pb-0 */}
        <CardContent className="space-y-1.5 p-4 pb-0">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {formatPrice(product.price)}
            {product.discount > 0 && (
              <span className="ml-2 font-extralight line-through">
                {formatPrice(product.discount)}
              </span>
            )}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-1">
        {product.status === "INACTIVE" ? (
          <Button
            size={"sm"}
            className="h-8 w-full rounded-sm font-bold"
            disabled={true}
            aria-label="Sold Out"
          >
            Sold Out
          </Button>
        ) : (
          <Button
            size={"sm"}
            className="bg-own h-8 w-full rounded-sm font-bold"
            aria-label="Add to cart"
            onClick={handleAddToCart}
            disabled={!!cartItem}
          >
            {!cartItem && <Icons.plus className="" />}
            {!cartItem ? "Add to cart" : "Added Item"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
