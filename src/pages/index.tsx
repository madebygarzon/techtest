import React from "react";
import Home from "@/components/home";
import Powered from "@/components/powered";
import { ThemeSwitcher } from "@/components/ui/toggleswitch";

const HomePage: React.FC = () => {
  return (
    <div className="">
      <div className="absolute right-2 top-2  text-2xl">
      <ThemeSwitcher />
    
        </div>
      <Home />
      <Powered />
    </div>
  );
};

export default HomePage;
