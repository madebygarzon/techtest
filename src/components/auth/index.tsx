import React from "react";
import LeftSection from "@/components/auth/leftsection";
import RightSection from "@/components/auth/rightsection";
import { ThemeSwitcher } from "@/lib/themeswitch";

const Sectionlogin = () => {
  return (
    <div className="flex bg-slate-400 dark:bg-secondary  justify-center items-center">
      <div className="w-1/2 h-screen bg-slate-400 dark:bg-primary">
        <LeftSection />
      </div>
      <div className="w-1/2">
        <RightSection />
      </div>
      <div className="absolute right-12 top-5">
        <ThemeSwitcher />
      </div>
    </div>
  );
};
                                    
export default Sectionlogin;
