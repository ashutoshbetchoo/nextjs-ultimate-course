"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { type FunctionComponent, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { AskQuestionSchema } from "@/lib/validations";
// import Editor from "../editor";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const QuestionForm: FunctionComponent = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = () => {};

  return (
    <form
      className="flex w-full flex-col gap-10"
      onSubmit={form.handleSubmit(handleCreateQuestion)}
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field
              className="flex w-full flex-col"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor={field.name}
              >
                Question Title <span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                id={field.name}
              />
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Be specific and imagine you're asking a question to another
                person.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          control={form.control}
          name="content"
          render={({ field, fieldState }) => (
            <Field
              className="flex w-full flex-col"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor={field.name}
              >
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FieldLabel>

              <Editor
                editorRef={editorRef}
                fieldChange={field.onChange}
                markdown={field.value}
              />

              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Introduce the problem and expand on what you've put in the title
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          control={form.control}
          name="tags"
          render={({ field, fieldState }) => (
            <Field
              className="flex w-full flex-col gap-3"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel
                className="paragraph-semibold text-dark400_light800"
                htmlFor={field.name}
              >
                Tags <span className="text-primary-500">*</span>
              </FieldLabel>
              <div>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  id={field.name}
                  placeholder="Add tags..."
                />
                Tags
              </div>
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-16 flex justify-end">
        <Button className="primary-gradient text-light-900 w-fit" type="submit">
          Ask A Question
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
