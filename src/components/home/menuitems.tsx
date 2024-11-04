import React from "react";
import ItemReports from "@/components/home/itemreports";
import ItemUsers from "@/components/home/itemusers";
import ItemIncoexpe from "@/components/home/itemincoexpe";
// import Header from "@/components/header";

const MenuItems = () => {
  return (
    <div className="flex h-full items-center gap-4 justify-center">
      {/* <div className="absolute top-10">
        <Header />
      </div> */}
      <ItemIncoexpe />
      <ItemUsers />
      <ItemReports />
    </div>
  );
};

export default MenuItems;
