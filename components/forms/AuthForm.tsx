"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Controller,
  type DefaultValues,
  type FieldValues,
  type Path,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import type { ZodType } from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import ROUTES from "@/constants/route";
import type { ActionResponse } from "@/types/global";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/sonner";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();
  const form = useForm({
    // biome-ignore lint/suspicious/noExplicitAny: unfixable generic type
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast.success(
        formType === "SIGN_IN"
          ? "Signed in successfully"
          : "Signed up successfully",
      );

      router.push(ROUTES.HOME);
    } else {
      toast.error(result?.error?.message);
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form
      className="mt-10 space-y-6"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FieldGroup>
        {Object.keys(defaultValues).map((field) => (
          <Controller
            control={form.control}
            key={field}
            name={field as Path<T>}
            render={({ field, fieldState }) => (
              <Field
                className="flex w-full flex-col gap-2.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel
                  className="paragraph-medium text-dark400_light700"
                  htmlFor={field.name}
                >
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border"
                  id={field.name}
                  required
                  type={field.name === "password" ? "password" : "text"}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}
      </FieldGroup>
      <Button
        className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900"
        disabled={form.formState.isSubmitting}
        type="submit"
      >
        {form.formState.isSubmitting
          ? buttonText === "Sign In"
            ? "Signing In..."
            : "Signing Up..."
          : buttonText}
      </Button>

      {formType === "SIGN_IN" ? (
        <p>
          Don't have an account?{" "}
          <Link
            className="paragraph-semibold primary-text-gradient"
            href={ROUTES.SIGN_UP}
          >
            Sign Up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link
            className="paragraph-semibold primary-text-gradient"
            href={ROUTES.SIGN_IN}
          >
            Sign In
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
