import React from "react";
import { MailIcon, PassIcon, GitHubIcon, TwitterIcon } from "../ui/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginForm: React.FC = () => {
  return (
    <Tabs
      defaultValue="account"
      className=" flex flex-col     mx-auto  md:p-10 2xl:p-12 3xl:p-14 bg-secondary rounded-2xl shadow-xl w-[600px]"
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

      <TabsContent value="account">
        <Card className="bg-secondary p-4 border-none shadow-none m-2">
          <div className="flex flex-row p-4 ">
            <h1 className="text-3xl mx-auto font-bold text-[#e0e0e0] my-auto">
              Iniciar sesión
            </h1>
          </div>

          <form className="flex flex-col">
            <div className="pb-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#e0e0e0]"
              >
                Correo electrónico
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="pl-12 mb-2 bg-transparent text-[#e0e0e0] border  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                  placeholder="name@email.com"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-[#e0e0e0]"
              >
                Contraseña
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <PassIcon />
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••••"
                  className="pl-12 mb-2 bg-transparent text-[#e0e0e0] border border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                  autoComplete="new-password"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-32 mx-auto text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
            >
              Ingresar
            </Button>
            <div className="mx-auto text-sm font-light text-[#e0e0e0]">
              O Ingresa con tus redes sociales
            </div>
          </form>
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <form>
            <div className="flex flex-row gap-2 justify-center">
              <Button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
                <GitHubIcon />
                <span className="font-medium mx-auto">Github</span>
              </Button>
              <Button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
                <TwitterIcon />
                <span className="font-medium mx-auto">Twitter</span>
              </Button>
              <Button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
                <GitHubIcon />
                <span className="font-medium mx-auto">Github</span>
              </Button>
            </div>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="password">
        <Card className="bg-secondary p-4 border-none shadow-none m-2">
          <div className="flex flex-row p-4 ">
            <h1 className="text-3xl mx-auto font-bold text-[#e0e0e0] my-auto">
              Registrarme
            </h1>
          </div>

          <form className="flex flex-col">
            <div className="pb-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#e0e0e0]"
              >
                Correo electrónico
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="pl-12 mb-2 bg-transparent text-[#e0e0e0] border  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                  placeholder="name@email.com"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-[#e0e0e0]"
              >
                Contraseña
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <PassIcon />
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••••"
                  className="pl-12 mb-2 bg-transparent text-[#e0e0e0] border border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                  autoComplete="new-password"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-32 mx-auto focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
            >
              Ingresar
            </Button>
            <div className="mx-auto text-sm font-light text-[#e0e0e0]">
              O Ingresa con tus redes sociales
            </div>
          </form>
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <form>
            <div className="flex flex-row gap-2 justify-center">
              <Button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
                <GitHubIcon />
                <span className="font-medium mx-auto">Github</span>
              </Button>
              <Button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
                <TwitterIcon />
                <span className="font-medium mx-auto">Twitter</span>
              </Button>
              <Button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
                <GitHubIcon />
                <span className="font-medium mx-auto">Github</span>
              </Button>
            </div>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LoginForm;
