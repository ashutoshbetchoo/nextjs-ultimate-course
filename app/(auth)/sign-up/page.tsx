"use client";

import type { FunctionComponent } from "react";
import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validations";

type SignUpProps = {};

const SignUp: FunctionComponent<SignUpProps> = () => {
  return (
    <AuthForm
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      formType="SIGN_UP"
      onSubmit={(data) => Promise.resolve({ success: true, data })}
      schema={SignUpSchema}
    />
  );
};

export default SignUp;
