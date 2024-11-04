import React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { BalanceIcon, UserIcon, ReportIcon } from "@/components/ui/icons";

const ItemsSideBar = () => {
  return (
    <div className="text-white flex flex-col items-center justify-center">
      <TabsTrigger value="incomesexpenses" className="flex items-center my-2 gap-2 justify-start w-60 px-4 py-2 h-12">
        <BalanceIcon />Ingresos y egresos
      </TabsTrigger>
      <TabsTrigger value="users" className="flex items-center my-2 gap-2 justify-start w-60 px-4 py-2 h-12">
        <UserIcon />Usuarios
      </TabsTrigger>
      <TabsTrigger value="reports" className="flex items-center my-2 gap-2 justify-start w-60 px-4 py-2 h-12">
       <ReportIcon />Reportes
      </TabsTrigger>
    </ div>
  );
};

export default ItemsSideBar;
