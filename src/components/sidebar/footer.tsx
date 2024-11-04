import React from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "@/components/ui/icons";


const FooterSideBar = () => {
  return (
    <div className="absolute bottom-4">
      <div className="space-y-1">
        <Button>
          <LogOutIcon />Cerrar sesión
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="flex ml-2 h-5 items-center space-x-4 text-sm">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex gap-1 items-center ">
        <span className=" h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
        <div className="">user@email.com</div>
        </div>
        
        
      </div>

      
    </div>
  );
};

export default FooterSideBar;
