import React from "react";
import { ArrowForwardIcon } from "@/components/ui/icons";
import { HomeIcon } from "@/components/ui/icons";
import { BalanceIcon, UserIcon, ReportIcon } from "@/components/ui/icons";
import { TabsTrigger, TabsList } from "@/components/ui/tabs";

export const BreadIncoExpen = () => {
  return (
    <div className=" flex items-center text-slate-500 dark:text-[#e0e0e0] text-xs">
      <TabsList className="bg-inherit  m-0 p-0 ">
        <TabsTrigger value="home" className="flex items-center">
          <HomeIcon className="text-slate-500 dark:text-[#e0e0e0] w-4 mt-[-3] mr-1" />
          <span className="text-slate-500 dark:text-[#e0e0e0]">inicio </span>
        </TabsTrigger>
      </TabsList>

      <ArrowForwardIcon className="w-2 mx-2" />
      <BalanceIcon className="w-4  mr-1" />
      <span className="cursor-pointer font-bold">Ingresos y egresos</span>
    </div>
  );
};

export const BreadIncoUser = () => {
  return (
    <div className=" flex items-center text-slate-500 dark:text-[#e0e0e0] text-xs">
      <TabsList className="bg-inherit  m-0 p-0 ">
        <TabsTrigger value="home" className="flex items-center">
          <HomeIcon className="text-slate-500 dark:text-[#e0e0e0] w-4 mt-[-3] mr-1" />
          <span className="text-slate-500 dark:text-[#e0e0e0]">inicio </span>
        </TabsTrigger>
      </TabsList>
      <ArrowForwardIcon className="w-2 mx-2" />
      <UserIcon className="w-4  mr-1" />
      <span className="cursor-pointer font-bold">Usuarios</span>
    </div>
  );
};
export const BreadIncoReport = () => {
  return (
    <div className=" flex items-center text-slate-500 dark:text-[#e0e0e0] text-xs">
      <TabsList className="bg-inherit  m-0 p-0 ">
        <TabsTrigger value="home" className="flex items-center">
          <HomeIcon className="text-slate-500 dark:text-[#e0e0e0] w-4 mt-[-3] mr-1" />
          <span className="text-slate-500 dark:text-[#e0e0e0]">inicio </span>
        </TabsTrigger>
      </TabsList>
      <ArrowForwardIcon className="w-2 mx-2" />
      <ReportIcon className="w-4  mr-1" />
      <span className="cursor-pointer font-bold">Reportes</span>
    </div>
  );
};
