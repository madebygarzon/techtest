interface Transaction {
    id: string;
    type: string;
    date: string;
    amount: number;
    userId: {
      name: string;
    };
  }
  
  export const exportTransactionsToCSV = (transactions: Transaction[]) => {
    const csvContent = [
      ["Concepto", "Monto", "Fecha", "Usuario"],
      ...transactions.map((transaction) => [
        transaction.type,
        transaction.amount,
        transaction.date,
        transaction.userId.name,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Transacciones.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  