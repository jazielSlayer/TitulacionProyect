import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDocumentos, createDocumento, updateDocumento, deleteDocumento, getProyectos } from '../api';
import Layout from '../components/layout';
import DocumentoList from '../components/DocumentoList';

const DocumentoScreen = () => {
  const [documentos, setDocumentos] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState({
    proyecto: '',
    nombre: '',
    tipo: '',
  });
  const [editingDocumentoId, setEditingDocumentoId] = useState(null);

  const loadDocumentos = async () => {
    try {
      const data = await getDocumentos();
      setDocumentos(data);
    } catch (error) {
      console.error('Error en loadDocumentos:', error);
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

  const handleDelete = async (id) => {
    Alert.alert("Confirmar", "¿Seguro de eliminar este documento?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: async () => {
          try {
            await deleteDocumento(id);
            setDocumentos(documentos.filter(doc => doc.id !== id));
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el documento");
          }
        },
      },
    ]);
  };

  const handleEdit = (documento) => {
    setForm({
      proyecto: documento.proyecto ? documento.proyecto.toString() : '',
      nombre: documento.nombre,
      tipo: documento.tipo,
    });
    setEditingDocumentoId(documento.id);
    setIsFormVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const documentoData = {
        ...form,
        proyecto: form.proyecto ? parseInt(form.proyecto) : null,
      };
      if (editingDocumentoId) {
        await updateDocumento(editingDocumentoId, documentoData);
        setDocumentos(documentos.map(doc =>
          doc.id === editingDocumentoId ? { ...doc, ...documentoData } : doc
        ));
        Alert.alert("Éxito", "Documento actualizado correctamente");
      } else {
        const newDocumento = await createDocumento(documentoData);
        setDocumentos([...documentos, newDocumento]);
        Alert.alert("Éxito", "Documento creado correctamente");
      }
      setForm({ proyecto: '', nombre: '', tipo: '' });
      setIsFormVisible(false);
      setEditingDocumentoId(null);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el documento");
    }
  };

  useEffect(() => {
    loadDocumentos();
    loadProyectos();
  }, []);

  if (isFormVisible) {
    return (
      <Layout>
        <Text style={styles.title}>{editingDocumentoId ? "Editar Documento" : "Nuevo Documento"}</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#aaa"
          value={form.nombre}
          onChangeText={(text) => setForm({ ...form, nombre: text })}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.tipo}
            style={styles.picker}
            onValueChange={(itemValue) => setForm({ ...form, tipo: itemValue })}
          >
            <Picker.Item label="Seleccione tipo" value="" />
            <Picker.Item label="Propuesta" value="propuesta" />
            <Picker.Item label="Informe Final" value="informe_final" />
            <Picker.Item label="Otro" value="otro" />
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
        <Text style={styles.title}>Documentos</Text>
        <TouchableOpacity style={styles.newButton} onPress={() => setIsFormVisible(true)}>
          <Text style={styles.buttonText}>Nuevo</Text>
        </TouchableOpacity>
      </View>
      <DocumentoList documentos={documentos} onDelete={handleDelete} onEdit={handleEdit} />
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

export default DocumentoScreen;