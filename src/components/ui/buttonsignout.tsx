import React from "react";
import { signOut } from "next-auth/react";


const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" }); 
  };

  return (
    <button
      onClick={handleLogout}
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
