import React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { BalanceIcon, UserIcon, ReportIcon } from "@/components/ui/icons";
import { useSession } from "next-auth/react";

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
const ItemsSideBar = () => {
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "Admin";

  return (
    <div className="text-white flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center">
        <TabsTrigger
          value="incomesexpenses"
          className="rounded-xl flex items-center my-2 gap-2 justify-start w-60 px-4 py-2 h-12"
        >
          <BalanceIcon />
          Ingresos y egresos
        </TabsTrigger>

        {isAdmin && (
          <TabsTrigger
            value="users"
            className="rounded-xl flex items-center my-2 gap-2 justify-start w-60 px-4 py-2 h-12"
          >
            <UserIcon />
            Usuarios
          </TabsTrigger>
        )}

        {isAdmin && (
          <TabsTrigger
            value="reports"
            className="rounded-xl flex items-center my-2 gap-2 justify-start w-60 px-4 py-2 h-12"
          >
            <ReportIcon />
            Reportes
          </TabsTrigger>
        )}
      </div>
    </div>
  );
};

export default ItemsSideBar;
