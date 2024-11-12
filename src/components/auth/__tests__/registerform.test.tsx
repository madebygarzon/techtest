import React from "react";
import { RegisterForm } from "../registerform";
import "@testing-library/jest-dom"; 
import { render, screen, fireEvent, waitFor  } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { CREATE_USER } from "../../../graphql/index";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom";
import { Tabs } from "@radix-ui/react-tabs"; 
import Swal from "sweetalert2"; 

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));


jest.mock("bcryptjs", () => ({
  ...jest.requireActual("bcryptjs"),
  hash: jest.fn(() => Promise.resolve("hashedPassword")), // Mockea el hash
}));

beforeAll(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: { href: "" },
  });
});

describe("RegisterForm Component", () => {
  const mocks = [
    {
      request: {
        query: CREATE_USER,
        variables: {
          name: "John Doe",
          email: "john@example.com",
          phone: "123456789",
          role: "User",
          password: "hashedPassword", 
        },
      },
      result: {
        data: {
          createUser: {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
          },
        },
      },
    },
  ];

  test("debería mostrar un mensaje de éxito al registrar un usuario", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Tabs defaultValue="password">
          <RegisterForm />
        </Tabs>
      </MockedProvider>
    );

    // Completa los campos del formulario
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Teléfono"), {
      target: { value: "123456789" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("••••••••••")[0], {
      target: { value: "Password123" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("••••••••••")[1], {
      target: { value: "Password123" },
    });

    // Envía el formulario
    fireEvent.click(screen.getByRole("button", { name: /registrarme/i }));

    // Usa waitFor para esperar que Swal.fire sea llamado
    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "¡Te has registrado exitosamente!",
        text: "John Doe, ya tienes acceso a la plataforma.",
        showConfirmButton: false,
        timer: 4000,
      })
    );
  });
});