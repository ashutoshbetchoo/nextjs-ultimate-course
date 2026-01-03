"use client";

import type { FunctionComponent } from "react";
import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";

type SignUpProps = {};

const SignUp: FunctionComponent<SignUpProps> = () => {
  return (
    <AuthForm
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      formType="SIGN_UP"
      onSubmit={signUpWithCredentials}
      schema={SignUpSchema}
    />
  );
};

export default SignUp;
