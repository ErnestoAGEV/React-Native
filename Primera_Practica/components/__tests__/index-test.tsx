import * as React from 'react';
import {fireEvent , render, screen} from "@testing-library/react-native";
import Index from '../../app/index';
import { Alert } from 'react-native';

//Modulo de alert 

jest.mock('react-native/Libraries/Alert/Alert', () =>({
    alert: jest.fn(),
}));

describe('Index', () => {

});

describe ('Index', ()=> {
    it('renders correctly' , () =>{
        render(<Index />);
        expect (screen.getByPlaceholderText('Correo Electrónico')).toBeTruthy();
        expect (screen.getByPlaceholderText('Contraseña')).toBeTruthy();
        expect (screen.getByText('Iniciar Sesión')).toBeTruthy();
        expect (screen.getByText('Registrarse')).toBeTruthy();
        expect (screen.getByTestId('icon-image')).toBeTruthy();
    })
})

it('validates email' , ()=> {
    render(<Index/>);
    const emailImput = screen.getByPlaceholderText('Correo Electrónico');
    const button = screen.getByText('Iniciar Sesión');
    fireEvent.changeText(emailImput, 'xxx')
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
        'El correo electrónico es requerido',
        'Por favor, ingresa un correo electrónico válido'
    );
})

it('validates password', () => {
    render(<Index/>);
    const emailImput = screen.getByPlaceholderText('Correo Electrónico');
    const passwordImput = screen.getByPlaceholderText('Contraseña');
    const button = screen.getByText('Iniciar Sesión');
    fireEvent.changeText(emailImput, 'user@test.com')
    fireEvent.changeText(passwordImput, 'password')
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
        'Error', 
        'La contraseña no cumple con los requisitos'
    );
})

it ('submits the form ', () => {
    render(<Index/>);
    const emailImput = screen.getByPlaceholderText('Correo Electrónico');
    const passwordImput = screen.getByPlaceholderText('Contraseña');
    const button = screen.getByText('Iniciar Sesión');
    fireEvent.changeText(emailImput, 'user@test.com')
    fireEvent.changeText(passwordImput, 'Password1!')
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith('Éxito', 'Inicio de sesión exitoso');
})