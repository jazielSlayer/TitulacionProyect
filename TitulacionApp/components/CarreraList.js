import React from 'react';
import { View, FlatList } from 'react-native';
import CarreraItem from './CarreraItem';

const CarreraList = ({ carreras, onDelete, onEdit }) => {
  const renderItem = ({ item }) => {
    return <CarreraItem carrera={item} onDelete={onDelete} onEdit={onEdit} />;
  };

  console.log('Carreras recibidas en CarreraList:', carreras);
  return (
    <View>
      <FlatList
        style={{ width: '100%' }}
        data={carreras}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CarreraList;