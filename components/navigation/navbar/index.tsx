import Image from "next/image";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";
import MobileNavigation from "./MobileNavigation";
import Theme from "./Theme";

const Navbar: FunctionComponent = async () => {
  const session = await auth();

  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full gap-5 p-6 sm:px-12 dark:shadow-none">
      <Link className="flex items-center gap-1" href="/">
        <Image
          alt="DevFlow Logo"
          height={23}
          src="images/site-logo.svg"
          width={23}
        />

        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Flow</span>
        </p>
      </Link>

      <p>Global Search</p>

      <div className="flex-between gap-5">
        <Theme />

        {session?.user?.id && (
          <UserAvatar
            id={session.user.id}
            imageUrl={session.user.image}
            // biome-ignore lint/style/noNonNullAssertion: <name should be present>
            name={session.user.name!}
          />
        )}

        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
