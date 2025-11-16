import { Link } from "react-router";

import CarouselCard from "@/components/products/CarouselCard";
import { Button } from "@/components/ui/button";
import Couch from "@/data/images/couch.png";
import BlogCard from "@/components/blogs/BlogCard";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postQuery, productQuery } from "@/api/query";

// import { products } from "@/data/products";
// import { posts } from "@/data/posts";

// const samplePosts = posts.slice(0, 3);
// const sampleProducts = products.slice(0, 4);

export default function HomePage() {
  // const { productsData, postsData } = useLoaderData();

  // 2. useQuery
  /*
  
  const {
    data: productsData,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    error: errorProduct,
    refetch: refetchProduct,
  } = useQuery(productQuery("?limit=8"));

  const {
    data: postsData,
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    refetch: refetchPost,
  } = useQuery(postQuery("?limit=3"));

  if (isLoadingProduct && isLoadingPost) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (isErrorProduct && isErrorPost) {
    return (
      <div className="container mx-auto my-32 flex flex-1 place-content-center">
        <div className="text-center text-red-400">
          <p className="mb-4">
            {errorProduct.message} & {errorPost.message}
          </p>
          <Button
            onClick={() => {
              refetchProduct();
              refetchPost();
            }}
            variant={"secondary"}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }
  */

  const { data: productsData } = useSuspenseQuery(productQuery("?limit=8"));
  const { data: postsData } = useSuspenseQuery(postQuery("?limit=3"));

  // console.log({ productsData, postsData });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Text Section */}
        <div className="my-8 text-center lg:mt-16 lg:mb-0 lg:w-2/5 lg:text-left">
          <h1 className="text-own mb-4 text-4xl font-extrabold lg:mb-8 lg:text-6xl">
            Modern Interior Design Studio
          </h1>
          <p className="mb-6 lg:mb-8">
            Furniture is an essential component of any living space, providing
            functionality, comfort, and aesthetic appeal.
          </p>
          <div>
            <Button
              asChild
              className="mr-2 rounded-full bg-orange-300 px-8 py-6 text-base font-bold"
            >
              <Link to={""}>Shop Now</Link>
            </Button>
            <Button
              asChild
              variant={"outline"}
              className="rounded-full px-8 py-6 text-base font-bold"
            >
              <Link to={""}>Explore</Link>
            </Button>
          </div>
        </div>
        {/* Image Section */}
        <img src={Couch} alt="Couch" className="w-full lg:w-3/5" />
        {/* <img src={Couch} alt="Couch" className="h-[470px] w-[700px]" /> */}
      </div>
      {/* Carousel Card */}
      {/* <CarouselCard products={products} /> */}
      {productsData && <CarouselCard products={productsData.products} />}

      {/* Product Blog */}
      <Title
        title="Featured Products"
        href="/products"
        sideText="View All Products"
      />
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-4">
        {productsData &&
          productsData.products
            .slice(0, 4)
            .map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* Recent Blog */}
      <Title title="Recent Blog" href="/blogs" sideText="View All Posts" />
      {postsData && <BlogCard posts={postsData.posts} />}
      {/* <BlogCard posts={postsData.posts} /> */}
    </div>
  );
}

// export const loader = async () => {};

const Title = ({
  title,
  href,
  sideText,
}: {
  title: string;
  href: string;
  sideText: string;
}) => (
  <div className="mt-28 mb-10 flex flex-col px-4 md:flex-row md:justify-between md:px-0">
    <h2 className="mb-4 text-2xl font-bold md:mb-0">{title}</h2>
    <Link to={href} className="text-muted-foreground font-semibold underline">
      {sideText}
    </Link>
  </div>
);
