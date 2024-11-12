import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Users from "../index";
import { MockedProvider } from "@apollo/client/testing";
import { GET_USERS_LIST } from "../../../graphql/index";
import "@testing-library/jest-dom";
import { Tabs } from "@radix-ui/react-tabs";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Users Component", () => {
  const mocks = [
    {
      request: {
        query: GET_USERS_LIST,
      },
      result: {
        data: {
          users: [
            {
              id: "1",
              name: "John Doe",
              email: "john@example.com",
              phone: "123456789",
              role: "User",
            },
            {
              id: "2",
              name: "Jane Smith",
              email: "jane@example.com",
              phone: "987654321",
              role: "Admin",
            },
          ],
        },
      },
    },
  ];

  test("debería mostrar un mensaje de error si la consulta falla", async () => {
    const errorMocks = [
      {
        request: {
          query: GET_USERS_LIST,
        },
        error: new Error("Error en la consulta"),
      },
    ];
  
    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <Tabs defaultValue="account">
          <Users />
        </Tabs>
      </MockedProvider>
    );
  
    // Espera a que el mensaje de error se renderice en el DOM
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/Error en la consulta/i);
    });
  });
  

  test("debería mostrar una lista de usuarios después de cargar", async () => {
    const userMocks = [
      {
        request: {
          query: GET_USERS_LIST,
        },
        result: {
          data: {
            users: [
              { id: "1", name: "John Doe", email: "john@example.com", phone: "123456789", role: "User" },
              { id: "2", name: "Jane Doe", email: "jane@example.com", phone: "987654321", role: "Admin" },
            ],
          },
        },
      },
    ];
  
    render(
      <MockedProvider mocks={userMocks} addTypename={false}>
        <Tabs defaultValue="account">
          <Users />
        </Tabs>
      </MockedProvider>
    );
  
    // Verifica si el spinner de carga está presente en el DOM por su clase
    expect(screen.getByTestId("loader-spinner")).toBeInTheDocument();
  
    // Espera a que los datos sean cargados y verifica los usuarios en la tabla
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
  });
  

  test("debería mostrar un mensaje de error si la consulta falla", async () => {
    const errorMocks = [
      {
        request: {
          query: GET_USERS_LIST,
        },
        error: new Error("Error en la consulta"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <Tabs defaultValue="account">
          <Users />
        </Tabs>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error en la consulta/i)).toBeInTheDocument();
    });
  });

  test("debería filtrar los usuarios al escribir en el campo de búsqueda", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Tabs defaultValue="account">
          <Users />
        </Tabs>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    // Filtra por "Jane" en el campo de búsqueda
    fireEvent.change(screen.getByPlaceholderText("Filtrar por Usuario"), {
      target: { value: "Jane" },
    });

    // Verifica que solo Jane Smith esté visible
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
