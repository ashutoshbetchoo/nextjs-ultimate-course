"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import type { FunctionComponent } from "react";
import { toast } from "sonner";
import ROUTES from "@/constants/route";
import { Button } from "../ui/button";

const SocialAuthForm: FunctionComponent = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3.5";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } catch (error) {
      console.log(error);

      const errMsg =
        error instanceof Error
          ? error.message
          : "An error occurred during sign-in";

      toast.error("Sign-in Failed", {
        description: errMsg,
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button
        className={buttonClass}
        onClick={() => handleSignIn("github")}
        type="button"
      >
        <Image
          alt="Github Logo"
          className="invert-colors mr-2.5 object-contain"
          height={20}
          src="icons/github.svg"
          width={20}
        />
        <span>Log in with Github</span>
      </Button>

      {/* <Button
        className={buttonClass}
        onClick={() => handleSignIn("google")}
        type="button"
      >
        <Image
          alt="Google Logo"
          className="mr-2.5 object-contain"
          height={20}
          src="icons/google.svg"
          width={20}
        />
        <span>Log in with Google</span>
      </Button> */}
    </div>
  );
};

export default SocialAuthForm;
