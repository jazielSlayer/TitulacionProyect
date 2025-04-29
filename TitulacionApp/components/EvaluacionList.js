import React from 'react';
import { View, FlatList } from 'react-native';
import EvaluacionItem from './EvaluacionItem';

const EvaluacionList = ({ evaluaciones, onDelete, onEdit }) => {
  const renderItem = ({ item }) => {
    return <EvaluacionItem evaluacion={item} onDelete={onDelete} onEdit={onEdit} />;
  };

  return (
    <View>
      <FlatList
        style={{ width: '100%' }}
        data={evaluaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default EvaluacionList;