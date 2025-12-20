"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type FunctionComponent, useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
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
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  //   to make the useEffect stable
  const searchParamsString = searchParams.toString();

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParamsString,
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParamsString,
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, route, pathname, searchParamsString]);

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
