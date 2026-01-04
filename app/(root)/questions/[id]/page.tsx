import type { FunctionComponent } from "react";
import type { RouteParams } from "@/types/global";

interface QuestionDetailsProps extends RouteParams {}

const QuestionDetails: FunctionComponent<QuestionDetailsProps> = async ({
  params,
}) => {
  const { id } = await params;

  return <>{id}</>;
};

export default QuestionDetails;
