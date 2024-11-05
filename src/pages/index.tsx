import React from "react";
import Home from "@/components/home";
import Powered from "@/components/powered";
import { ThemeSwitcher } from "@/components/ui/toggleswitch";
import SelectLanguage from "@/components/ui/selectlanguage";

const HomePage: React.FC = () => {
  return (
    <div className="">
      <div className="absolute right-2 top-2  text-2xl">
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <SelectLanguage />
      </div>
    
        </div>
      <Home />
      <Powered />
    </div>
  );
};

export default HomePage;
