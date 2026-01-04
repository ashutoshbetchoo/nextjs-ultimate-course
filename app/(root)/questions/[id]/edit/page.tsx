import { notFound, redirect } from "next/navigation";
import type { FunctionComponent } from "react";
import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/route";
import { getQuestion } from "@/lib/actions/question.action";
import type { RouteParams } from "@/types/global";

interface EditQuestionProps extends RouteParams {}

const EditQuestion: FunctionComponent<EditQuestionProps> = async ({
  params,
}) => {
  const { id } = await params;

  if (!id) return notFound();

  const session = await auth();

  if (!session) return redirect(ROUTES.SIGN_IN);

  const { data: question, success } = await getQuestion({ questionId: id });

  if (!success) return notFound();

  if (question?.author.toString() !== session.user?.id) {
    redirect(ROUTES.QUESTION(id));
  }

  return (
    <main>
      <h1 className="h1-bold text-dark100_light900">Edit question</h1>

      <div className="mt-9">
        <QuestionForm isEdit question={question} />
      </div>
    </main>
  );
};

export default EditQuestion;
