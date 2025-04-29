import React from 'react';
import { View, FlatList } from 'react-native';
import DocumentoItem from './DocumentoItem';

const DocumentoList = ({ documentos, onDelete, onEdit }) => {
  const renderItem = ({ item }) => {
    return <DocumentoItem documento={item} onDelete={onDelete} onEdit={onEdit} />;
  };

  return (
    <View>
      <FlatList
        style={{ width: '100%' }}
        data={documentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default DocumentoList;