import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { loginUser } from '../api';
import Layout from '../components/layout';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);
      if (response.success) {
        onLogin(response.user);
      } else {
        Alert.alert('Error', response.message || 'Credenciales inválidas');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tu conexión.');
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onLogin(null, true)}>
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  title: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#333', color: '#fff', padding: 10, marginVertical: 10, borderRadius: 5, width: '80%' },
  loginButton: { backgroundColor: '#1e90ff', padding: 15, borderRadius: 8, marginTop: 20, width: '80%', alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  registerText: { color: '#1e90ff', marginTop: 20, fontSize: 16 },
});

export default LoginScreen;