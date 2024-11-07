import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"; // Suponiendo que tienes un componente Button personalizado

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" }); // Redirige a una URL después del cierre de sesión
  };

  return (
    <Button
      onClick={handleLogout}
    >
      Cerrar sesión
    </Button>
  );
};

export default LogoutButton;
