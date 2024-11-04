import React from "react";
import ItemReports from "@/components/home/itemreports";
import ItemUsers from "@/components/home/itemusers";
import ItemIncoexpe from "@/components/home/itemincoexpe";


const MenuItems = () => {
  return (
    <div className="bg-secondary flex h-full items-center gap-4 justify-center">
      <ItemIncoexpe />
      <ItemUsers />
      <ItemReports />
    </div>
  );
};

export default MenuItems;
