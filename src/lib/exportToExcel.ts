import * as XLSX from "xlsx";

interface Transaction {
  id: string;
  type: string;
  date: string;
  amount: number;
  userId: {
    name: string;
  };
}

export const exportTransactionsToExcel = (transactions: Transaction[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    transactions.map((transaction) => ({
      // ID: transaction.id,
      Concepto: transaction.type,
      Monto: transaction.amount,
      Fecha: transaction.date,
      Usuario: transaction.userId.name,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transacciones");

  XLSX.writeFile(workbook, "Transacciones.xlsx");
};
