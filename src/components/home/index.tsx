import React from "react";
import MainSection from "../mainsection";
import { ThemeSwitcher } from "@/lib/themeswitch";
const Home = () => {
  return (
    <>
      <div className="absolute right-12 top-5">
        <ThemeSwitcher />
      </div>
      <MainSection />     
    </>
  );
};

export default Home;
