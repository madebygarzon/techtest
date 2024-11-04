import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../graphql/index";
import Swal from "sweetalert2";
interface UserForm {
  name: string;
  email: string;
  phone?: string;
  role: string;
}
import { Button } from "../ui/button";
const SignUpPage: React.FC = () => {
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    phone: "",
    role: "Usuario",
  });

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    role: "Usuario",
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
      await createUser({
        variables: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
        },
      });
      Swal.fire({
        icon: "success",
        title: "¡Usuario creado exitosamente!",
        showConfirmButton: false,
        timer: 1500,
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
    <div className="bg-white flex columns-1 justify-center items-center h-screen dark:bg-gray-900">
      {loading && <p>Submitting...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="relative py-3 w-6/12 mx-auto">
        <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <h1 className="text-slate-600 text-2xl font-bold my-6 flex justify-center">
            Registrarme
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">
                Name:
              </label>
              <input
                placeholder="Usuario"
                className="text-slate-600 border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">
                Email:
              </label>
              <input
                placeholder="Usuario"
                className="text-slate-600 border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">
                Phone:
              </label>
              <input
                placeholder="Usuario"
                className="text-slate-600 border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">
                Role:
              </label>
              <select
                className="text-slate-600 border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="Usuario">Usuario</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <Button className="block mx-auto" type="submit" disabled={loading}>
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
