import React, { useState } from "react";
import { signIn } from "next-auth/react";
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
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/index";
import bcrypt from "bcryptjs";
import Loader from "@/components/ui/loader";
import { TabsContent } from "@/components/ui/tabs";

interface UserForm {
  name: string;
  email: string;
  phone?: string;
  role: string;
  password: string;
  confirmPassword: string;
}
const RegisterForm: React.FC = () => {
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    phone: "",
    role: "User",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    role: "User",
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

    if (name === "password") {
      validatePasswordStrength(value);
    }

    if (name === "confirmPassword" || name === "password") {
      setPasswordError(
        form.password !== value && name === "confirmPassword"
          ? "Las contraseñas no coinciden"
          : ""
      );
    }
  };

  const validatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }
    if (passwordStrength < 4) {
      setPasswordError(
        "La contraseña no cumple con los requisitos mínimos de seguridad"
      );
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
      await signIn("credentials", {
        redirect: true,
        email: form.email,
        password: form.password,
      });
      window.location.href = "/";

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
    <TabsContent value="password">
      <Card className="dark:bg-secondary bg-transparent p-4 border-none shadow-none m-2">
        <div className="flex flex-row p-4 ">
          <h1 className="text-3xl mx-auto font-bold text-slate-600 dark:text-[#e0e0e0] my-auto">
            Registrarme
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="pb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0]"
            >
              Correo electrónico
            </label>
            <div className="relative text-slate-600 dark:text-[#e0e0e0]">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <MailIcon />
              </span>
              <input
                placeholder="Correo electrónico"
                className="placeholder:text-slate-600 dark:placeholder:text-gray-400 pl-12 mb-2 bg-transparent text-slate-600 dark:text-[#e0e0e0]] border  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
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
                className="block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0]"
              >
                Nombre
              </label>
              <div className="relative text-slate-600 dark:text-[#e0e0e0]">
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
                  className="placeholder:text-slate-600 dark:placeholder:text-gray-400 pl-12 mb-2 bg-transparent text-slate-600 dark:text-[#e0e0e0] border  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                />
              </div>
            </div>

            <div className="pb-2">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0]"
              >
                Teléfono
              </label>
              <div className="relative text-slate-600 dark:text-[#e0e0e0]">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <PhoneIcon />
                </span>
                <input
                  placeholder="Teléfono"
                  className="placeholder:text-slate-600 dark:placeholder:text-gray-400 pl-12 mb-2 bg-transparent text-slate-600 dark:text-[#e0e0e0] border  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
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
                className="block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0]"
              >
                Contraseña
              </label>
              <div className="relative text-slate-600 dark:text-[#e0e0e0]">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <PassIcon />
                </span>
                <input
                  placeholder="••••••••••"
                  className="placeholder:text-slate-600 dark:placeholder:text-gray-400 pl-12 mb-2 bg-transparent text-slate-600 dark:text-[#e0e0e0] border sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-600 dark:text-[#e0e0e0]"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
            </div>

            <div className="pb-2">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0]"
              >
                Confirmar contraseña
              </label>
              <div className="relative text-slate-600 dark:text-[#e0e0e0]">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <PassIcon />
                </span>
                <input
                  placeholder="••••••••••"
                  className="placeholder:text-slate-600 dark:placeholder:text-gray-400 pl-12 mb-2 bg-transparent text-slate-600 dark:text-[#e0e0e0] border sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-600 dark:text-[#e0e0e0]"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-2">
            <div className="placeholder:text-slate-600 dark:placeholder:text-gray-400 mt-2 w-1/2 h-2 rounded bg-gray-300">
              <div
                className={`h-full rounded ${
                  passwordStrength === 4
                    ? "bg-green-500"
                    : passwordStrength >= 2
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${(passwordStrength / 4) * 100}%` }}
              ></div>
            </div>
            <div>
              <p className="text-slate-600 dark:text-[#e0e0e0] text-[10px] ">
                Tu contraseña debe contener al menos 8 caracteres, incluyendo
                una letra mayúscula, una letra minúscula y un número.
              </p>
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
            className="w-32 text-slate-600 dark:text-[#e0e0e0] hover:text-[#e0e0e0] mx-auto focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          >
            {loading && (
              <Loader outerWidth="25" outerHeight="25" innerScale={0.7} />
            )}{" "}
            Registrarme
          </Button>
          {passwordError && (
            <p className="mx-auto text-red-500 text-sm mt-1">
              *{passwordError}*
            </p>
          )}
        </form>
      </Card>
    </TabsContent>
  );
};

export default RegisterForm;
