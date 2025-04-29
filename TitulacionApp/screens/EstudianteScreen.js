import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getEstudiantes, createEstudiante, updateEstudiante, deleteEstudiante, getCarreras } from '../api';
import Layout from '../components/layout';
import EstudianteList from '../components/EstudianteList';

const EstudianteScreen = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    carrera: '',
    matricula: '',
  });
  const [editingEstudianteId, setEditingEstudianteId] = useState(null);

  const loadEstudiantes = async () => {
    try {
      const data = await getEstudiantes();
      setEstudiantes(data);
    } catch (error) {
      console.error('Error en loadEstudiantes:', error);
    }
  };

  const loadCarreras = async () => {
    try {
      const data = await getCarreras();
      setCarreras(data);
    } catch (error) {
      console.error('Error en loadCarreras:', error);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert("Confirmar", "¿Seguro de eliminar este estudiante?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: async () => {
          try {
            await deleteEstudiante(id);
            setEstudiantes(estudiantes.filter(est => est.id !== id));
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el estudiante");
          }
        },
      },
    ]);
  };

  const handleEdit = (estudiante) => {
    setForm({
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      email: estudiante.email,
      carrera: estudiante.carrera ? estudiante.carrera.toString() : '',
      matricula: estudiante.matricula,
    });
    setEditingEstudianteId(estudiante.id);
    setIsFormVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const estudianteData = {
        ...form,
        carrera: form.carrera ? parseInt(form.carrera) : null,
      };
      if (editingEstudianteId) {
        await updateEstudiante(editingEstudianteId, estudianteData);
        setEstudiantes(estudiantes.map(est =>
          est.id === editingEstudianteId ? { ...est, ...estudianteData } : est
        ));
        Alert.alert("Éxito", "Estudiante actualizado correctamente");
      } else {
        const newEstudiante = await createEstudiante(estudianteData);
        setEstudiantes([...estudiantes, newEstudiante]);
        Alert.alert("Éxito", "Estudiante creado correctamente");
      }
      setForm({ nombre: '', apellido: '', email: '', carrera: '', matricula: '' });
      setIsFormVisible(false);
      setEditingEstudianteId(null);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el estudiante");
    }
  };

  useEffect(() => {
    loadEstudiantes();
    loadCarreras();
  }, []);

  if (isFormVisible) {
    return (
      <Layout>
        <Text style={styles.title}>{editingEstudianteId ? "Editar Estudiante" : "Nuevo Estudiante"}</Text>
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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.carrera}
            style={styles.picker}
            onValueChange={(itemValue) => setForm({ ...form, carrera: itemValue })}
          >
            <Picker.Item label="Seleccione carrera" value="" />
            {carreras.map(carrera => (
              <Picker.Item key={carrera.id} label={carrera.nombre} value={carrera.id.toString()} />
            ))}
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Matrícula"
          placeholderTextColor="#aaa"
          value={form.matricula}
          onChangeText={(text) => setForm({ ...form, matricula: text })}
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
        <Text style={styles.title}>Estudiantes</Text>
        <TouchableOpacity style={styles.newButton} onPress={() => setIsFormVisible(true)}>
          <Text style={styles.buttonText}>Nuevo</Text>
        </TouchableOpacity>
      </View>
      <EstudianteList estudiantes={estudiantes} onDelete={handleDelete} onEdit={handleEdit} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 },
  title: { color: '#ffffff', fontSize: 20 },
  newButton: { backgroundColor: '#1e90ff', padding: 10, borderRadius: 5 },
  input: { backgroundColor: '#333', color: '#fff', padding: 10, marginVertical: 5, borderRadius: 5, width: '80%' },
  pickerContainer: { backgroundColor: '#333', borderRadius: 5, marginVertical: 5, width: '80%' },
  picker: { color: '#fff' },
  submitButton: { backgroundColor: '#1e90ff', padding: 15, borderRadius: 8, marginTop: 10, width: '80%', alignItems: 'center' },
  cancelButton: { backgroundColor: '#ff4444', padding: 15, borderRadius: 8, marginTop: 10, width: '80%', alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});

export default EstudianteScreen;