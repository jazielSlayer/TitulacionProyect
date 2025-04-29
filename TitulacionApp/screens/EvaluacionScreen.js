import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getEvaluaciones, createEvaluacion, updateEvaluacion, deleteEvaluacion, getProyectos, getProfesores } from '../api';
import Layout from '../components/layout';
import EvaluacionList from '../components/EvaluacionList';

const EvaluacionScreen = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState({
    proyecto: '',
    evaluador: '',
    calificacion: '',
    comentarios: '',
    fecha_evaluacion: '',
  });
  const [editingEvaluacionId, setEditingEvaluacionId] = useState(null);

  const loadEvaluaciones = async () => {
    try {
      const data = await getEvaluaciones();
      setEvaluaciones(data);
    } catch (error) {
      console.error('Error en loadEvaluaciones:', error);
    }
  };

  const loadProyectos = async () => {
    try {
      const data = await getProyectos();
      setProyectos(data);
    } catch (error) {
      console.error('Error en loadProyectos:', error);
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
    Alert.alert("Confirmar", "¿Seguro de eliminar esta evaluación?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: async () => {
          try {
            await deleteEvaluacion(id);
            setEvaluaciones(evaluaciones.filter(eva => eva.id !== id));
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar la evaluación");
          }
        },
      },
    ]);
  };

  const handleEdit = (evaluacion) => {
    setForm({
      proyecto: evaluacion.proyecto ? evaluacion.proyecto.toString() : '',
      evaluador: evaluacion.evaluador ? evaluacion.evaluador.toString() : '',
      calificacion: evaluacion.calificacion.toString(),
      comentarios: evaluacion.comentarios,
      fecha_evaluacion: evaluacion.fecha_evaluacion,
    });
    setEditingEvaluacionId(evaluacion.id);
    setIsFormVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const evaluacionData = {
        ...form,
        proyecto: form.proyecto ? parseInt(form.proyecto) : null,
        evaluador: form.evaluador ? parseInt(form.evaluador) : null,
        calificacion: parseFloat(form.calificacion),
      };
      if (editingEvaluacionId) {
        await updateEvaluacion(editingEvaluacionId, evaluacionData);
        setEvaluaciones(evaluaciones.map(eva =>
          eva.id === editingEvaluacionId ? { ...eva, ...evaluacionData } : eva
        ));
        Alert.alert("Éxito", "Evaluación actualizada correctamente");
      } else {
        const newEvaluacion = await createEvaluacion(evaluacionData);
        setEvaluaciones([...evaluaciones, newEvaluacion]);
        Alert.alert("Éxito", "Evaluación creada correctamente");
      }
      setForm({ proyecto: '', evaluador: '', calificacion: '', comentarios: '', fecha_evaluacion: '' });
      setIsFormVisible(false);
      setEditingEvaluacionId(null);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la evaluacion");
    }
  };

  useEffect(() => {
    loadEvaluaciones();
    loadProyectos();
    loadProfesores();
  }, []);

  if (isFormVisible) {
    return (
      <Layout>
        <Text style={styles.title}>{editingEvaluacionId ? "Editar Evaluación" : "Nueva Evaluación"}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.proyecto}
            style={styles.picker}
            onValueChange={(itemValue) => setForm({ ...form, proyecto: itemValue })}
          >
            <Picker.Item label="Seleccione proyecto" value="" />
            {proyectos.map(proj => (
              <Picker.Item key={proj.id} label={proj.titulo} value={proj.id.toString()} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.evaluador}
            style={styles.picker}
            onValueChange={(itemValue) => setForm({ ...form, evaluador: itemValue })}
          >
            <Picker.Item label="Seleccione evaluador" value="" />
            {profesores.map(prof => (
              <Picker.Item key={prof.id} label={`${prof.nombre} ${prof.apellido}`} value={prof.id.toString()} />
            ))}
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Calificación"
          placeholderTextColor="#aaa"
          value={form.calificacion}
          onChangeText={(text) => setForm({ ...form, calificacion: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Comentarios"
          placeholderTextColor="#aaa"
          value={form.comentarios}
          onChangeText={(text) => setForm({ ...form, comentarios: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de evaluación (YYYY-MM-DD)"
          placeholderTextColor="#aaa"
          value={form.fecha_evaluacion}
          onChangeText={(text) => setForm({ ...form, fecha_evaluacion: text })}
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
        <Text style={styles.title}>Evaluaciones</Text>
        <TouchableOpacity style={styles.newButton} onPress={() => setIsFormVisible(true)}>
          <Text style={styles.buttonText}>Nueva</Text>
        </TouchableOpacity>
      </View>
      <EvaluacionList evaluaciones={evaluaciones} onDelete={handleDelete} onEdit={handleEdit} />
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

export default EvaluacionScreen;