import React from "react";
import { View, Text, Platform } from "react-native";
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

const StyledTextInput = styled.TextInput`
  height: 50px;
  width: 100%;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 8px;
  padding: 10px 15px;
  background-color: white;
  font-size: 16px;
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
  return (
    <MainContainer>
      <InputContainer>
        <StyledTextInput placeholder="Email" />
      </InputContainer>

      <InputContainer>
        <StyledTextInput placeholder="Nombre de Usuario" />
      </InputContainer>

      <InputContainer>
        <StyledTextInput placeholder="Contraseña"  />
      </InputContainer>

      <InputContainer>
        <StyledTextInput placeholder="Confirmar Contraseña"  />
      </InputContainer>

      <ButtonContainer activeOpacity={0.8}>
        <ButtonText>Registrarse</ButtonText>
      </ButtonContainer>
    </MainContainer>
  );
}
