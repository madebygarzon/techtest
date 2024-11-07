import React, { useState } from "react";
import Header from "@/components/header";
import { BreadIncoUser } from "@/components/breadcrumb";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditUserIcon, RefreshIcon } from "@/components/ui/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Swal from "sweetalert2";
import Loader from "@/components/ui/loader";
import { Label } from "@/components/ui/label";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      phone
      role
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $role: String!, $name: String!) {
    updateUser(id: $id, role: $role, name: $name) {
      id
      role
      name
    }
  }
`;

const Users = () => {
  const { data, loading, refetch } = useQuery<{ users: User[] }>(GET_USERS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [updateUser] = useMutation(UPDATE_USER);
  const handleCombinedClick = () => {
    handleSave();
    setTimeout(() => {
      handleClick();
    }, 2000);
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
            <div></div>

            <div className="relative text-gray-400"></div>
            <div></div>

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
            {data && data.users ? (
              <TableBody>
                {data.users.map((user: User) => (
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
                            variant="outline"
                            onClick={() => handleEditClick(user)}
                          >
                            <EditUserIcon />
                            Editar usuario
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Editar usuario</SheetTitle>
                            <SheetDescription>
                              Modifica los datos del usuario
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="name" className="text-right">
                                Nombre
                              </label>
                              <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                              />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="role" className="text-right">
                                Rol
                              </label>
                              <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="col-span-3"
                              >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                              </select>
                            </div>

                            {/* <div className="mb-2">
                              <Label className="block mb-2 text-sm font-medium text-[#e0e0e0]">
                                Concepto
                              </Label>
                              <select
                                className="bg-transparent text-gray-400 border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                                
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                
                              >
                                <option
                                  style={{ backgroundColor: "#000000" }}
                                  value="Ingreso"
                                >
                                  Admin
                                </option>
                                <option
                                  style={{ backgroundColor: "#000000" }}
                                  value="Egreso"
                                >
                                  User
                                </option>
                              </select>



                          </div> */}

                            {/* <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="role" className="text-right">
                                Rol
                              </label>
                              <Input
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="col-span-3"
                              />
                            </div>  */}
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <Button
                                onClick={handleCombinedClick}
                                className="block mx-auto"
                                type="submit"
                              >
                                Guardar cambios
                              </Button>
                            </SheetClose>
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
