import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/index";
import { BreadIncoExpen } from "@/components/breadcrumb";
import Header from "@/components/header";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateTransactionForm from "@/components/incoexpen/createtrans";
import { FilterIcon, UserIcon, RefreshIcon } from "@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/ui/loader";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

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
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = async () => {
    setIsClicked(true);
    await refetch();
    setIsClicked(false);
  };

  const { data, loading, error, refetch } = useQuery<{
    transactions: Transaction[];
  }>(GET_TRANSACTIONS);

  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "Admin";

  const [selectedType, setSelectedType] = useState("");
  const [userSearch, setUserSearch] = useState("");

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader outerWidth="100" outerHeight="100" innerScale={0.7} />
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  const filteredTransactions = data?.transactions.filter(
    (transaction) =>
      (selectedType === "" || transaction.type === selectedType) &&
      (userSearch === "" ||
        transaction.userId.name
          .toLowerCase()
          .includes(userSearch.toLowerCase()))
  );

  const uniqueTypes = [
    ...new Set(data?.transactions.map((t) => t.type)),
  ].filter(Boolean);

  const totalAmount = filteredTransactions?.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIngresos = filteredTransactions
    ?.filter((transaction) => transaction.type === "Ingreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalEngresos = filteredTransactions
    ?.filter((transaction) => transaction.type === "Egreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="">
      <BreadIncoExpen />
      <Header />
      <div className="border border-[#303030] rounded-xl  py-8 px-4 max-w-full">
        <div className="flex justify-between">
          <div>
            <h2 className="relative ml-1 text-2xl text-[#e0e0e0] font-bold mb-4">
              Transacciones
            </h2>
          </div>

          <div className="mb-6 flex items-center justify-end gap-4">
            <div>
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value)}
              >
                <SelectTrigger className="w-[180px] pl-12 bg-transparent text-[#e0e0e0] border border-gray-400 sm:text-sm rounded-lg ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 p-2.5 py-3">
                  <FilterIcon />
                  <SelectValue placeholder="Filtrar por Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <UserIcon />
              </span>
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Filtrar por Usuario"
                className="w-64 h-9 pl-12  bg-transparent text-[#e0e0e0] border border-slate-400  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block  p-2.5 py-3 px-4"
              />
            </div>
            
            <div>{isAdmin && <CreateTransactionForm />}</div>

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

        <div className="max-h-[50vh] mt-8 overflow-y-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hover:bg-[#3030302c] border-b border-gray-500">
                <TableHead className="text-[#e0e0e0] text-lg">
                  Concepto
                </TableHead>
                <TableHead className="text-[#e0e0e0] text-lg">Monto</TableHead>
                <TableHead className="text-[#e0e0e0] text-lg">Fecha</TableHead>
                <TableHead className="text-[#e0e0e0] text-lg">
                  Usuario
                </TableHead>
              </TableRow>
            </TableHeader>
            {filteredTransactions && filteredTransactions.length > 0 ? (
              <TableBody>
                {filteredTransactions.map((transaction: Transaction) => (
                  <TableRow
                    className="text-gray-400 hover:bg-[#3030302c] hover:text-[#e0e0e0] border-b border-b-[#303030]"
                    key={transaction.id}
                  >
                    <TableCell className="border border-[#303030]">
                      {transaction.type}
                    </TableCell>
                    <TableCell className="border border-[#303030]">
                      $ {transaction.amount.toLocaleString("es-CO")}
                    </TableCell>
                    <TableCell className="border border-[#303030]">
                      {transaction.date}
                    </TableCell>
                    <TableCell className="border border-[#303030]">
                      {transaction.userId.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <p>No se encontraron transacciones.</p>
            )}

            <TableFooter className="hover:bg-[#3030302c] bg-transparent pt-4">
              <TableRow className="hover:bg-[#3030302c]">
                <TableCell className="border-l border-l-[#303030] border-b border-b-[#303030] font-bold text-gray-400">
                  Total Ingresos
                </TableCell>
                <TableCell className="border-b border-b-[#303030]"></TableCell>
                <TableCell className="border-b border-b-[#303030]"></TableCell>
                <TableCell className="border-b border-b-[#303030] text-[#e0e0e0] border-r border-r-[#303030]">
                  $ {totalIngresos?.toLocaleString("es-CO")}
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-[#3030302c]">
                <TableCell className="border-l border-l-[#303030] border-b border-b-[#303030] font-bold text-gray-400">
                  Total Egresos
                </TableCell>
                <TableCell className="border-b border-b-[#303030]"></TableCell>
                <TableCell className="border-b border-b-[#303030]"></TableCell>
                <TableCell className="border-b border-b-[#303030] border-r border-r-[#303030] text-[#e0e0e0]">
                  $ {totalEngresos?.toLocaleString("es-CO")}
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-[#3030302c]">
                <TableCell className="border-b border-l border-l-[#303030] border-b-[#303030] font-bold text-gray-400">
                  Total Movimientos
                </TableCell>
                <TableCell className="border-b border-b-[#303030]"></TableCell>
                <TableCell className="border-b border-b-[#303030]"></TableCell>
                <TableCell className="border-b border-r border-r-[#303030] border-b-[#303030] text-[#e0e0e0]">
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
