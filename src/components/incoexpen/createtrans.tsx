import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TRANSACTION, GET_USERS } from "../../../graphql/index";
import Swal from "sweetalert2";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

interface User {
  id: string;
  name: string;
}

interface GetUsersData {
  users: User[];
}

const CreateTransactionForm: React.FC = () => {
  const {
    data,
    loading: usersLoading,
    error: usersError,
  } = useQuery<GetUsersData>(GET_USERS);
  const [createTransaction, { loading, error }] =
    useMutation(CREATE_TRANSACTION);

  const [form, setForm] = useState({
    userId: "",
    type: "ingreso",
    amount: 0,
    date: "",
    description: "",
  });

  useEffect(() => {
    if (data && data.users && data.users.length > 0) {
      setForm((prevForm) => ({ ...prevForm, userId: data.users[0].id }));
    }
  }, [data]);

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
      await createTransaction({
        variables: {
          userId: form.userId, // Pasar solo el ID aquí
          type: form.type,
          amount: parseFloat(form.amount.toString()),
          date: form.date,
          description: form.description,
        },
      });
      Swal.fire({
        icon: "success",
        title: "¡Transacción creada exitosamente!",
        text: `Se ha creado una transacción de ${form.amount} `,
        showConfirmButton: false,
        timer: 1500,
      });
      if (data && data.users && data.users.length > 0) {
        setForm({
          userId: data.users[0].id,
          type: "ingreso",
          amount: 0,
          date: "",
          description: "",
        });
      }
    } catch (err) {
      console.error("Error creating transaction:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err instanceof Error ? err.message : "Ocurrió un error desconocido",
      });
    }
  };

  if (usersLoading) return <p>Loading users...</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button >Open</Button>
      </SheetTrigger>
      <SheetContent  className="p-0 border-0 rounded-none">
        <div className="bg-background flex  justify-center items-center h-screen dark:bg-gray-900">
          <div className="relative">
            <div className="min-h-96  py-6 text-left rounded-xl shadow-lg">
              <h1 className="text-slate-600 text-2xl font-bold my-6 flex justify-center">
                Crear Transacción
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-2">
                  <Label className="font-semibold text-xs text-gray-400">
                    Usuario:
                  </Label>
                  <select
                    className="text-slate-600 border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                    name="userId"
                    value={form.userId}
                    onChange={handleChange}
                  >
                    {data?.users.map((user: User) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <Label className="font-semibold text-xs text-gray-400">
                    Concepto:
                  </Label>
                  <select
                    className="text-slate-600 border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="ingreso">Ingreso</option>
                    <option value="egreso">Egreso</option>
                  </select>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <Label className="font-semibold text-xs text-gray-400">
                    Monto:
                  </Label>
                  <Input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                    className="text-slate-600 border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                  />
                </div>




                <div className="w-full flex flex-col gap-2">
                  <Label className="font-semibold text-xs text-gray-400">
                    Fecha:
                  </Label>
                  <Input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="text-slate-600 border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                  />
                </div>





                <Button
                  className="block mx-auto"
                  type="submit"
                  
                >
                  Crear
                </Button>

                {loading && <p>Enviando...</p>}
                {error && <p>Error: {error.message}</p>}
              </form>
            </div>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTransactionForm;
