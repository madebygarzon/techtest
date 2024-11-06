import React from "react";
import Home from "@/components/home";
import Powered from "@/components/powered";
import { ThemeSwitcher } from "@/components/ui/toggleswitch";
import SelectLanguage from "@/components/ui/selectlanguage";
// import { useSession } from "next-auth/react";
// import Link from "next/link";


const HomePage: React.FC = () => {
  // const { data: session } = useSession();

  // if (!session) {
  //   return <p className="flex items-center justify-center h-screen">No estas logeado, puedes hacerlo<Link href="/auth/login">{" "}aquí</Link></p>;
  // }
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
