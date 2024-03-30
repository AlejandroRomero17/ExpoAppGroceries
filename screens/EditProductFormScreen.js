import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Switch } from 'react-native';
import { updateProduct } from '../api';


const EditProductFormScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [product, setProduct] = useState({
    barcode: item.barcode,
    description: item.description,
    brand: item.brand,
    cost: item.cost.toString(),
    price: item.price.toString(),
    expiredDate: item.expiredDate,
    status: item.status === 1 ? true : false, // Convertir el estado de número a booleano
    stock: item.stock.toString(),
  });

  const handleChange = (name, value) => {
    if (name === 'status') {
      setProduct({ ...product, [name]: value });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleToggle = () => {
    handleChange('status', !product.status);
  };

  const handleEnviarFormulario = async () => {
    try {
        if (item) {
            const response = await updateProduct(item.barcode, product);
            console.log('Producto actualizado:', response);
        } else {
            const response = await insertProduct(product);
            console.log('Producto insertado:', response);
        }
        navigation.navigate('HomeScreen');
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        // Manejo de errores, como mostrar un mensaje al usuario
    }
};
 

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Producto</Text>
      <TextInput
        placeholder="Código de barras"
        onChangeText={(text) => handleChange('barcode', text)}
        style={styles.input}
        value={product.barcode}
      />
      <TextInput
        placeholder="Descripción"
        onChangeText={(text) => handleChange('description', text)}
        style={styles.input}
        value={product.description}
      />
      <TextInput
        placeholder="Marca"
        onChangeText={(text) => handleChange('brand', text)}
        style={styles.input}
        value={product.brand}
      />
      <TextInput
        placeholder="Precio de compra"
        keyboardType='numeric'
        onChangeText={(text) => handleChange('cost', text)}
        style={styles.input}
        value={product.cost}
      />
      <TextInput
        placeholder="Precio de venta"
        keyboardType='numeric'
        onChangeText={(text) => handleChange('price', text)}
        style={styles.input}
        value={product.price}
      />
      <TextInput
        placeholder="Fecha de caducidad"
        onChangeText={(text) => handleChange('expiredDate', text)}
        style={styles.input}
        value={product.expiredDate}
      />
      <TextInput
        placeholder="Existencias"
        keyboardType='numeric'
        onChangeText={(text) => handleChange('stock', text)}
        style={styles.input}
        value={product.stock}
      />
      <View style={styles.toggleContainer}>
        <Text>Estado:</Text>
        <Switch
          value={product.status}
          onValueChange={handleToggle}
        />
      </View>
      <Button
        title="Enviar"
        onPress={handleEnviarFormulario}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffddd2",
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#e29578',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    width: '40%'
  },
});

export default EditProductFormScreen;
