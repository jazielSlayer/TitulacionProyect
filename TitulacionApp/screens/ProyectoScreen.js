import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getProyectos, createProyecto, updateProyecto, deleteProyecto, getEstudiantes, getProfesores } from '../api';
import Layout from '../components/layout';
import ProyectoList from '../components/ProyectoList';

const ProyectoScreen = () => {
  const [proyectos, setProyectos] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState  = useState(false);
  const [form, setForm] = useState({
    titulo: '',
    estudiante: '',
    tutor: '',
    fecha_presentacion: '',
    estado: 'pendiente',
  });
  const [editingProyectoId, setEditingProyectoId] = useState(null);

  const loadProyectos = async () => {
    try {
      const data = await getProyectos();
      setProyectos(data);
    } catch (error) {
      console.error('Error en loadProyectos:', error);
    }
  };

  const loadEstudiantes = async () => {
    try {
      const data = await getEstudiantes();
      setEstudiantes(data);
    } catch (error) {
      console.error('Error en loadEstudiantes:', error);
    }
  };

  const loadProfesores = async () => {
    try {
      const data = await getProfesores();
      setProfesores(data);
    } catch (error) {
      console.error('Error en loadProfesores:', error);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert("Confirmar", "¿Seguro de eliminar este proyecto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: async () => {
          try {
            await deleteProyecto(id);
            setProyectos(proyectos.filter(proj => proj.id !== id));
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el proyecto");
          }
        },
      },
    ]);
  };

  const handleEdit = (proyecto) => {
    setForm({
      titulo: proyecto.titulo,
      estudiante: proyecto.estudiante ? proyecto.estudiante.toString() : '',
      tutor: proyecto.tutor ? proyecto.tutor.toString() : '',
      fecha_presentacion: proyecto.fecha_presentacion,
      estado: proyecto.estado,
    });
    setEditingProyectoId(proyecto.id);
    setIsFormVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const proyectoData = {
        ...form,
        estudiante: form.estudiante ? parseInt(form.estudiante) : null,
        tutor: form.tutor ? parseInt(form.tutor) : null,
      };
      if (editingProyectoId) {
        await updateProyecto(editingProyectoId, proyectoData);
        setProyectos(proyectos.map(proj =>
          proj.id === editingProyectoId ? { ...proj, ...proyectoData } : proj
        ));
        Alert.alert("Éxito", "Proyecto actualizado correctamente");
      } else {
        const newProyecto = await createProyecto(proyectoData);
        setProyectos([...proyectos, newProyecto]);
        Alert.alert("Éxito", "Proyecto creado correctamente");
      }
      setForm({ titulo: '', estudiante: '', tutor: '', fecha_presentacion: '', estado: 'pendiente' });
      setIsFormVisible(false);
      setEditingProyectoId(null);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el proyecto");
    }
  };

  useEffect(() => {
    loadProyectos();
    loadEstudiantes();
    loadProfesores();
  }, []);

  if (isFormVisible) {
    return (
      <Layout>
        <Text style={styles.title}>{editingProyectoId ? "Editar Proyecto" : "Nuevo Proyecto"}</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#aaa"
          value={form.titulo}
          onChangeText={(text) => setForm({ ...form, titulo: text })}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.estudiante}
            style={styles.picker}
            onValueChange={(itemValue) => setForm({ ...form, estudiante: itemValue })}
          >
            <Picker.Item label="Seleccione estudiante" value="" />
            {estudiantes.map(est => (
              <Picker.Item key={est.id} label={`${est.nombre} ${est.apellido}`} value={est.id.toString()} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.tutor}
            style={styles.picker}
            onValueChange={(itemValue) => setForm({ ...form, tutor: itemValue })}
          >
            <Picker.Item label="Seleccione tutor" value="" />
            {profesores.map(prof => (
              <Picker.Item key={prof.id} label={`${prof.nombre} ${prof.apellido}`} value={prof.id.toString()} />
            ))}
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Fecha de presentación (YYYY-MM-DD)"
          placeholderTextColor="#aaa"
          value={form.fecha_presentacion}
          onChangeText={(text) => setForm({ ...form, fecha_presentacion: text })}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.estado}
            style={styles.picker}
            onValueChange={(itemValue) => setForm({ ...form, estado: itemValue })}
          >
            <Picker.Item label="Pendiente" value="pendiente" />
            <Picker.Item label="Aprobado" value="aprobado" />
            <Picker.Item label="Rechazado" value="rechazado" />
          </Picker>
        </View>
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
        <Text style={styles.title}>Proyectos de Titulación</Text>
        <TouchableOpacity style={styles.newButton} onPress={() => setIsFormVisible(true)}>
          <Text style={styles.buttonText}>Nuevo</Text>
        </TouchableOpacity>
      </View>
      <ProyectoList proyectos={proyectos} onDelete={handleDelete} onEdit={handleEdit} />
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

export default ProyectoScreen;