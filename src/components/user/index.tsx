import React, { useState } from "react";
import Header from "@/components/header";
import { BreadIncoUser } from "@/components/breadcrumb"; // Componente de ruta de navegación
import { useQuery, useMutation } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Componentes de tabla de UI
import { GET_USERS_LIST, UPDATE_USER } from "../../graphql/index"; // Queries y mutations para obtener y actualizar usuarios
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditUserIcon, RefreshIcon } from "@/components/ui/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"; // Componentes de UI para modal tipo sheet
import Swal from "sweetalert2";
import Loader from "@/components/ui/loader";
import { Label } from "@/components/ui/label";
import { UserIcon } from "@/components/ui/icons";

// Definición de la interfaz de usuario
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

const Users = () => {
  const { data, loading, refetch, error } = useQuery<{ users: User[] }>(
    GET_USERS_LIST // Query para obtener la lista de usuarios
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Estado del usuario seleccionado para editar
  const [role, setRole] = useState(""); // Estado del rol del usuario seleccionado
  const [name, setName] = useState(""); // Estado del nombre del usuario seleccionado
  const [loadings, setloadings] = useState(false); // Estado de carga para el botón de guardar
  const [updateUser] = useMutation(UPDATE_USER); // Mutation para actualizar un usuario
  const [userSearch, setUserSearch] = useState(""); // Estado para el filtro de búsqueda de usuario

  // Maneja la actualización de la lista de usuarios y el guardado de cambios
  const handleCombinedClick = async () => {
    setloadings(true);
    try {
      await handleSave();
      handleSave();
      setTimeout(() => {
        handleClick();
      }, 2000);
    } catch (error) {
      console.error("Error en el proceso:", error);
    } finally {
      setloadings(false);
    }
  };

  const [isClicked, setIsClicked] = useState(false); // Estado para la animación de carga en el botón de refrescar
  const handleClick = async () => {
    setIsClicked(true);
    await refetch(); // Refresca los datos al hacer clic
    setIsClicked(false);
  };

  // Maneja la edición de un usuario seleccionado
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setRole(user.role);
    setName(user.name);
  };

  // Guarda los cambios realizados en el usuario seleccionado
  const handleSave = async () => {
    if (selectedUser) {
      try {
        await updateUser({ variables: { id: selectedUser.id, role, name } });
        Swal.fire({
          icon: "success",
          title: `¡Usuario actualizado exitosamente!`,
          text: `El usuario ${name} ha sido actualizado`,
          showConfirmButton: false,
          timer: 4000,
        });
      } catch (error) {
        console.error("Error creating transaction:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error instanceof Error
              ? error.message
              : "Ocurrió un error desconocido",
        });
      } finally {
        setSelectedUser(null); // Cierra el modal después de guardar los cambios
      }
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader outerWidth="100" outerHeight="100" innerScale={0.7} /> {/* Indicador de carga */}
      </div>
    );

  if (error) {
    return (
      <div
        className="flex items-center justify-center text-red-500"
        role="alert"
      >
        Error en la consulta: {error.message}
      </div>
    );
  }

  // Filtra los usuarios según el término de búsqueda
  const filteredUsers = data?.users.filter(
    (user) =>
      userSearch === "" ||
      user.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div>
      <BreadIncoUser />
      <Header />
      <div className="border dark:border-[#303030] border-slate-300 rounded-xl  py-8 px-4 max-w-full">
        <div className="flex justify-between">
          <div>
            <h2 className="relative ml-1 text-2xl text-slate-600 dark:text-[#e0e0e0] font-bold mb-4">
              Usuarios
            </h2>
          </div>

          <div className="mb-6 flex items-center justify-end gap-4">
            <div className="relative text-slate-600 dark:text-[#e0e0e0]">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <UserIcon />
              </span>
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Filtrar por usuario"
                className="ww-64 h-9 pl-12 placeholder:text-slate-600 dark:placeholder:text-[#e0e0e0]  bg-transparent text-slate-600 dark:text-[#e0e0e0] border border-slate-400  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block  p-2.5 py-3 px-4"
              />
            </div>

            <Button
              onClick={handleClick}
              className="px-4 py-2 text-white rounded-lg"
            >
              <RefreshIcon /> Actualizar{" "}
              {isClicked && (
                <Loader outerWidth="25" outerHeight="25" innerScale={0.7} /> 
              )}
            </Button>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className=" max-h-[50vh] mt-8 overflow-y-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hover:bg-[#cecece2c] dark:hover:bg-[#3030302c] border-b border-gray-500">
                <TableHead className="text-slate-600 dark:text-[#e0e0e0] text-lg">
                  Nombre
                </TableHead>
                <TableHead className="text-slate-600 dark:text-[#e0e0e0] text-lg">
                  Email
                </TableHead>
                <TableHead className="text-slate-600 dark:text-[#e0e0e0] text-lg">
                  Teléfono
                </TableHead>
                <TableHead className="text-slate-600 dark:text-[#e0e0e0] text-lg">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>

            {filteredUsers && filteredUsers.length ? (
              <TableBody>
                {filteredUsers.map((user: User) => (
                  <TableRow
                    className="text-slate-600 dark:text-[#e0e0e0] hover:bg-[#cecece2c] dark:hover:bg-[#3030302c] hover:text-slate-800 dark:hover:text-[#e0e0e0] border-b border-b-[#303030]"
                    key={user.id}
                  >
                    <TableCell className="border dark:border-[#303030]">
                      {user.name}
                    </TableCell>
                    <TableCell className="border dark:border-[#303030]">
                      {user.email}
                    </TableCell>
                    <TableCell className="border dark:border-[#303030]">
                      {user.phone}
                    </TableCell>
                    <TableCell className="border dark:border-[#303030]">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            className="border-none    dark:text-gray-400"
                            variant="outline"
                            onClick={() => handleEditClick(user)}
                          >
                            <EditUserIcon />
                            Editar usuario
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[500px] bg-slate-100 dark:bg-secondary p-0 border-l border-l-gray-400 rounded-none">
                          <div className=" flex  justify-center items-center h-screen ">
                            <div className="relative">
                              <div className="min-h-96  py-6 text-left ">
                                <h1 className="text-slate-600 dark:text-[#e0e0e0] text-2xl font-bold my-6 flex justify-center">
                                  Editar usuario
                                </h1>

                                <div className="mb-2">
                                  <Label
                                    htmlFor="name"
                                    className="w-80 bg-transparent block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0]"
                                  >
                                    Nombre
                                  </Label>
                                  <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="text-slate-600 dark:text-[#e0e0e0] col-span-3"
                                  />
                                </div>

                                <div className="mb-2">
                                  <Label
                                    htmlFor="role"
                                    className="w-80 bg-transparent block mb-2 text-sm font-medium text-slate-600 dark:text-[#e0e0e0]"
                                  >
                                    Rol
                                  </Label>
                                  <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="dark:bg-secondary bg-slate-100 text-slate-600 dark:text-[#e0e0e0] border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 "
                                  >
                                    <option
                                      value="User"
                                      className="dark:bg-secondary bg-slate-100 text-slate-600 dark:text-[#e0e0e0]"
                                    >
                                      User
                                    </option>
                                    <option
                                      value="Admin"
                                      className="dark:bg-secondary bg-slate-100 text-slate-600 dark:text-[#e0e0e0]"
                                    >
                                      Admin
                                    </option>
                                  </select>
                                </div>

                                <div className="flex justify-center">
                                  <Button
                                    onClick={handleCombinedClick}
                                    className="w-40 mx-auto focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                                    type="submit"
                                    disabled={loadings} // Desactiva el botón mientras carga
                                  >
                                    {loadings && (
                                      <Loader
                                        outerWidth="25"
                                        outerHeight="25"
                                        innerScale={0.7}
                                      />
                                    )}{" "}
                                    Guardar cambios
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <SheetFooter>
                            <SheetClose asChild></SheetClose> {/* Cierre del modal tipo sheet */}
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <div className="h-10 flex items-center justify-center text-gray-500">
                ¡Usuario no encontrado!
              </div>
            )}
            <TableFooter></TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;
