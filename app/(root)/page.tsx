import type { FunctionComponent } from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";

const Home: FunctionComponent = async () => {
  const session = await auth();
  return (
    <>
      <h1 className="h1-bold">Hello World</h1>
      <div className="h1-bold font-space-grotesk">Hello World Inter</div>

      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
        className="px-10 pt-25"
      >
        <Button type="submit">Log out</Button>
      </form>
    </>
  );
};

export default Home;
