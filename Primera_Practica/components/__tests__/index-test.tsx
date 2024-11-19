import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import Index from "../../app/index";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

// Mock del módulo Alert
jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

// Mock de expo-router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(), // Mock del método push
    isReady: true,   // Mock de la propiedad isReady
  })),
}));

describe("Index Component", () => {
  it("renders correctly", () => {
    render(<Index />);
    expect(screen.getByPlaceholderText("Correo Electrónico")).toBeTruthy();
    expect(screen.getByPlaceholderText("Contraseña")).toBeTruthy();
    expect(screen.getByText("Iniciar Sesión")).toBeTruthy();
    expect(screen.getByText("Registrarse")).toBeTruthy();
    expect(screen.getByTestId("icon-image")).toBeTruthy();
  });

  it("validates email", () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText("Correo Electrónico");
    const button = screen.getByText("Iniciar Sesión");

    fireEvent.changeText(emailInput, "xxx");
    fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalledWith(
      "El correo electrónico es requerido",
      "Por favor, ingresa un correo electrónico válido"
    );
  });

  it("validates password", () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText("Correo Electrónico");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const button = screen.getByText("Iniciar Sesión");

    fireEvent.changeText(emailInput, "user@test.com");
    fireEvent.changeText(passwordInput, "password");
    fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "La contraseña no cumple con los requisitos"
    );
  });

  it("submits the form", () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText("Correo Electrónico");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const button = screen.getByText("Iniciar Sesión");

    fireEvent.changeText(emailInput, "user@test.com");
    fireEvent.changeText(passwordInput, "Password1!");
    fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalledWith("El correo electrónico es requerido", "Por favor, ingresa un correo electrónico válido");
  });
});
