import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Livres from './components/Livres';
import Recherche from './components/Recherche';
import Categories from './components/Categories';

import { LIVRES } from './data/data';
import { useEffect } from 'react';

export default function App() {
    const Stack = createNativeStackNavigator();

    const Tab = createBottomTabNavigator();

    useEffect(() => {
        const storeData = async () => {
            try {
                
                await AsyncStorage.setItem('livres', JSON.stringify(LIVRES));
            } catch (error) {
                console.log(error);
            }
        }
        
        const retrieveData = async () => {
            try {
                try {
                    const value = await AsyncStorage.getItem('livres');

                    if (value !== null && value !== []) {
                        console.log(value);
                    }
                    else {
                        storeData();
                    }
                } catch {
                    storeData();
                }
                
            } catch (error) {
                console.log(error)
            }
        };

        retrieveData();
    }, [])
    
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Livres' component={Livres} />
                <Tab.Screen name='Recherche' component={Recherche} />
                <Tab.Screen name='Catégories' component={Categories} />
            </Tab.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
