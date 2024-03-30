import { View, FlatList, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { deleteProduct, getProducts } from '../api';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductList = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const deleteProd = async (barcode) => {
    Alert.alert(
      'Eliminar Producto',
      '¿Está seguro de que desea eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            const res = await deleteProduct(barcode);
            await loadProducts();
            console.log(JSON.stringify(res));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const renderItem = ({ item }) => {
    return <ProductItem item={item} deleteProd={deleteProd} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.barcode}
        refreshControl={
          <RefreshControl refreshing={refreshing} colors={['#ffddd2']} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffddd2',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    marginTop: 1,
  },
});

export default ProductList;
