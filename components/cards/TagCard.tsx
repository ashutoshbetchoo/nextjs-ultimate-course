import Link from "next/link";
import type { FunctionComponent } from "react";
import ROUTES from "@/constants/route";
import { getDeviconClassName } from "@/lib/utils";
import { Badge } from "../ui/badge";

type TagCardProps = {
  _id: string;
  name: string;
  questions: number;
  showCount?: boolean;
  compact?: boolean;
};

const TagCard: FunctionComponent<TagCardProps> = ({
  _id,
  name,
  questions,
  compact,
  showCount,
}) => {
  const iconClass = getDeviconClassName(name);

  return (
    <Link className="flex justify-between gap-2" href={ROUTES.TAGS(_id)}>
      <Badge className="background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`}></i>
          <span>{name}</span>
        </div>
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </Link>
  );
};

export default TagCard;
