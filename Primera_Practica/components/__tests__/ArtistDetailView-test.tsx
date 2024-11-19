import * as React from "react";
import { render, screen } from "@testing-library/react-native";
import ArtistDetailView from "../../app/ArtistDetailView";
import { useLocalSearchParams } from "expo-router";

// Mock para el hook `useLocalSearchParams`
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

describe("ArtistDetailView Component", () => {
  const mockParams = {
    id: "1",
    name: "Artist One",
    image: "image1.jpg",
  };

  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue(mockParams);
  });

  it("renders artist details", () => {
    render(<ArtistDetailView />);

    // Verificar que los detalles del artista se renderizan correctamente
    expect(screen.getByText(mockParams.name)).toBeTruthy();
    expect(screen.getByText(mockParams.id)).toBeTruthy();

    // Verificar la imagen
    const image = screen.getByTestId("artist-image");
    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe(mockParams.image);
  });

  it("handles missing artist details gracefully", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      id: undefined,
      name: undefined,
      image: undefined,
    });

    render(<ArtistDetailView />);

    // Verificar que no se renderizan datos faltantes
    expect(screen.queryByText(mockParams.name)).toBeNull();
    expect(screen.queryByText(mockParams.id)).toBeNull();
    expect(screen.queryByTestId("artist-image")).toBeNull(); // Imagen no debe estar presente
  });

  it("renders correctly when only some details are provided", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      id: "2",
      name: "Partial Artist",
      image: undefined,
    });

    render(<ArtistDetailView />);

    // Verificar que los detalles presentes se renderizan correctamente
    expect(screen.getByText("Partial Artist")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();

    // Verificar que la imagen no está presente
    expect(screen.queryByTestId("artist-image")).toBeNull();
  });
});
