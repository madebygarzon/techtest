import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../../graphql/index";
import { BreadIncoExpen } from "@/components/breadcrumb";
import Header from "@/components/header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateTransactionForm from "@/components/incoexpen/createtrans";
import { FilterIcon, UserIcon } from "@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/ui/loader";

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
  const { data, loading, error } = useQuery<{ transactions: Transaction[] }>(
    GET_TRANSACTIONS
  );

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

  const uniqueTypes = [...new Set(data?.transactions.map((t) => t.type))];

  const totalAmount = filteredTransactions?.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIngresos = filteredTransactions
    ?.filter((transaction) => transaction.type === "ingreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalEngresos = filteredTransactions
    ?.filter((transaction) => transaction.type === "egreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div>
      <BreadIncoExpen />
      <Header />
      <h2 className="text-2xl font-bold mb-4">Transacciones</h2>
      <div className="border border-gray-200 rounded-lg shadow-md py-8 px-4 max-w-full">
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
          <div>
            <CreateTransactionForm />
          </div>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          <Table className="w-full">
            <TableCaption>Lista de transacciones</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Concepto</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Usuario</TableHead>
              </TableRow>
            </TableHeader>
            {filteredTransactions && filteredTransactions.length > 0 ? (
              <TableBody>
                {filteredTransactions.map((transaction: Transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>
                      $ {transaction.amount.toLocaleString("es-CO")}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.userId.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <p>No se encontraron transacciones.</p>
            )}

            <TableFooter>
              <TableRow>
                <TableCell className="font-bold">Total Ingresos</TableCell>
                <TableCell>
                  $ {totalIngresos?.toLocaleString("es-CO")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Total Egresos</TableCell>
                <TableCell>
                  $ {totalEngresos?.toLocaleString("es-CO")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Total Movimientos</TableCell>
                <TableCell>$ {totalAmount?.toLocaleString("es-CO")}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
