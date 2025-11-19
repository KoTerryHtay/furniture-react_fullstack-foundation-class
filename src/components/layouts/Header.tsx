import { siteConfig } from "@/config/site";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";
import { ModeToggle } from "../mode-toggle";
import AuthDropDown from "./AuthDropDown";
// import { User } from "@/data/user";
import CartSheet from "./CartSheet";
import ProgressBar from "../progress-bar";

export default function Header() {
  return (
    <header className="bg-background fixed top-0 z-50 w-full border-b">
      <nav className="container mx-auto flex h-16 items-center">
        <ProgressBar />
        <MainNavigation items={siteConfig.mainNav} />
        <MobileNavigation items={siteConfig.mainNav} />
        <div className="mr-8 flex flex-1 items-center justify-end space-x-4 lg:mr-0">
          <CartSheet />
          <ModeToggle />
          {/* <AuthDropDown user={User} /> */}
          <AuthDropDown />
        </div>
      </nav>
    </header>
  );
}
