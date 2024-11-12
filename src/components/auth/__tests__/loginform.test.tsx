import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../loginform";
import "@testing-library/jest-dom";
import { Tabs } from "@radix-ui/react-tabs";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react"; // Importa signIn para mockearlo

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: { href: "" },
  });
});

describe("LoginForm Component", () => {
  test("debería mostrar un mensaje de error si el inicio de sesión falla", async () => {
    // Mock de signIn para simular un error de autenticación
    (signIn as jest.Mock).mockResolvedValueOnce({ error: "Invalid credentials" });

    render(
      <Tabs defaultValue="account">
        <LoginForm />
      </Tabs>
    );

    // Completa los campos de email y contraseña
    fireEvent.change(screen.getByPlaceholderText("name@email.com"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••••"), {
      target: { value: "incorrectPassword" },
    });

    // Envía el formulario
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    // Espera a que Swal.fire sea llamado con el mensaje de error
    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Error de autenticación",
        text: "Correo o contraseña incorrectos",
        timer: 4000,
      })
    );
  });

  test("debería mostrar un mensaje de éxito si el inicio de sesión es exitoso", async () => {
    // Mock de signIn para simular un inicio de sesión exitoso
    (signIn as jest.Mock).mockResolvedValueOnce({ error: null });

    render(
      <Tabs defaultValue="account">
        <LoginForm />
      </Tabs>
    );

    // Completa los campos de email y contraseña
    fireEvent.change(screen.getByPlaceholderText("name@email.com"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••••"), {
      target: { value: "correctPassword" },
    });

    // Envía el formulario
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    // Espera a que Swal.fire sea llamado con el mensaje de éxito
    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "Bienvenido",
        text: "¡Has ingresado correctamente!",
        timer: 4000,
      })
    );
  });
});
