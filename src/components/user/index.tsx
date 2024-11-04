import React, { useState } from "react";
import Header from "@/components/header";
import { BreadIncoUser } from "@/components/breadcrumb";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditUserIcon } from "@/components/ui/icons";
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
  mutation UpdateUser($id: ID!, $role: String!) {
    updateUser(id: $id, role: $role) {
      id
      role
    }
  }
`;

const Users = () => {
  const { data } = useQuery<{ users: User[] }>(GET_USERS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [role, setRole] = useState("");
  const [updateUser] = useMutation(UPDATE_USER);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setRole(user.role);
  };

  const handleSave = async () => {
    if (selectedUser) {
      try {
        await updateUser({ variables: { id: selectedUser.id, role } });
        Swal.fire({
          icon: "success",
          title: `¡Rol actualizado exitosamente!`,
          text: `El rol de ${selectedUser.name} ha sido actualizado a ${role}`,
          showConfirmButton: false,
          timer: 4000,
        });
      } catch (error) {
        console.error("Error creating transaction:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error instanceof Error ? error.message : "Ocurrió un error desconocido",
      });
      } finally {
        setSelectedUser(null);
      }
    }
  };

  return (
    <div>
      <BreadIncoUser />
      <Header />
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
      <div className="border border-gray-200 rounded-lg shadow-md py-8 px-4 max-w-full">
        <div className="max-h-[50vh] overflow-y-auto">
          <Table className="w-full">
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            {data && data.users ? (
              <TableBody>
                {data.users.map((user: User) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
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
                            <SheetDescription>Modifica el rol del usuario</SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="name" className="text-right">
                                Nombre
                              </label>
                              <Input
                                id="name"
                                value={selectedUser?.name || ""}
                                readOnly
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="role" className="text-right">
                                Rol
                              </label>
                              <Input
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <Button onClick={handleSave} className="block mx-auto" type="submit">
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
