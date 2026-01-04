import { redirect } from "next/navigation";
import type { FunctionComponent } from "react";
import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/route";

type AskQuestionProps = {};

const AskQuestion: FunctionComponent<AskQuestionProps> = async () => {
  const session = await auth();

  if (!session) return redirect(ROUTES.SIGN_IN);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <QuestionForm />
      </div>
    </div>
  );
};

export default AskQuestion;
