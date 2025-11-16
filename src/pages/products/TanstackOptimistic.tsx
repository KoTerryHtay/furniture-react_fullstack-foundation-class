import api from "@/api";
import { queryClient } from "@/api/query";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsFetching, useMutation } from "@tanstack/react-query";

interface FavoriteProps extends React.ComponentProps<"button"> {
  productId: number;
  rating: number;
  isFavourite: boolean;
}

export default function TanstackOptimistic({
  productId,
  // rating,
  className,
  isFavourite,
  ...props
}: FavoriteProps) {
  const fetching = useIsFetching() > 0;
  let favourite = isFavourite;

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const data = {
        productId,
        favourite: !isFavourite,
      };

      const response = await api.patch("users/products/toggle-favourite", data);
      if (response.data !== 200) {
        // toast message
        console.log(response.data);
      }

      return response.data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["products", "detail", productId],
    //   });
    // },
    // onError: () => {},
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", "detail", productId],
      });
    },
  });

  if (isPending || fetching) {
    favourite = !isFavourite;
  }

  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      className={cn("size-8 shrink-0", className)}
      // name="favourite"
      // value={isFavourite ? "false" : "true"}
      title={favourite ? "Remove from favourites" : "Add to favourites"}
      {...props}
      onClick={() => mutate()}
    >
      {favourite ? (
        <Icons.heartFill className="size-4 text-red-500" />
      ) : (
        <Icons.heart className="size-4 text-red-500" />
      )}
    </Button>
  );
}
