import * as React from 'react';
import { fireEvent, render, screen } from "@testing-library/react-native";
import Register from '../../app/index';
import { Alert } from 'react-native';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('Register Component', () => {
    it('renders correctly', () => {
      render(<Register />);
      
      // Verificamos que los campos se rendericen correctamente
      expect(screen.getByPlaceholderText('Correo Electrónico')).toBeTruthy();
      expect(screen.getByPlaceholderText('Nombre de Usuario')).toBeTruthy();  // Placeholder actualizado
      expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
      expect(screen.getByPlaceholderText('Confirmar Contraseña')).toBeTruthy();
      expect(screen.getByText('Registrarse')).toBeTruthy();
    });
  });
  