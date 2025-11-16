import LoginForm from "@/components/auth/LoginForm";
import { Icons } from "@/components/icons";
import Banner from "@/data/images/house.webp";
import { Link } from "react-router";

export default function LoginPage() {
  return (
    <div className="relative">
      <Link
        to={"#"}
        className="text-foreground/80 hover:text-foreground fixed top-6 left-8 flex items-center text-lg font-bold tracking-tight transition-colors"
      >
        <Icons.home className="mr-2 size-6" aria-hidden="true" />
        <span>Furniture Shop</span>
      </Link>

      <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* <div className="grid w-full place-items-center px-4"> */}
        <div className="flex w-full items-center justify-center px-4">
          <LoginForm />
        </div>
        <div className="relative hidden lg:block">
          <img
            src={Banner}
            alt="Furniture Shop"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </main>
    </div>
  );
}
