import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ProductList from '../components/ProductList';

const HomeScreen = () => {
  // Función que se ejecutará cada vez que la pantalla obtenga el foco
  useFocusEffect(
    React.useCallback(() => {
      // Aquí puedes colocar la lógica para actualizar la lista
      console.log('La pantalla HomeScreen ha obtenido el foco, se debe actualizar la lista');
    }, [])
  );

  return (
    <ProductList/>
  );
}

export default HomeScreen;
