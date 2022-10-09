import React, { useCallback, useEffect } from "react";
import MainTitle from "./MainTitle";
import ExampleSection from "./ExampleSection";
import Features from "./Features";
import TakeActionSection from "./TakeActionSection";
import HomeFooter from "./HomeFooter";
import AOS from "aos";

function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
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
