import Image from "next/image";
import Link from "next/link";
import type { FunctionComponent } from "react";
import ROUTES from "@/constants/route";
import { getDeviconClassName } from "@/lib/utils";
import { Badge } from "../ui/badge";

type TagCardProps = {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
};

const TagCard: FunctionComponent<TagCardProps> = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}) => {
  const iconClass = getDeviconClassName(name);

  const Content = (
    <>
      <Badge className="background-light800_dark300 text-light400_light500 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`}></i>
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            alt="close icon"
            className="cursor-pointer object-contain invert-0 dark:invert"
            height={12}
            onClick={handleRemove}
            src="icons/close.svg"
            width={12}
          />
        )}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button className="flex justify-between gap-2" type="button">
        {Content}
      </button>
    ) : (
      <Link className="flex justify-between gap-2" href={ROUTES.TAGS(_id)}>
        {Content}
      </Link>
    );
  }
};

export default TagCard;
