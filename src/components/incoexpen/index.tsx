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
import Logo from "../../../public/favicon.ico";
import Img from "next/image";
import CreateTransactionForm from "@/components/incoexpen/createtrans";

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
      <div>
        <BreadIncoExpen />
        <Header />
        <h2 className="text-2xl font-bold mb-4">Transacciones</h2>
        <div className="border border-gray-200 rounded-lg shadow-md py-8 px-4 max-w-full">
          <div className="max-h-[50vh] overflow-y-auto">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
                <Img src={Logo} alt="Loading..." width={50} height={50} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  const filteredTransactions = data?.transactions.filter(
    (transaction) =>
      (selectedType === "" || transaction.type === selectedType) &&
      (userSearch === "" ||
        transaction.userId.name.toLowerCase().includes(userSearch.toLowerCase()))
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
   
          

          
        
        <div className="mb-4 flex items-center justify-end gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Filtrar por Tipo</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Buscar por Usuario"
            className="border p-2 rounded w-1/3"
          />
          <CreateTransactionForm />
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
                <TableCell>$ {totalIngresos?.toLocaleString("es-CO")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Total Egresos</TableCell>
                <TableCell>$ {totalEngresos?.toLocaleString("es-CO")}</TableCell>
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
