import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { getProfesores, createProfesor, updateProfesor, deleteProfesor } from '../api';
import Layout from '../components/layout';
import ProfesorList from '../components/ProfesorList';

const ProfesorScreen = () => {
  const [profesores, setProfesores] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    especialidad: '',
  });
  const [editingProfesorId, setEditingProfesorId] = useState(null);

  const loadProfesores = async () => {
    try {
      const data = await getProfesores();
      setProfesores(data);
    } catch (error) {
      console.error('Error en loadProfesores:', error);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert("Confirmar", "¿Seguro de eliminar este profesor?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: async () => {
          try {
            await deleteProfesor(id);
            setProfesores(profesores.filter(prof => prof.id !== id));
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el profesor");
          }
        },
      },
    ]);
  };

  const handleEdit = (profesor) => {
    setForm({
      nombre: profesor.nombre,
      apellido: profesor.apellido,
      email: profesor.email,
      especialidad: profesor.especialidad,
    });
    setEditingProfesorId(profesor.id);
    setIsFormVisible(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingProfesorId) {
        await updateProfesor(editingProfesorId, form);
        setProfesores(profesores.map(prof =>
          prof.id === editingProfesorId ? { ...prof, ...form } : prof
        ));
        Alert.alert("Éxito", "Profesor actualizado correctamente");
      } else {
        const newProfesor = await createProfesor(form);
        setProfesores([...profesores, newProfesor]);
        Alert.alert("Éxito", "Profesor creado correctamente");
      }
      setForm({ nombre: '', apellido: '', email: '', especialidad: '' });
      setIsFormVisible(false);
      setEditingProfesorId(null);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el profesor");
    }
  };

  useEffect(() => {
    loadProfesores();
  }, []);

  if (isFormVisible) {
    return (
      <Layout>
        <Text style={styles.title}>{editingProfesorId ? "Editar Profesor" : "Nuevo Profesor"}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#aaa"
          value={form.nombre}
          onChangeText={(text) => setForm({ ...form, nombre: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#aaa"
          value={form.apellido}
          onChangeText={(text) => setForm({ ...form, apellido: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Especialidad"
          placeholderTextColor="#aaa"
          value={form.especialidad}
          onChangeText={(text) => setForm({ ...form, especialidad: text })}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsFormVisible(false)}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.title}>Profesores</Text>
        <TouchableOpacity style={styles.newButton} onPress={() => setIsFormVisible(true)}>
          <Text style={styles.buttonText}>Nuevo</Text>
        </TouchableOpacity>
      </View>
      <ProfesorList profesores={profesores} onDelete={handleDelete} onEdit={handleEdit} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 },
  title: { color: '#ffffff', fontSize: 20 },
  newButton: { backgroundColor: '#1e90ff', padding: 10, borderRadius: 5 },
  input: { backgroundColor: '#333', color: '#fff', padding: 10, marginVertical: 5, borderRadius: 5, width: '80%' },
  submitButton: { backgroundColor: '#1e90ff', padding: 15, borderRadius: 8, marginTop: 10, width: '80%', alignItems: 'center' },
  cancelButton: { backgroundColor: '#ff4444', padding: 15, borderRadius: 8, marginTop: 10, width: '80%', alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});

export default ProfesorScreen;