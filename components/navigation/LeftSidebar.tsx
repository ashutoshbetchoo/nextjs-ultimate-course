import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { auth, signOut } from "@/auth";
import ROUTES from "@/constants/route";
import { Button } from "../ui/button";
import NavLinks from "./navbar/NavLinks";

const LeftSidebar: FunctionComponent = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 max-sm:hidden lg:w-66.5 dark:shadow-none">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks userId={userId} />
      </div>

      <div className="flex flex-col gap-3">
        {userId ? (
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <Button
              className="base-medium w-fit bg-transparent px-4 py-3"
              type="submit"
            >
              <LogOut className="size-5 text-black dark:text-white" />
              <span className="text-dark300_light900 max-lg:hidden">
                Logout
              </span>
            </Button>
          </form>
        ) : (
          <>
            <Button
              asChild
              className="small-medium btn-secondary min-h-10.25 w-full rounded-lg px-4 py-3 shadow-none"
            >
              <Link href={ROUTES.SIGN_IN}>
                <Image
                  alt="Account"
                  className="invert-colors lg:hidden"
                  height={20}
                  src="/icons/account.svg"
                  width={20}
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Log In
                </span>
              </Link>
            </Button>

            <Button
              asChild
              className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-10.25 w-full rounded-lg border px-4 py-3 shadow-none"
            >
              <Link href={ROUTES.SIGN_UP}>
                <Image
                  alt="Account"
                  className="invert-colors lg:hidden"
                  height={20}
                  src="/icons/sign-up.svg"
                  width={20}
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default LeftSidebar;
