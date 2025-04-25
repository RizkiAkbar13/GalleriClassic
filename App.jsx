import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import ProfileScreen from './src/screens/ProfileScreen';
import MusicCategoryScreen from './src/screens/MusicCategoryScreen';
import MusicDetailScreen from './src/screens/MusicDetailScreen'; 
import { FavoriteProvider } from './src/context/FavoriteContext'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Main" 
            component={BottomTabNavigator} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="MusicCategory" 
            component={MusicCategoryScreen} 
            options={{ title: 'Alat Musik Daerah' }} 
          />
          <Stack.Screen 
            name="MusicDetail" 
            component={MusicDetailScreen} 
            options={({ route }) => ({
              title: route.params?.title || 'Detail Musik',
            })}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: 'Profil Pengguna' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>
  );
}
