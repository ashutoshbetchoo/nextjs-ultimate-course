import type { FunctionComponent } from "react";
import QuestionForm from "@/components/forms/QuestionForm";

type AskQuestionProps = {};

const AskQuestion: FunctionComponent<AskQuestionProps> = () => {
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
