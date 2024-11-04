import React from "react";
import LoginForm from "./loginform";
import LeftSection from "./leftsection";

const Sectionlogin = () => {
  return (
    <div className="flex bg-secondary justify-center items-center">
      <div className="w-1/2 h-screen bg-primary">
        <LeftSection />
      </div>
      <div className="w-1/2">
        <LoginForm />
      </div>
    </div>
  );
};

export default Sectionlogin;
