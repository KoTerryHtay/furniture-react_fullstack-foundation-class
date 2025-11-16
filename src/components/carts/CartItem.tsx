import { formatPrice } from "@/lib/utils";
import type { Cart } from "@/types";
import { Separator } from "../ui/separator";
import Editable from "./Editable";
import { useCartStore } from "@/store/cartStore";

interface CartProps {
  cart: Cart;
}

const imageUrl = import.meta.env.VITE_IMG_URL;

export default function CartItem({ cart }: CartProps) {
  const { updateItem, removeItem } = useCartStore();

  const updateHandler = (quantity: number) => {
    updateItem(cart.id, quantity);
  };

  const deleteHandler = () => {
    removeItem(cart.id);
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="mt-4 mb-2 flex gap-4">
        <img
          src={imageUrl + cart.image}
          alt="cart image"
          className="w-16 object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="flex flex-col space-y-1">
          <span className="line-clamp-1 text-sm font-medium">{cart.name}</span>
          <span className="text-muted-foreground text-xs">
            {formatPrice(cart.price)} x {cart.quantity} ={" "}
            {formatPrice((cart.price * cart.quantity).toFixed(2))}
          </span>
          {/* <span className="text-muted-foreground line-clamp-1 text-xs capitalize">
            {`${cart.category} / ${cart.subcategory}`}
          </span> */}
        </div>
      </div>

      <Editable
        onDelete={deleteHandler}
        quantity={cart.quantity}
        onUpdate={updateHandler}
      />

      <Separator />
    </div>
  );
}
