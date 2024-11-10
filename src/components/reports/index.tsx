import React, { useState } from "react";
import Header from "@/components/header";
import { useQuery } from "@apollo/client";
import { BreadIncoReport } from "@/components/breadcrumb";
import { ChartTransactions } from "@/components/charts/chart_transactions";
import { GET_TRANSACTIONS } from "../../graphql/index";
import { exportTransactionsToExcel } from "@/lib/exportToExcel";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { DownloadIcon } from "@/components/ui/icons";
import { RefreshIcon } from "@/components/ui/icons";
import { saveAs } from "file-saver";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import IconXLSX from "../../../public/assets/icons8-xls-48.png";
import IconCSV from "../../../public/assets/icons8-csv-48.png";

interface Transaction {
  id: string;
  type: string;
  date: string;
  amount: number;
  userId: {
    name: string;
  };
}

const Reports = () => {
  const { data, loading, error, refetch } = useQuery<{
    transactions: Transaction[];
  }>(GET_TRANSACTIONS);

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = async () => {
    setIsClicked(true);
    await refetch();
    setIsClicked(false);
  };

  const exportTransactionsToCSV = (transactions: Transaction[]) => {
    const csvContent = transactions
      .map((transaction) => Object.values(transaction).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Transacciones.csv");
  };

  const handleExport = () => {
    if (data && data.transactions) {
      exportTransactionsToExcel(data.transactions);
    }
  };

  const handleExportCSV = () => {
    if (data && data.transactions) {
      exportTransactionsToCSV(data.transactions);
    }
  };

  const totalAmount = data?.transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIngresos = data?.transactions
    .filter((transaction) => transaction.type === "Ingreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalEngresos = data?.transactions
    .filter((transaction) => transaction.type === "Egreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader outerWidth="100" outerHeight="100" innerScale={0.7} />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <BreadIncoReport />
      <Header />
      <div className="border border-[#303030] rounded-xl p-10">
        <div className="flex justify-between">
          <h2 className="text-[#e0e0e0] text-2xl font-bold mb-4">Reportes</h2>
          <div>
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

        <div className=" flex items-center justify-center gap-4 ">
          <ChartTransactions
            totalIngresos={totalIngresos ?? 0}
            totalEngresos={totalEngresos ?? 0}
            totalMovimientos={totalAmount ?? 0}
          />
          <div>
            <p className="mb-3 text-[#e0e0e0]">Detalle de transacciones</p>
            <div>
              <div className="mb-2 flex gap-1 items-center ">
                <span className=" h-3 w-3 rounded-full bg-[#2662D9] opacity-75"></span>
                <div className="text-gray-400">
                  Ingresos: ${(totalIngresos ?? 0).toLocaleString()}
                </div>
              </div>
              <div className="mb-2 flex gap-1 items-center ">
                <span className=" h-3 w-3 rounded-full bg-[#E23670] opacity-75"></span>
                <div className="text-gray-400">
                  Egresos: ${(totalEngresos ?? 0).toLocaleString()}
                </div>
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="mt-4 mb-4 px-4  text-white">
                    <DownloadIcon /> Descargar transacciones
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-secondary  hover:text-black">
                  <DropdownMenuLabel>
                    <p className="text-white">Formato de descarga</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="bg-secundary">
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-400"
                      onClick={handleExport}
                    >
                      <button className="mt-4 mb-4">Formato .xlsx</button>
                      <DropdownMenuShortcut>
                        <Image
                          src={IconXLSX}
                          width={40}
                          height={40}
                          alt="IconCSV"
                        />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-400"
                      onClick={handleExportCSV}
                    >
                      <button className="mt-4 mb-4 ">Formato .csv</button>
                      <DropdownMenuShortcut>
                        <Image
                          src={IconCSV}
                          width={40}
                          height={40}
                          alt="IconCSV"
                        />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
