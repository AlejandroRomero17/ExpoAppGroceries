import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import ProductFormScreen from './screens/ProductFormScreen';
import HomeScreen from './screens/HomeScreen';
import EditProductFormScreen from './screens/EditProductFormScreen'
import { TouchableOpacity,Text } from 'react-native';
const Stack = createNativeStackNavigator();
const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={({navigation})=>({
          title:'Abarrotes App',
          headerTitleStyle:{ fontWeight: 'bold'},
          headerRight:()=>(
            <TouchableOpacity onPress={() =>navigation.navigate("ProductFormScreen")}
            >
              <Text style={{fontWeight:'bold', fontSize:20}}>Nuevo</Text>
            </TouchableOpacity>
          ),
        })}
        />
         <Stack.Screen
          name="ProductFormScreen" 
          component={ProductFormScreen} 
          options={{
              title:'Agregar producto',
              headerTitleStyle:{ fontWeight: 'bold'},
           }}
          />
        <Stack.Screen name="EditProductFormScreen" component={EditProductFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App