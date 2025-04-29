import React from 'react';
import { View, FlatList } from 'react-native';
import EstudianteItem from './EstudianteItem';

const EstudianteList = ({ estudiantes, onDelete, onEdit }) => {
  const renderItem = ({ item }) => {
    return <EstudianteItem estudiante={item} onDelete={onDelete} onEdit={onEdit} />;
  };

  return (
    <View>
      <FlatList
        style={{ width: '100%' }}
        data={estudiantes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default EstudianteList;