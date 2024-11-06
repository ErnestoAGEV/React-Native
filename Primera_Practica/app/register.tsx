import React, { useState } from "react";
import { View, Text, Platform, Alert } from "react-native";
import styled from "styled-components/native";

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f5fcff;
`;

const InputContainer = styled.View`
  width: 100%;
  max-width: 300px;
  margin-bottom: 15px;
`;

interface StyledTextInputProps {
  error: boolean;
}

const StyledTextInput = styled.TextInput<StyledTextInputProps>`
  height: 50px;
  width: 100%;
  border-color: ${props => props.error ? '#ff0000' : '#ddd'};
  border-width: 1px;
  border-radius: 8px;
  padding: 10px 15px;
  background-color: white;
  font-size: 16px;
`;

const ErrorText = styled.Text`
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
  padding-left: 5px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 15px 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
  elevation: 3;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 3.84px;
    `,
    android: `
      elevation: 5;
    `
  })}
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  // Regex para validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Regex para validar contraseña (mínimo 8 caracteres, 1 mayúscula y 1 carácter especial)
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    };

    // Validación de email
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El email no es válido';
      isValid = false;
    }

    // Validación de username
    if (!formData.username) {
      newErrors.username = 'El nombre de usuario es requerido';
      isValid = false;
    }

    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 carácter especial';
      isValid = false;
    }

    // Validación de confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmación de contraseña es requerida';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert('Éxito', 'Formulario validado correctamente');
      // Aquí iría la lógica para enviar los datos al servidor
    }
  };

  return (
    <MainContainer>
      <InputContainer>
        <StyledTextInput
          placeholder="Correo Electrónico"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          error={!!errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <ErrorText>{errors.email}</ErrorText> : null}
      </InputContainer>

      <InputContainer>
      <StyledTextInput
        placeholder="Nombre de Usuario"  // Placeholder exacto
        value={formData.username}
        onChangeText={(text) => setFormData({...formData, username: text})}
        error={!!errors.username}
      />

        {errors.username ? <ErrorText>{errors.username}</ErrorText> : null}
      </InputContainer>

      <InputContainer>
        <StyledTextInput
          placeholder="Contraseña"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          error={!!errors.password}
          secureTextEntry={true}
        />
        {errors.password ? <ErrorText>{errors.password}</ErrorText> : null}
      </InputContainer>

      <InputContainer>
        <StyledTextInput
          placeholder="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          error={!!errors.confirmPassword}
          secureTextEntry={true}
        />
        {errors.confirmPassword ? <ErrorText>{errors.confirmPassword}</ErrorText> : null}
      </InputContainer>

      <ButtonContainer activeOpacity={0.8} onPress={handleSubmit}>
        <ButtonText>Registrarse</ButtonText>
      </ButtonContainer>
    </MainContainer>
  );
}
