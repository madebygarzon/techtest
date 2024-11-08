import React from "react";
import LeftSection from "@/components/auth/leftSection";
import RightSection from "@/components/auth/rightsection";

const Sectionlogin = () => {
  return (
    <div className="flex bg-secondary justify-center items-center">
      <div className="w-1/2 h-screen bg-primary">
        <LeftSection />
      </div>
      <div className="w-1/2">
        <RightSection />
      </div>
    </div>
  );
};
                                    
export default Sectionlogin;
