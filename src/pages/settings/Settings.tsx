import { Link } from "react-router";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="my-8 ml-12 text-2xl font-bold lg:ml-24">Settings</h1>

      <div className="mx-12 mb-4 flex flex-col gap-2 lg:mx-24">
        <Button variant={"outline"} asChild>
          <Link to={"change-username"}>
            <Icons.User /> Change User Name
          </Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link to={"change-email"}>
            <Icons.mail /> Change Email Address
          </Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link to={"change-password"}>
            <Icons.password /> Change Password
          </Link>
        </Button>
      </div>
    </div>
  );
}
