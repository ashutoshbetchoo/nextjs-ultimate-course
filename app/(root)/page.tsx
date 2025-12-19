import type { FunctionComponent } from "react";

const Home: FunctionComponent = async () => {
  // const session = await auth();
  return (
    <>
      <h1 className="h1-bold">Hello World</h1>
      <div className="h1-bold font-space-grotesk">Hello World Inter</div>
    </>
  );
};

export default Home;
