import * as React from 'react';
import {fireEvent , render, } from "@testing-library/react-native";
import ArtistList from '../../components/ArtistList';
import { useRouter } from "expo-router";

// Mock para el hook de navegación
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));


describe("ArtistList Component", () => {
    const mockArtists = [
        { id: "1", name: "Artist One", image: "image1.jpg" },
        { id: "2", name: "Artist Two", image: "image2.jpg" },
      ];
      
    const mockPush = jest.fn();
  
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
      });
    });
  
    it("renders a list of artists", () => {
      const { getByTestId } = render(<ArtistList artists={mockArtists} />);
      
      // Verificar que los elementos de la lista se renderizan
      expect(getByTestId("artist-box-Artist One")).toBeTruthy();
      expect(getByTestId("artist-box-Artist Two")).toBeTruthy();
    });
  
    it("navigates to the correct route on artist press", () => {
      const { getByTestId } = render(<ArtistList artists={mockArtists} />);
      
      // Simular un click en el primer artista
      fireEvent.press(getByTestId("artist-box-Artist One"));
  
      // Verificar que se llamó a la navegación con los parámetros correctos
      expect(mockPush).toHaveBeenCalledWith({
        pathname: "/ArtistDetailView",
        params: { id: "1", name: "Artist One", image: "image1.jpg" },
      });
    });
  
    it("uses the correct keyExtractor for FlatList", () => {
      const { queryByTestId } = render(<ArtistList artists={mockArtists} />);
      expect(queryByTestId("artist-box-undefined")).toBeNull();
    });
  });