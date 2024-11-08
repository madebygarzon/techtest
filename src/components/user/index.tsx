import React, { useState } from "react";
import Header from "@/components/header";
import { BreadIncoUser } from "@/components/breadcrumb";
import { useQuery, useMutation } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GET_USERS_LIST, UPDATE_USER } from "../../../graphql/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditUserIcon, RefreshIcon } from "@/components/ui/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import Swal from "sweetalert2";
import Loader from "@/components/ui/loader";
import { Label } from "@/components/ui/label";
import { UserIcon } from "@/components/ui/icons";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

const Users = () => {
  const { data, loading, refetch } = useQuery<{ users: User[] }>(GET_USERS_LIST);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [loadings, setloadings] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER);
  const [userSearch, setUserSearch] = useState("");
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

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = async () => {
    setIsClicked(true);
    await refetch();
    setIsClicked(false);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setRole(user.role);
    setName(user.name);
  };

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
        setSelectedUser(null);
      }
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader outerWidth="100" outerHeight="100" innerScale={0.7} />
      </div>
    );
  const filteredUsers = data?.users.filter(
    (user) =>
      userSearch === "" ||
      user.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div>
      <BreadIncoUser />
      <Header />
      <div className="border border-[#303030] rounded-xl  py-8 px-4 max-w-full">
        <div className="flex justify-between">
          <div>
            <h2 className="relative ml-1 text-2xl text-[#e0e0e0] font-bold mb-4">
              Usuarios
            </h2>
          </div>

          <div className="mb-6 flex items-center justify-end gap-4">
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <UserIcon />
              </span>
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Filtrar por Usuario"
                className="w-64 h-9 pl-12  bg-transparent text-[#e0e0e0] border border-slate-400  sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block  p-2.5 py-3 px-4"
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

        <div className=" max-h-[50vh] mt-8 overflow-y-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hover:bg-[#3030302c] border-b border-gray-500">
                <TableHead className="text-[#e0e0e0] text-lg">Nombre</TableHead>
                <TableHead className="text-[#e0e0e0] text-lg">Email</TableHead>
                <TableHead className="text-[#e0e0e0] text-lg">
                  Teléfono
                </TableHead>
                <TableHead className="text-[#e0e0e0] text-lg">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>

            {filteredUsers && filteredUsers.length ? (
              <TableBody>
                {filteredUsers.map((user: User) => (
                  <TableRow
                    className="text-gray-400 hover:bg-[#3030302c] hover:text-[#e0e0e0] border-b border-b-[#303030]"
                    key={user.id}
                  >
                    <TableCell className="border border-[#303030]">
                      {user.name}
                    </TableCell>
                    <TableCell className="border border-[#303030]">
                      {user.email}
                    </TableCell>
                    <TableCell className="border border-[#303030]">
                      {user.phone}
                    </TableCell>
                    <TableCell className="border border-[#303030]">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            className="border-none bg-primary hover:bg-primary hover:text-white text-gray-400"
                            variant="outline"
                            onClick={() => handleEditClick(user)}
                          >
                            <EditUserIcon />
                            Editar usuario
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[500px] bg-secondary p-0 border-l border-l-gray-400 rounded-none">
                          <div className=" flex  justify-center items-center h-screen dark:bg-gray-900">
                            <div className="relative">
                              <div className="min-h-96  py-6 text-left rounded-xl shadow-lg">
                                <h1 className="text-[#e0e0e0] text-2xl font-bold my-6 flex justify-center">
                                  Editar usuario
                                </h1>

                                <div className="mb-2">
                                  <Label
                                    htmlFor="name"
                                    className="w-80 bg-transparent block mb-2 text-sm font-medium text-[#e0e0e0]"
                                  >
                                    Nombre
                                  </Label>
                                  <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="col-span-3"
                                  />
                                </div>

                                <div className="mb-2">
                                  <Label
                                    htmlFor="role"
                                    className="w-80 bg-transparent block mb-2 text-sm font-medium text-[#e0e0e0]"
                                  >
                                    Rol
                                  </Label>
                                  <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="bg-transparent text-gray-400 border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                                  >
                                    <option
                                      style={{ backgroundColor: "#000000" }}
                                      value="User"
                                    >
                                      User
                                    </option>
                                    <option
                                      style={{ backgroundColor: "#000000" }}
                                      value="Admin"
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
                                    disabled={loadings} // Opcional: desactiva el botón mientras carga
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
                            <SheetClose asChild></SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <p>No users found.</p>
            )}
            <TableFooter></TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;
