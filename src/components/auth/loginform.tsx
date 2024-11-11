import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import Swal from "sweetalert2";
import Loader from "@/components/ui/loader";
import {
  MailIcon,
  PassIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../ui/icons";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "Correo o contraseña incorrectos",
        timer: 4000,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "¡Has ingresado correctamente!",
        timer: 4000,
      });

      window.location.href = "/";
    }
  };

  return (
    <TabsContent value="account">
      <Card className="bg-transparent dark:bg-secondary p-4 border-none shadow-none m-2">
        <div className="flex flex-row p-4">
          <h1 className="text-3xl mx-auto font-bold text-slate-600 dark:text-[#e0e0e0]  my-auto">
            Iniciar sesión
          </h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col">
          <div className="pb-2">
            <label
              htmlFor="email"
              className="block mb-2  text-sm font-medium text-slate-600 dark:text-[#e0e0e0] "
            >
              Correo electrónico
            </label>
            <div className="relative text-slate-600 dark:text-[#e0e0e0] ">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <MailIcon />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="placeholder:text-slate-600 dark:placeholder:text-[#e0e0e0] pl-12 mb-2 bg-transparent text-slate-600 dark:text-[#e0e0e0] border sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none  dark:focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                placeholder="name@email.com"
                required
              />
            </div>
          </div>
          <div className="pb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0] ]"
            >
              Contraseña
            </label>
            <div className="relative text-slate-600 dark:text-[#e0e0e0] ">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <PassIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="placeholder:text-slate-600 dark:placeholder:text-[#e0e0e0] pl-12 mb-2 bg-transparent text-slate-600 dark:text-[#e0e0e0]  border sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-600 dark:text-[#e0e0e0] absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-32  hover:text-[#e0e0e0] mx-auto focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
          >
            {loading && (
              <Loader outerWidth="25" outerHeight="25" innerScale={0.7} />
            )}
            Ingresar
          </Button>
        </form>
      </Card>
    </TabsContent>
  );
};

export default LoginForm;
