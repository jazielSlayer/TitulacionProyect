import React from 'react';
import { View, FlatList } from 'react-native';
import ProyectoItem from './ProyectoItem';

const ProyectoList = ({ proyectos, onDelete, onEdit }) => {
  const renderItem = ({ item }) => {
    return <ProyectoItem proyecto={item} onDelete={onDelete} onEdit={onEdit} />;
  };

  return (
    <View>
      <FlatList
        style={{ width: '100%' }}
        data={proyectos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ProyectoList;