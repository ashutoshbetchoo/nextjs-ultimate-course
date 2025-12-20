"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { type FunctionComponent, useState } from "react";
import { Input } from "../ui/input";

type LocalSearchProps = {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
};

const LocalSearch: FunctionComponent<LocalSearchProps> = ({
  route,
  imgSrc,
  placeholder,
  otherClasses,
}) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-14 grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image
        alt="Search"
        className="cursor-pointer"
        height={24}
        src={imgSrc}
        width={24}
      />
      <Input
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        type="text"
        value={searchQuery}
      />
    </div>
  );
};

export default LocalSearch;
