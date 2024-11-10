import React, { useEffect, useState } from "react";
import LogoutButton from "@/components/ui/buttonsignout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/ui/loader";

interface User {
  name: string;
  email: string;
  id: string;
  role: string;
  phone?: string;
}

const FooterSideBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const apiUrl =
    process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/auth/session`);
        if (!response.ok) throw new Error("Error fetching user data");

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [apiUrl]);

  return (
    <div className="absolute bottom-4">
      <div className="space-y-1"></div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex ml-2 h-6 items-center space-x-4 text-sm">
              <Button
                className="justify-start text-gray-400 hover:text-[#e0e0e0] hover:bg-transparent border-none h-12 w-[250px]"
                variant="outline"
              >
                <div className="flex gap-1 items-center">
                  <span className="h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                  <div>
                    {isLoading ? (
                      <Loader
                        outerWidth="20"
                        outerHeight="20"
                        innerScale={0.7}
                      />
                    ) : user ? (
                      user.email
                    ) : (
                      "Usuario no encontrado"
                    )}
                  </div>
                </div>
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-primary text-gray-400 w-56">
            <DropdownMenuLabel className="text-[#e0e0e0]">
              Mi cuenta
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                {user ? user.name : "Cargando..."}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {user ? user.role : "Cargando..."}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {user ? user.email : "Cargando..."}
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FooterSideBar;
