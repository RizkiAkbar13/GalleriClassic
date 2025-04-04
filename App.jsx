import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppHome from './AppHome';
import ProfileScreen from './src/screens/ProfileScreen';
import MusicCategoryScreen from './src/screens/MusicCategoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AppHome} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil Pengguna' }} />
        <Stack.Screen name="MusicCategory" component={MusicCategoryScreen} options={{ title: 'Alat Musik Daerah' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}