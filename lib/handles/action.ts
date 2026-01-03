"use server";

import type { Session } from "next-auth";
import z, { ZodError, type ZodType } from "zod";
import { auth } from "@/auth";
import { UnauthorizedError, ValidationError } from "../http-errors";
import dbConnect from "../mongoose";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodType<T>;
  authorize: boolean;
};

// 1. Check whether the schema and params are provided and validated
// 2. Check whether the user is authorized
// 3. Connect to the database
// 4. Return the params and session
async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          z.flattenError(error).fieldErrors as Record<string, string[]>,
        );
      } else {
        return new Error("Schema validation failed");
      }
    }
  }

  let session: Session | null = null;

  if (authorize) {
    session = await auth();

    if (!session) {
      return new UnauthorizedError();
    }
  }

  await dbConnect();

  return { params, session };
}

export default action;
