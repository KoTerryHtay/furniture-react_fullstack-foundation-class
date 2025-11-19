import { userProfileInfo } from "@/api/query";
import { useQuery } from "@tanstack/react-query";

import { User } from "@/data/user";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Form, Link } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// interface UserProps {
//   user: User | undefined;
// }

export default function AuthDropDown() {
  const { data: user, isLoading } = useQuery(userProfileInfo());

  if (!user) {
    return (
      <Button size={"sm"} asChild>
        {isLoading ? (
          <div className="text-sm">Loading...</div>
        ) : (
          <Link to={"/login"}>
            Login
            <span className="sr-only">Login</span>
          </Link>
        )}
      </Button>
    );
  }
  // if (!user) {
  //   return (
  //     <Button size={"sm"} asChild>
  //       <Link to={"/sign"}>
  //         Sign In
  //         <span className="sr-only">Sign In</span>
  //       </Link>
  //     </Button>
  //   );
  // }

  const initialName = `${user?.firstName?.charAt(0) ?? ""}${user?.lastName?.charAt(0) ?? ""}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage
              src={user.imageUrl ?? User.imageUrl}
              alt={user.username ?? User.username}
            />
            <AvatarFallback>{initialName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {user.firstName ?? User.firstName}{" "}
              {user.lastName ?? User.lastName}
            </p>
            <p className="text-muted-foreground text-sm leading-none">
              {user.email ?? User.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={"#"}>
              <Icons.dashboard className="mr-2 size-4" aria-hidden="true" />
              Dashboard
              <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={"/settings"}>
              <Icons.gear className="mr-2 size-4" aria-hidden="true" />
              Settings
              <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Form method="POST" action="/logout">
            <button type="submit" className={"w-full"}>
              Logout
            </button>
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
