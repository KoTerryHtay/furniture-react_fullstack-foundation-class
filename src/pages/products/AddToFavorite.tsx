import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFetcher } from "react-router";

interface FavoriteProps extends React.ComponentProps<"button"> {
  productId: number;
  rating: number;
  isFavourite: boolean;
}

export default function AddToFavorite({
  productId,
  // rating,
  className,
  isFavourite,
  ...props
}: FavoriteProps) {
  const fetcher = useFetcher({ key: `product:${productId}` });

  let favourite = isFavourite;

  if (fetcher.formData) {
    favourite = fetcher.formData.get("favourite") === "true";
  }

  // console.log({ productId, rating });
  console.log(fetcher.formData?.get("favourite")?.toString());
  return (
    <fetcher.Form method="post">
      <Button
        variant={"secondary"}
        size={"icon"}
        className={cn("size-8 shrink-0", className)}
        name="favourite"
        value={favourite ? "false" : "true"}
        title={favourite ? "Remove from favourites" : "Add to favourites"}
        {...props}
      >
        {favourite ? (
          <Icons.heartFill className="size-4 text-red-500" />
        ) : (
          <Icons.heart className="size-4 text-red-500" />
        )}
      </Button>
    </fetcher.Form>
  );
}
