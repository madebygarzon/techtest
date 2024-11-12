import React, { useState } from "react";
import Header from "@/components/header";
import { useQuery } from "@apollo/client";
import { BreadIncoReport } from "@/components/breadcrumb"; // Componente de ruta de navegación
import { ChartTransactions } from "@/components/charts/chart_transactions"; // Componente para mostrar gráfico de transacciones
import { GET_TRANSACTIONS } from "../../graphql/index"; // Query para obtener transacciones
import { exportTransactionsToExcel } from "@/lib/exportToExcel"; // Función para exportar a Excel
import { exportTransactionsToCSV } from "@/lib/exportToCSV"; // Función para exportar a CSV
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { DownloadIcon, RefreshIcon } from "@/components/ui/icons"; // Iconos de descarga y actualización
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Componentes de UI para menú desplegable
import Image from "next/image";
import IconXLSX from "../../../public/assets/icons8-xls-48.png"; // Icono para formato XLSX
import IconCSV from "../../../public/assets/icons8-csv-48.png"; // Icono para formato CSV

// Definición de la interfaz de transacción
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

  const [isClicked, setIsClicked] = useState(false); // Estado para la animación de carga en el botón de refrescar
  const handleClick = async () => {
    setIsClicked(true);
    await refetch(); // Refresca los datos al hacer clic
    setIsClicked(false);
  };

  // Exporta las transacciones a formato Excel
  const handleExport = () => {
    if (data && data.transactions) {
      exportTransactionsToExcel(data.transactions);
    }
  };

  // Exporta las transacciones a formato CSV
  const handleExportCSV = () => {
    if (data && data.transactions) {
      exportTransactionsToCSV(data.transactions);
    }
  };

  // Calcula los totales de las transacciones
  const totalAmount = data?.transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIngresos = data?.transactions
    .filter((transaction) => transaction.type === "Ingreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0) ?? 0;

  const totalEgresos = data?.transactions
    .filter((transaction) => transaction.type === "Egreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0) ?? 0;

  const saldo = totalIngresos - totalEgresos; // Calcula el saldo

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader outerWidth="100" outerHeight="100" innerScale={0.7} /> {/* Indicador de carga */}
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <BreadIncoReport />
      <Header />
      <div className="border dark:border-[#303030] border-slate-300 rounded-xl p-10">
        <div className="flex justify-between">
          <h2 className="text-slate-600 dark:text-[#e0e0e0] text-2xl font-bold mb-4">Reportes</h2>
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

        <div className="flex items-center justify-center gap-4">
          <ChartTransactions
            totalIngresos={totalIngresos ?? 0}
            totalEgresos={totalEgresos ?? 0}
            totalMovimientos={totalAmount ?? 0}
          /> {/* Componente de gráfico de transacciones */}
          <div>
            <p className="mb-3 text-slate-600 dark:text-[#e0e0e0]">Detalle de transacciones</p>
            <div>
              <div className="mb-2 flex gap-1 items-center">
                <span className="h-3 w-3 rounded-full bg-[#2662D9] opacity-75"></span>
                <div className="text-slate-600 dark:text-[#e0e0e0]">
                  Ingresos: ${(totalIngresos ?? 0).toLocaleString()}
                </div>
              </div>
              <div className="mb-2 flex gap-1 items-center">
                <span className="h-3 w-3 rounded-full bg-[#E23670] opacity-75"></span>
                <div className="text-slate-600 dark:text-[#e0e0e0]">
                  Egresos: ${(totalEgresos ?? 0).toLocaleString()}
                </div>
              </div>
              <div className="mb-2 flex gap-1 items-center">
                <span className="h-3 w-3 rounded-full bg-[#3DAC66] opacity-75"></span>
                <div className="text-slate-600 dark:text-[#e0e0e0]">
                  Saldo: ${saldo.toLocaleString()}
                </div>
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="mt-4 mb-4 px-4 text-white">
                    <DownloadIcon /> Descargar transacciones
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-secondary dark:hover:text-black">
                  <DropdownMenuLabel>
                    <p className="text-slate-600 dark:text-[#e0e0e0]">Formato de descarga</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="bg-secundary">
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-400"
                      onClick={handleExport}
                    >
                      <button className="mt-4 mb-4 text-slate-600 dark:text-[#e0e0e0]">Formato .xlsx</button>
                      <DropdownMenuShortcut>
                        <Image
                          src={IconXLSX}
                          width={40}
                          height={40}
                          alt="IconXLSX"
                        />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-gray-400"
                      onClick={handleExportCSV}
                    >
                      <button className="mt-4 mb-4 text-slate-600 dark:text-[#e0e0e0]">Formato .csv</button>
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
