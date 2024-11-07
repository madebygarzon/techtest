import React from "react";
import ItemReports from "@/components/home/itemreports";
import ItemUsers from "@/components/home/itemusers";
import ItemIncoexpe from "@/components/home/itemincoexpe";
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

const MenuItems = () => {
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "Admin";

  return (
    <div className="bg-secondary flex h-full items-center gap-4 justify-center">
      <ItemIncoexpe />
      {isAdmin && <ItemUsers />}
      {isAdmin && <ItemReports />}
    </div>
  );
};

export default MenuItems;
