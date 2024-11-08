import React from "react";
import { UserIcon } from "@/components/ui/icons";
import { TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const ItemUsers = () => {
  return (
    <div className="border-2 border-primary hover:border-tertiary h-64 group overflow-hidden bg-[#0C1222] rounded-xl bg-gradient-to-tr from-[#171717] via-[#0D0D0D] to-[#000000] text-gray-50">
      <div className="before:duration-700 before:absolute before:w-28 before:h-28 before:bg-transparent before:blur-none before:border-8 before:opacity-50 before:rounded-full before:-left-4 before:-top-12 w-64 h-48  flex flex-col justify-between relative z-10 group-hover:before:top-28 group-hover:before:left-44 group-hover:before:scale-125 group-hover:before:blur">
        <div className="px-6 py-8 sm:p-10 sm:pb-6">
          <div className="grid items-center justify-center w-full grid-cols-1 text-left">
            <div>
              <UserIcon width={40} height={40} />
              <h2 className="text-lg font-medium tracking-tighter text-white lg:text-3xl">
                Usuarios
              </h2>
              <p className="mt-2 text-sm text-white">
                Sección para la gestión de usuarios.
              </p>
            </div>
          </div>
        </div>
        <div className="flex px-6 pb-8 sm:px-8">
          <TabsList className="bg-inherit  m-0 p-0 ">
            <TabsTrigger value="users" className="flex items-center">
              <Button>
                <a
                  aria-describedby="tier-company"
                  className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200   rounded-lg nline-flex focus:outline-none  text-sm focus-visible:ring-black"
                  href="#"
                >
                  Ver
                </a>
              </Button>
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
    </div>
  );
};

export default ItemUsers;
