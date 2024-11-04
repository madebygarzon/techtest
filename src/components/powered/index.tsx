import React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Powered = () => {
  return (
    <div className="absolute bottom-2 right-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button className="text-slate-600 text-xs" variant="link">
            <p className="legal">
              <strong>
                {" "}
                by<span className="text-[#FECE00]">Garzon</span>
              </strong>
            </p>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="bg-[#0C1222] text-white w-80">
          <div className="flex justify-between space-x-4">
            <Avatar className="p-2">
              <AvatarImage src="https://www.bygarzon.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbygarzon_logo.ca10dcdc.png&w=128&q=75" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="legal">
                <strong>
                  {" "}
                  by<span className="text-[#FECE00]">Garzon</span>
                </strong>
              </p>
              <p className="text-sm">
                Soy Carlos Garzón, desarrollador web full-stack
              </p>
              <div className="flex items-center pt-2">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default Powered;
