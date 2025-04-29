import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { registerUser } from '../api';
import Layout from '../components/layout';

const RegisterScreen = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('estudiante');

  const handleRegister = async () => {
    try {
      const userData = { email, password, tipo_usuario: tipoUsuario };
      const response = await registerUser(userData);
      if (response.success) {
        Alert.alert('Éxito', 'Usuario registrado correctamente');
        onRegister();
      } else {
        Alert.alert('Error', response.message || 'No se pudo registrar el usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar. Verifica tu conexión.');
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Registrarse</Text>
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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoUsuario}
            style={styles.picker}
            onValueChange={(itemValue) => setTipoUsuario(itemValue)}
          >
            <Picker.Item label="Estudiante" value="estudiante" />
            <Picker.Item label="Profesor" value="profesor" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRegister}>
          <Text style={styles.backText}>Volver al inicio de sesión</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  title: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#333', color: '#fff', padding: 10, marginVertical: 10, borderRadius: 5, width: '80%' },
  pickerContainer: { backgroundColor: '#333', borderRadius: 5, marginVertical: 10, width: '80%' },
  picker: { color: '#fff' },
  registerButton: { backgroundColor: '#1e90ff', padding: 15, borderRadius: 8, marginTop: 20, width: '80%', alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  backText: { color: '#1e90ff', marginTop: 20, fontSize: 16 },
});

export default RegisterScreen;