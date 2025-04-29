import React from 'react';
import { View, FlatList } from 'react-native';
import ProfesorItem from './ProfesorItem';

const ProfesorList = ({ profesores, onDelete, onEdit }) => {
  const renderItem = ({ item }) => {
    return <ProfesorItem profesor={item} onDelete={onDelete} onEdit={onEdit} />;
  };

  return (
    <View>
      <FlatList
        style={{ width: '100%' }}
        data={profesores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ProfesorList;