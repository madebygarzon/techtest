import React, { useState } from "react";
import {
  MailIcon,
  PassIcon,
  NameInputIcon,
  PhoneIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../ui/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../graphql/index";
import bcrypt from "bcryptjs";
import Loader from "@/components/ui/loader";
import LoginForm2 from "@/components/auth/loginform2";


interface UserForm {
  name: string;
  email: string;
  phone?: string;
  role: string;
  password: string;
  confirmPassword: string;
}
const LoginForm: React.FC = () => {
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    phone: "",
    role: "Usuario",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    role: "Usuario",
    password: "",
    confirmPassword: "",
  };

  const [createUser, { loading }] = useMutation(CREATE_USER);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === "confirmPassword" || name === "password") {
      setPasswordError(
        form.password !== value && name === "confirmPassword"
          ? "Las contraseñas no coinciden"
          : ""
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }
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
        title: "¡Te has registrado exitosamente!",
        text: `${form.name}, ya tienes acceso a la plataforma.`,
        showConfirmButton: false,
        timer: 4000,
      });
      setForm(initialFormState);
    } catch (err) {
      console.error("Error creating user:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Ocurrió un error desconocido";
      const isDuplicateEmailError = errorMessage.includes(
        'duplicate key value violates unique constraint "users_email_key"'
      );

      Swal.fire({
        icon: "error",
        title: "El registro ha fallado",
        text: isDuplicateEmailError
          ? `El correo: ${form.email} ya está registrado`
          : errorMessage,
        timer: 4000,
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

      <LoginForm2 />

      <TabsContent value="password">
        <Card className="bg-secondary p-4 border-none shadow-none m-2">
          <div className="flex flex-row p-4 ">
            <h1 className="text-3xl mx-auto font-bold text-[#e0e0e0] my-auto">
              Registrarme
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
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

            <div className="flex gap-2">
              <div className="pb-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-[#e0e0e0]"
                >
                  Nombre
                </label>
                <div className="relative text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <NameInputIcon />
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
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-[#e0e0e0]"
                >
                  Teléfono
                </label>
                <div className="relative text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <PhoneIcon />
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
            </div>

            <div className="flex gap-2">
              <div className="pb-2">
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
                    placeholder="••••••••••"
                    className="pl-12 mb-2 bg-transparent text-[#e0e0e0] border  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>
              </div>

              <div className="pb-2">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-[#e0e0e0]"
                >
                  Confirmar Contraseña
                </label>
                <div className="relative text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <PassIcon />
                  </span>
                  <input
                    placeholder="••••••••••"
                    className="pl-12 mb-2 bg-transparent text-[#e0e0e0] border sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
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
              {loading && (
                <Loader outerWidth="25" outerHeight="25" innerScale={0.7}/>
              )}{" "}
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
