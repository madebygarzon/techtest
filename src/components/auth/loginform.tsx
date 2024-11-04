import React, { useState } from "react";
import { MailIcon, PassIcon, GitHubIcon, TwitterIcon } from "../ui/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../graphql/index";
import bcrypt from 'bcryptjs';

interface UserForm {
  name: string;
  email: string;
  phone?: string;
  role: string;
  password: string;
}
const LoginForm: React.FC = () => {
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    phone: "",
    role: "Usuario",
    password: "",
  });

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    role: "Usuario",
    password: "",
  };

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hashedPassword = await bcrypt.hash(form.password, 10);
      await createUser({
        variables: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          password: hashedPassword,
        },
      });
      Swal.fire({
        icon: "success",
        title: "¡Usuario creado exitosamente!",
        showConfirmButton: false,
        timer: 4000,
      });
      setForm(initialFormState);
    } catch (err) {
      console.error("Error creating user:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err instanceof Error ? err.message : "Ocurrió un error desconocido",
      });
    }
  };

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
        {loading && <p>Submitting...</p>}
        {error && <p>Error: {error.message}</p>}
        <Card className="bg-secondary p-4 border-none shadow-none m-2">
          <div className="flex flex-row p-4 ">
            <h1 className="text-3xl mx-auto font-bold text-[#e0e0e0] my-auto">
              Registrarme
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="pb-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-[#e0e0e0]"
              >
                Nombre
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <MailIcon />
                </span>
                <input
                  placeholder="Nombre"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="pl-12 mb-2 bg-transparent text-[#e0e0e0] border  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                />
              </div>
            </div>

            <div className="pb-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#e0e0e0]"
              >
                Correo electrónico
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <PassIcon />
                </span>
                <input
                  placeholder="Correo electrónico"
                  className="pl-12 mb-2 bg-transparent text-[#e0e0e0] border  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="pb-2">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-[#e0e0e0]"
              >
                Teléfono
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <PassIcon />
                </span>
                <input
                  placeholder="Teléfono"
                  className="pl-12 mb-2 bg-transparent text-[#e0e0e0] border  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="pb-2">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-[#e0e0e0]"
              >
                Contraseña
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <PassIcon />
                </span>
                <input
                  placeholder="••••••••••"
                  className="pl-12 mb-2 bg-transparent text-[#e0e0e0] border  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="pb-6">
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"></span>
                <input
                  type="hidden"
                  className="pl-12 mb-2 bg-transparent text-[#e0e0e0] border  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-32 mx-auto focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
            >
              Registrarme
            </Button>
          </form>

          <form></form>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LoginForm;
