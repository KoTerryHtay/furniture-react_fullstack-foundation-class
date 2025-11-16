import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Link } from "react-router";
import { ScrollArea } from "../ui/scroll-area";
import CartItem from "../carts/CartItem";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

// import { cartItems } from "@/data/carts";

export default function CartSheet() {
  const itemCount = useCartStore((state) => state.getTotalItems());
  const amountTotal = useCartStore((state) => state.getTotalPrice());
  const { carts } = useCartStore();
  // const itemCount = 4;
  // const amountTotal = 190;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          className="relative"
          aria-label="Open cart"
        >
          {itemCount > 0 && (
            <Badge
              variant={"destructive"}
              className="absolute -top-2 -right-2 size-6 justify-center rounded-full p-2.5"
            >
              {itemCount}
            </Badge>
          )}
          <Icons.cart aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full px-4 md:max-w-lg">
        <SheetHeader>
          <SheetTitle className="pt-2 text-center">
            {itemCount > 0 ? `Cart - ${itemCount}` : "Empty Cart"}
          </SheetTitle>
        </SheetHeader>

        <Separator className="my-2" />

        {carts.length > 0 ? (
          <>
            <ScrollArea className="mr-4 mb-4 h-[calc(68vh)] pb-8">
              {carts.map((cart) => (
                <CartItem key={cart.id} cart={cart} />
              ))}
            </ScrollArea>

            <div className="space-y-4">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatPrice(amountTotal.toFixed(2))}</span>
                </div>
              </div>
              <SheetFooter className="px-0 pt-0">
                <SheetClose asChild>
                  <Button type="submit" asChild>
                    <Link to={"/checkout"} aria-label="Check out">
                      Continue to checkout
                    </Link>
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Icons.cart className="text-muted-foreground mb-4 size-16" />
            <div className="text-muted-foreground text-xl font-medium">
              Your cart is empty
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
