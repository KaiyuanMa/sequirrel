import React, { useCallback } from "react";
import MainTitle from "./MainTitle";
import ExampleSection from "./ExampleSection";
import Features from "./Features";
import TakeActionSection from "./TakeActionSection";
import HomeFooter from "./HomeFooter";

function Home() {
  return (
    <div className="home">
      <div className="home-header"></div>
      <MainTitle />
      <ExampleSection />
      <Features />
      <TakeActionSection />
      <HomeFooter />
    </div>
  );
}

export default Home;
