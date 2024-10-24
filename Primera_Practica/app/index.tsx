import React, { useState } from "react";
import { View, Image, Text, TextInput, Alert, TouchableOpacity, StyleSheet, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";

// Styled Components
const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #f5fcff;
  padding: 20px;
`;

const ImageContainer = styled.View`
  background-color: white;
  justify-content: flex-start;
  align-items: center;
  width: 150px;
  height: 150px;
  margin-top: 20px;
  border-radius: 75px;
  overflow: hidden;
`;

const TextContainer = styled.Text`
  font-size: 24px;
  color: #333333;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 30px;
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

const ErrorText = styled.Text`
  color: #ff3b30;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5px;
`;

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  // Navegar a la pantalla de registro
  const onPressLearnMore = () => {
    router.push({
      pathname: "./register",
    });
  };

  // Función para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    return {
      isValid: hasUpperCase && hasSpecialChar && hasMinLength,
      errors: {
        uppercase: !hasUpperCase,
        specialChar: !hasSpecialChar,
        minLength: !hasMinLength
      }
    };
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Validar email
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Por favor, ingresa un correo electrónico válido';
      isValid = false;
    }

    // Validar password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un símbolo especial';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Éxito',
        'Inicio de sesión exitoso',
        [
          {
            text: 'OK',
            onPress: () => {
              setEmail('');
              setPassword('');
              setErrors({ email: '', password: '' });
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Error de validación',
        'Por favor, verifica los datos ingresados',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <MainContainer>
            <ImageContainer>
              <Image
                source={require("./src/logo-udc.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </ImageContainer>

            <TextContainer>Iniciar Sesión</TextContainer>

            <InputContainer>
              <StyledTextInput
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={(text) => {
                  setEmail(text.toLowerCase());
                  if (errors.email) {
                    setErrors(prev => ({ ...prev, email: '' }));
                  }
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
              />
              {errors.email ? <ErrorText>{errors.email}</ErrorText> : null}
            </InputContainer>

            <InputContainer>
              <StyledTextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) {
                    setErrors(prev => ({ ...prev, password: '' }));
                  }
                }}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.password ? <ErrorText>{errors.password}</ErrorText> : null}
            </InputContainer>

            <ButtonContainer 
              onPress={handleSubmit}
              activeOpacity={0.7}
            >
              <ButtonText>Iniciar Sesión</ButtonText>
            </ButtonContainer>

            {/* Nuevo botón de registro con el mismo estilo */}
            <ButtonContainer 
              onPress={onPressLearnMore}
              activeOpacity={0.7}
            >
              <ButtonText>Registrarse</ButtonText>
            </ButtonContainer>
            
          </MainContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
