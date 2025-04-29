import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { getCarreras, createCarrera, updateCarrera, deleteCarrera } from '../api';
import Layout from '../components/layout';
import CarreraList from '../components/CarreraList';

const CarreraScreen = () => {
  const [carreras, setCarreras] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [editingCarreraId, setEditingCarreraId] = useState(null);

  const loadCarreras = async () => {
    try {
      const data = await getCarreras();
      setCarreras(data);
    } catch (error) {
      console.error('Error en loadCarreras:', error);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert("Confirmar", "¿Seguro de eliminar esta carrera?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: async () => {
          try {
            await deleteCarrera(id);
            setCarreras(carreras.filter(carrera => carrera.id !== id));
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar la carrera");
          }
        },
      },
    ]);
  };

  const handleEdit = (carrera) => {
    setForm({ nombre: carrera.nombre, descripcion: carrera.descripcion || '' });
    setEditingCarreraId(carrera.id);
    setIsFormVisible(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingCarreraId) {
        await updateCarrera(editingCarreraId, form);
        setCarreras(carreras.map(carrera =>
          carrera.id === editingCarreraId ? { ...carrera, ...form } : carrera
        ));
        Alert.alert("Éxito", "Carrera actualizada correctamente");
      } else {
        const newCarrera = await createCarrera(form);
        setCarreras([...carreras, newCarrera]);
        Alert.alert("Éxito", "Carrera creada correctamente");
      }
      setForm({ nombre: '', descripcion: '' });
      setIsFormVisible(false);
      setEditingCarreraId(null);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la carrera");
    }
  };

  useEffect(() => {
    loadCarreras();
  }, []);

  if (isFormVisible) {
    return (
      <Layout>
        <Text style={styles.title}>{editingCarreraId ? "Editar Carrera" : "Nueva Carrera"}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#aaa"
          value={form.nombre}
          onChangeText={(text) => setForm({ ...form, nombre: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          placeholderTextColor="#aaa"
          value={form.descripcion}
          onChangeText={(text) => setForm({ ...form, descripcion: text })}
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
        <Text style={styles.title}>Carreras</Text>
        <TouchableOpacity style={styles.newButton} onPress={() => setIsFormVisible(true)}>
          <Text style={styles.buttonText}>Nueva</Text>
        </TouchableOpacity>
      </View>
      <CarreraList carreras={carreras} onDelete={handleDelete} onEdit={handleEdit} />
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

export default CarreraScreen;