import type { FunctionComponent } from "react";

type HomeProps = {};

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <h1 className="h1-bold">Hello World</h1>
      <div className="h1-bold font-space-grotesk">Hello World Inter</div>
    </>
  );
};

export default Home;
