"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  type FunctionComponent,
  type KeyboardEvent,
  useRef,
  useTransition,
} from "react";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";
import ROUTES from "@/constants/route";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { AskQuestionSchema } from "@/lib/validations";
import type { Question } from "@/types/global";
import TagCard from "../cards/TagCard";
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
import { toast } from "../ui/sonner";
import { Spinner } from "../ui/spinner";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

interface QuestionFormProps {
  question?: Question;
  isEdit?: boolean;
}

const QuestionForm: FunctionComponent<QuestionFormProps> = ({
  question,
  isEdit = false,
}) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: { value: string[] },
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t: string) => t !== tag);

    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      });
    }
  };

  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>,
  ) => {
    startTransition(async () => {
      if (isEdit && question) {
        const result = await editQuestion({
          questionId: question._id,
          ...data,
        });

        if (result.success && result.data) {
          toast.success("Question updated successfully");
          router.push(ROUTES.QUESTION(result.data?._id.toString()));
        } else {
          toast.error(result.error?.message || "Something went wrong");
        }

        return;
      }

      // else
      const result = await createQuestion(data);

      if (result.success && result.data) {
        toast.success("Question created successfully");
        router.push(ROUTES.QUESTION(result.data?._id.toString()));
      } else {
        toast.error(result.error?.message || "Something went wrong");
      }
    });
  };

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
                  // {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  id={field.name}
                  onKeyDown={(e) => handleInputKeyDown(e, field)}
                  placeholder="Add tags..."
                />
                {field.value.length > 0 && (
                  <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                    {field.value?.map((tag: string) => (
                      <TagCard
                        _id={tag}
                        compact
                        handleRemove={() => handleTagRemove(tag, field)}
                        isButton
                        key={tag}
                        name={tag}
                        remove
                      />
                    ))}
                  </div>
                )}
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
        <Button
          className="primary-gradient text-light-900 w-fit"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <>
              <Spinner className="mr-2 size-4" />
              <span>Submitting...</span>
            </>
          ) : isEdit ? (
            "Edit"
          ) : (
            "Ask A Question"
          )}
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
