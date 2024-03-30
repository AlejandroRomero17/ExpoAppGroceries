import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Switch } from 'react-native';
import { insertProduct } from '../api';

const ProductFormScreen = ({ navigation }) => {
  const [product, setProduct] = useState({
    barcode: '',
    description: '',
    brand: '',
    cost: 0,
    price: 0,
    expiredDate: '',
    status: false, // Inicializado como false
    stock: 0
  });

  const handleChange = (name, value) => setProduct({ ...product, [name]: value });

  const handleToggle = () => setProduct({ ...product, status: !product.status }); // Cambio directo entre true y false

  const handleEnviarFormulario = async () => {
    try {
      const res = await insertProduct(product);
      console.log(JSON.stringify(res)); // Verifica la respuesta de la inserción
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error("Error al enviar formulario:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Producto</Text>
      <TextInput
        placeholder="Código de barras"
        onChangeText={(text) => handleChange('barcode', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        onChangeText={(text) => handleChange('description', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Marca"
        onChangeText={(text) => handleChange('brand', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio de compra"
        keyboardType='numeric'
        onChangeText={(text) => handleChange('cost', parseInt(text))}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio de venta"
        keyboardType='numeric'
        onChangeText={(text) => handleChange('price', parseInt(text))}
        style={styles.input}
      />
      <TextInput
        placeholder="Fecha de caducidad"
        onChangeText={(text) => handleChange('expiredDate', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Existencias"
        keyboardType='numeric'
        onChangeText={(text) => handleChange('stock', parseInt(text))}
        style={styles.input}
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

export default ProductFormScreen;
