import Link from "next/link";
import type { FunctionComponent } from "react";
import ROUTES from "@/constants/route";
import { getTimestamp } from "@/lib/utils";
import type { Question, Tag } from "@/types/global";
import Metric from "../Metric";
import TagCard from "./TagCard";

type QuestionCardProps = {
  question: Question;
};

const QuestionCard: FunctionComponent<QuestionCardProps> = ({
  question: { _id, answers, author, createdAt, tags, title, upvotes, views },
}) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard _id={tag._id} compact key={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          alt={author.name}
          href={ROUTES.PROFILE(author._id)}
          imgUrl={author.image}
          isAuthor
          textStyles="body-medium text-dark400_light700"
          title={`• asked ${getTimestamp(createdAt)}`}
          value={author.name}
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            alt="like"
            imgUrl="/icons/like.svg"
            textStyles="small-medium text-dark400_light800"
            title="Votes"
            value={upvotes}
          />
          <Metric
            alt="answers"
            imgUrl="/icons/message.svg"
            textStyles="small-medium text-dark400_light800"
            title="Answers"
            value={answers}
          />
          <Metric
            alt="views"
            imgUrl="/icons/eye.svg"
            textStyles="small-medium text-dark400_light800"
            title="Views"
            value={views}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
