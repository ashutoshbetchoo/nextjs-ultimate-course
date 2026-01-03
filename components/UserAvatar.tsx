import Link from "next/link";
import type { FunctionComponent } from "react";
import ROUTES from "@/constants/route";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserAvatarProps = {
  id: string;
  name: string;
  imageUrl?: string | null;
  className?: string;
};

const UserAvatar: FunctionComponent<UserAvatarProps> = ({
  id,
  name,
  imageUrl,
  className = "h-9 w-9",
}) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        {imageUrl && (
          <AvatarImage
            alt={name}
            className="object-cover"
            height={36}
            src={imageUrl}
            width={36}
          />
        )}
        <AvatarFallback className="primary-gradient font-space-grotesk font-bold tracking-wider text-white">
          {initials}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
