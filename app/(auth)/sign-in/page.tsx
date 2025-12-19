"use client";

import type { FunctionComponent } from "react";
import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema } from "@/lib/validations";

type SignInProps = {};

const SignIn: FunctionComponent<SignInProps> = () => {
  return (
    <AuthForm
      defaultValues={{ email: "", password: "" }}
      formType="SIGN_IN"
      onSubmit={(data) => Promise.resolve({ success: true, data })}
      schema={SignInSchema}
    />
  );
};

export default SignIn;
