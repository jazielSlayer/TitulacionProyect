import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DocumentoItem = ({ documento, onDelete, onEdit }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{documento.nombre}</Text>
      <Text style={styles.itemText}>Proyecto: {documento.proyecto_titulo || 'Sin proyecto'}</Text>
      <Text style={styles.itemText}>Tipo: {documento.tipo}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(documento)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(documento.id)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  itemTitle: { color: "#ffffff", fontWeight: 'bold' },
  itemText: { color: "#ffffff" },
  buttonContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  editButton: { backgroundColor: '#1e90ff', padding: 5, borderRadius: 5, marginLeft: 10 },
  deleteButton: { backgroundColor: '#ff4444', padding: 5, borderRadius: 5, marginLeft: 10 },
  buttonText: { color: '#ffffff', fontSize: 14 },
});

export default DocumentoItem;