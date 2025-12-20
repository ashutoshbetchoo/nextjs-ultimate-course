import Link from "next/link";
import type { FunctionComponent } from "react";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";

const Home: FunctionComponent = async () => {
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          asChild
          className="primary-gradient text-light-900! min-h-11.5 px-4 py-3"
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          imgSrc="/icons/search.svg"
          otherClasses="flex-1"
          placeholder="Search questions..."
          route="/"
        />
      </section>
      HomeFilter
      <div className="mt-10 flex w-full flex-col gap-6">
        <p>Question Card 1</p>
        <p>Question Card 1</p>
        <p>Question Card 1</p>
        <p>Question Card 1</p>
        <p>Question Card 1</p>
      </div>
    </>
  );
};

export default Home;
