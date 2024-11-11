import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_TRANSACTION,
  GET_USERS,
  GET_TRANSACTIONS,
} from "../../graphql/index";
import Swal from "sweetalert2";
import { PlusIcon } from "@/components/ui/icons";
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
import Loader from "@/components/ui/loader";

interface User {
  id: string;
  name: string;
}

interface GetUsersData {
  users: User[];
}

interface Transaction {
  id: string;
  type: string;
  date: string;
  amount: number;
  userId: {
    name: string;
  };
}

const CreateTransactionForm: React.FC = () => {
  const { refetch } = useQuery<{ transactions: Transaction[] }>(
    GET_TRANSACTIONS
  );

  const {
    data,
    loading: usersLoading,
    error: usersError,
  } = useQuery<GetUsersData>(GET_USERS);

  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION);

  const [form, setForm] = useState({
    userId: "",
    type: "Ingreso",
    amount: "",
    date: "",
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
          userId: form.userId,
          type: form.type,
          amount: parseFloat(form.amount.toString()),
          date: form.date,
        },
      });

      Swal.fire({
        icon: "success",
        title: "¡Transacción creada exitosamente!",
        text: `Se creó un ${form.type} por valor de $${form.amount}`,
        showConfirmButton: false,
        timer: 4000,
      });

      setForm({
        userId:
          data && data.users && data.users.length > 0 ? data.users[0].id : "", // Puedes dejar vacío o preseleccionar
        type: "Ingreso",
        amount: "",
        date: "",
      });
    } catch (err) {
      console.error("Error creating transaction:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err instanceof Error ? err.message : "Ocurrió un error desconocido",
        timer: 4000,
      });
    }
  };

  if (usersLoading) return <p>Cargando usuarios...</p>;
  if (usersError) return <p>Error cargando usuarios, recargar la página: {usersError.message}</p>;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          {" "}
          <PlusIcon /> Nuevo movimiento
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px] bg-slate-100 p-0 border-l dark:border-l-gray-400 border-l-gray-800 rounded-none">
        <div className=" flex justify-center items-center h-screen dark:bg-secondary">
          <div className="relative">
            <div className="min-h-96 py-6 text-left  ">
              <h1 className="text-slate-600 dark:text-[#e0e0e0] text-2xl font-bold my-6 flex justify-center">
                Crear Transacción
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <Label className="w-80 bg-transparent block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0] ">
                    Usuario
                  </Label>
                  <select
                    className="dark:bg-secondary bg-slate-100 text-slate-600 dark:text-[#e0e0e0] border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 "
                    name="userId"
                    value={form.userId}
                    onChange={handleChange}
                    required
                  >
                    <option                      
                      value=""
                      disabled
                      className="dark:bg-secondary"
                    >
                      Seleccione un usuario
                    </option>
                    {data?.users.map((user: User) => (
                      <option                       
                        key={user.id}
                        value={user.id}
                        className="dark:bg-secondary"
                      >
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <Label className="block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0] ">
                    Concepto
                  </Label>
                  <select
                    className="dark:bg-secondary bg-slate-100 text-slate-600 dark:text-[#e0e0e0] border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                  >
                    <option  
                      value="Ingreso"
                      className="dark:bg-secondary bg-slate-100"
                    >
                      Ingreso
                    </option>
                    <option                     
                      value="Egreso"
                      className="dark:bg-secondary bg-slate-100"
                    >
                      Egreso
                    </option>
                  </select>
                </div>

                <div className="mb-2">
                  <Label className="dark:bg-transparent block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0] ">
                    Monto
                  </Label>
                  <Input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                    className="text-slate-600 dark:text-[#e0e0e0] border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 "
                  />
                </div>

                <div className="mb-2">
                  <Label className="block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0] ">
                    Fecha
                  </Label>
                  <Input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="dark:bg-transparent text-slate-600 dark:text-[#e0e0e0] border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 "
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={() => refetch()}
                    className="w-auto mx-auto focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                    type="submit"
                  >
                    {loading && (
                      <Loader
                        outerWidth="25"
                        outerHeight="25"
                        innerScale={0.7}
                      />
                    )}
                    Guardar movimiento
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTransactionForm;
