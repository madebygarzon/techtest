import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/index";
import { BreadIncoExpen } from "@/components/breadcrumb"; // Componente para mostrar la ruta de navegación
import Header from "@/components/header"; // Encabezado de la página
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Componentes para estructurar la tabla
import CreateTransactionForm from "@/components/incoexpen/createtrans"; // Formulario para crear una nueva transacción
import { FilterIcon, UserIcon, RefreshIcon } from "@/components/ui/icons"; // Iconos utilizados en los filtros y botones
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Componentes del menú select para el filtro
import Loader from "@/components/ui/loader"; // Componente de carga
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

// Extendiendo interfaces de "next-auth" para incluir datos de usuario y rol
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }
  interface User {
    role: string;
  }
}

// Definición de la interfaz de transacciones
interface Transaction {
  id: string;
  type: string;
  date: string;
  amount: number;
  userId: {
    name: string;
  };
}

const Transactions = () => {
  const [isClicked, setIsClicked] = useState(false); // Estado para mostrar la animación de carga en el botón de actualización
  const handleClick = async () => {
    setIsClicked(true); // Activa el estado de carga
    await refetch(); // Refresca los datos al hacer clic
    setIsClicked(false); // Desactiva el estado de carga
  };

  // Query para obtener las transacciones
  const { data, loading, error, refetch } = useQuery<{
    transactions: Transaction[];
  }>(GET_TRANSACTIONS);

  const { data: session } = useSession(); // Obtiene la sesión de autenticación
  const isAdmin = session?.user?.role === "Admin"; // Verifica si el usuario tiene rol de Admin

  const [selectedType, setSelectedType] = useState(""); // Estado para el filtro de tipo de transacción
  const [userSearch, setUserSearch] = useState(""); // Estado para el filtro de búsqueda de usuario

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader outerWidth="100" outerHeight="100" innerScale={0.7} /> {/* Componente de carga */}
      </div>
    );

  if (error) return <p>Error: {error.message}</p>; // Muestra el error si ocurre alguno

  // Filtra las transacciones según el tipo y el nombre de usuario
  const filteredTransactions = data?.transactions.filter(
    (transaction) =>
      (selectedType === "" || transaction.type === selectedType) &&
      (userSearch === "" ||
        transaction.userId.name
          .toLowerCase()
          .includes(userSearch.toLowerCase()))
  );

  // Obtiene los tipos de transacción únicos
  const uniqueTypes = [
    ...new Set(data?.transactions.map((t) => t.type)),
  ].filter(Boolean);

  // Calcula los totales de montos
  const totalAmount = filteredTransactions?.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIngresos = filteredTransactions
    ?.filter((transaction) => transaction.type === "Ingreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalEgresos = filteredTransactions
    ?.filter((transaction) => transaction.type === "Egreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="">
      <BreadIncoExpen />
      <Header />
      <div className="border dark:border-[#303030] border-slate-300 rounded-xl  py-8 px-4 max-w-full">
        <div className="flex justify-between">
          <div className="gap-0">
            <h2 className="relative ml-1 text-2xl text-slate-600 dark:text-[#e0e0e0] font-bold">
              Transacciones
            </h2>
            <p className="ml-1 text-sm text-slate-500 dark:text-gray-400">
              Total de movimientos: $ {totalAmount?.toLocaleString("es-CO")}
            </p>
          </div>

          <div className="mb-6 flex items-center justify-end gap-4">
            <div>
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value)}
              >
                <SelectTrigger className="w-[180px] pl-12 text-slate-600 dark:text-[#e0e0e0] border border-gray-400 sm:text-sm rounded-lg ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 p-2.5 py-3">
                  <FilterIcon />
                  <SelectValue placeholder="Filtrar por concepto" />
                </SelectTrigger>

                <SelectContent className="bg-slate-100 dark:bg-secondary">
                  {uniqueTypes.map((type) => (
                    <SelectItem
                      className=" bg-slate-100 text-gray-400 dark:bg-transparent"
                      key={type}
                      value={type}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Input de búsqueda para filtrar por usuario */}
            <div className="relative text-slate-600 dark:text-[#e0e0e0] ">
              <span className="text-slate-600 dark:text-[#e0e0e0] absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <UserIcon />
              </span>
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Filtrar por usuario"
                className="w-64 h-9 pl-12 placeholder:text-slate-600 dark:placeholder:text-[#e0e0e0]  bg-transparent text-slate-600 dark:text-[#e0e0e0] border border-slate-400  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block  p-2.5 py-3 px-4"
              />
            </div>

            <div>{isAdmin && <CreateTransactionForm />}</div> {/* Formulario de creación visible solo para Admin */}

            <Button
              onClick={handleClick}
              className="px-4 py-2 text-white rounded-lg"
            >
              <RefreshIcon /> Actualizar{" "}
              {isClicked && (
                <Loader outerWidth="25" outerHeight="25" innerScale={0.7} /> 
              )}
            </Button>
          </div>
        </div>

        {/* Tabla de transacciones */}
        <div className="max-h-[50vh] mt-8 overflow-y-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hover:bg-[#cecece2c] dark:hover:bg-[#3030302c] border-b border-gray-500">
                <TableHead className="text-slate-600 dark:text-[#e0e0e0] text-lg">
                  Concepto
                </TableHead>
                <TableHead className="text-slate-600 dark:text-[#e0e0e0] text-lg">
                  Monto
                </TableHead>
                <TableHead className="text-slate-600 dark:text-[#e0e0e0] text-lg">
                  Fecha
                </TableHead>
                <TableHead className="text-slate-600 dark:text-[#e0e0e0] text-lg">
                  Usuario
                </TableHead>
              </TableRow>
            </TableHeader>
            {filteredTransactions && filteredTransactions.length > 0 ? (
              <TableBody>
                {filteredTransactions.map((transaction: Transaction) => (
                  <TableRow
                    className="text-slate-600 dark:text-[#e0e0e0] hover:bg-[#cecece2c] dark:hover:bg-[#3030302c] hover:text-slate-800 dark:hover:text-[#e0e0e0] border-b border-b-[#303030]"
                    key={transaction.id}
                  >
                    <TableCell className="border hover:bg-[#cecece2c] dark:hover:bg-[#3030302c]">
                      {transaction.type}
                    </TableCell>
                    <TableCell className="border hover:bg-[#cecece2c] dark:hover:bg-[#3030302c]">
                      $ {transaction.amount.toLocaleString("es-CO")}
                    </TableCell>
                    <TableCell className="border hover:bg-[#cecece2c] dark:hover:bg-[#3030302c]">
                      {transaction.date}
                    </TableCell>
                    <TableCell className="border hover:bg-[#cecece2c] dark:hover:bg-[#3030302c]">
                      {transaction.userId.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <div className="h-10 flex items-center justify-center">
                ¡No se encontraron transacciones!
              </div>
            )}

            <TableFooter className="hover:bg-[#cecece2c] dark:hover:bg-[#3030302c] bg-transparent pt-4">
              <TableRow className="hover:bg-[#cecece2c] dark:hover:bg-[#3030302c]">
                <TableCell className="border-l dark:border-l-[#303030] border-b dark:border-b-[#303030] font-bold dark:text-gray-400">
                  Total Ingresos
                </TableCell>
                <TableCell className="border-b dark:border-b-[#303030]"></TableCell>
                <TableCell className="border-b dark:border-b-[#303030]"></TableCell>
                <TableCell className="border-b dark:border-b-[#303030] text-slate-600 dark:text-[#e0e0e0] border-r ">
                  $ {totalIngresos?.toLocaleString("es-CO")}
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-[#cecece2c] dark:hover:bg-[#3030302c]">
                <TableCell className="border-l dark:border-b-[#303030] border-b  font-bold dark:text-gray-400">
                  Total Egresos
                </TableCell>
                <TableCell className="border-b dark:border-b-[#303030]"></TableCell>
                <TableCell className="border-b dark:border-b-[#303030]"></TableCell>
                <TableCell className="border-b dark:border-b-[#303030] border-r dark:border-r-[#303030] text-slate-600 dark:text-[#e0e0e0] ">
                  $ {totalEgresos?.toLocaleString("es-CO")}
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-[#cecece2c] dark:hover:bg-[#3030302c]">
                <TableCell className="border-b border-l dark:border-l-[#303030] dark:border-b-[#303030] font-bold dark:text-gray-400">
                  Total Movimientos
                </TableCell>
                <TableCell className="border-b dark:border-b-[#303030]"></TableCell>
                <TableCell className="border-b dark:border-b-[#303030]"></TableCell>
                <TableCell className="border-b border-r dark:border-b-[#303030] text-slate-600 dark:text-[#e0e0e0] ">
                  $ {totalAmount?.toLocaleString("es-CO")}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
