import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/loginform";
import RegisterForm from "@/components/auth/registerform";

const RightSection: React.FC = () => {
  return (
    <Tabs
      defaultValue="account"
      className=" mt-4 flex flex-col mx-auto  md:p-10 2xl:p-12 3xl:p-14 bg-secondary rounded-2xl shadow-xl w-[600px]"
    >
      <TabsList className="bg-primary h-11 rounded-2xl gap-2 grid w-full grid-cols-2">
        <TabsTrigger
          className="h-9 my-auto mx-auto py-2 w-60 rounded-xl flex items-center justify-center"
          value="account"
        >
          Iniciar sesión
        </TabsTrigger>
        <TabsTrigger
          className="h-9 my-auto mx-auto py-2 w-60 rounded-xl flex items-center justify-center"
          value="password"
        >
          Registrarme
        </TabsTrigger>
      </TabsList>
      <LoginForm />
      <RegisterForm />
    </Tabs>
  );
};

export default RightSection;
