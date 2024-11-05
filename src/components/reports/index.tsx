import React from "react";
import Header from "@/components/header";
import { useQuery } from "@apollo/client";
import { BreadIncoReport } from "@/components/breadcrumb";
import { BarChartMultiple } from "@/components/charts/bartchart";
import { ChartTransactions } from "@/components/charts/chart_transactions";
import { GET_TRANSACTIONS } from "../../../graphql/index";
import { exportTransactionsToExcel } from "@/lib/exportToExcel";
import { Button } from "@/components/ui/button";
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


const Reports = () => {
  
  const { data, loading, error } = useQuery<{ transactions: Transaction[] }>(
    GET_TRANSACTIONS
  );

  const handleExport = () => {
    if (data && data.transactions) {
      exportTransactionsToExcel(data.transactions);
    }
  };


  const totalAmount = data?.transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIngresos = data?.transactions
    .filter((transaction) => transaction.type === "ingreso")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalEngresos = data?.transactions
    .filter((transaction) => transaction.type === "egreso")
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
      <h2 className="text-2xl font-bold mb-4">Reportes</h2>
      <p>Sección de reportes y métricas.</p>
        <div className=" flex items-center justify-center gap-4 ">
          <BarChartMultiple />
          <ChartTransactions
                totalIngresos={totalIngresos ?? 0}
                totalEngresos={totalEngresos ?? 0}
                totalMovimientos={totalAmount ?? 0}
              />
              <Button onClick={handleExport} className="mt-4 mb-4 p-2 bg-blue-500 text-white rounded">
        Descargar Transacciones en Excel
      </Button>
        </div>
        
    </div>
  );
};

export default Reports;
