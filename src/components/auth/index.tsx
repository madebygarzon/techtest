import React from "react";
import RightForm from "./rightsection";
import LeftSection from "./leftsection";

const Sectionlogin = () => {
  return (
    <div className="flex bg-secondary justify-center items-center">
      <div className="w-1/2 h-screen bg-primary">
        <LeftSection />
      </div>
      <div className="w-1/2">
        <RightForm />
      </div>
    </div>
  );
};

export default Sectionlogin;
