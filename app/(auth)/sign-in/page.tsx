"use client";

import type { FunctionComponent } from "react";
import AuthForm from "@/components/forms/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validations";

type SignInProps = {};

const SignIn: FunctionComponent<SignInProps> = () => {
  return (
    <AuthForm
      defaultValues={{ email: "", password: "" }}
      formType="SIGN_IN"
      onSubmit={signInWithCredentials}
      schema={SignInSchema}
    />
  );
};

export default SignIn;
