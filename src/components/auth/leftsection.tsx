import React from "react";
import Image from "next/image";
import Logo from "../../../public/assets/logo-prevalentware.png";

const LeftSection = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div>
          <Image src={Logo} alt="PrevalentWare" width={400} className="w-full" />
        </div>
        <div>
          <h1 className="text-xl ">¡Bienvenido!</h1>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
