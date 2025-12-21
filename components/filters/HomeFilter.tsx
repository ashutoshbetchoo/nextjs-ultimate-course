"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { type FunctionComponent, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type HomeFilterProps = {};

const filters = [
  { name: "React", value: "react" },
  { name: "Javascript", value: "javascript" },
  //   { name: "Newest", value: "newest" },
  //   { name: "Popular", value: "popular" },
  //   { name: "Unanswered", value: "unanswered" },
  //   { name: "Recommended", value: "recommended" },
];

const HomeFilter: FunctionComponent<HomeFilterProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || "");

  const handleTypeClick = (filter: string) => {
    let newUrl = "";
    if (filter === active) {
      setActive("");

      newUrl = removeKeysFromQuery({
        params: searchParamsString,
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);

      newUrl = formUrlQuery({
        params: searchParamsString,
        key: "filter",
        value: filter.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300",
          )}
          key={filter.name}
          onClick={() => handleTypeClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
