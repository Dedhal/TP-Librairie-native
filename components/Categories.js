import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { CATEGORIES } from '../data/data'

import AsyncStorage from '@react-native-async-storage/async-storage';

import ListeLivre from './ListeLivre'

export default function Categories({ navigation }) {
    const [livres, setLivres] = useState([])
    const [recherche, setRecherche] = useState([])

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('livres', JSON.stringify(livres));
        } catch (error) {
            console.log(error);
        }
    }

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('livres');

            setLivres(JSON.parse(value));
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        retrieveData();
        setRecherche(livres);

        console.log(CATEGORIES[0].id)
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            retrieveData();
            setRecherche(livres);
        }, [])
    )

    const Recherche = (catId) => {
        setRecherche(livres.filter(livre => livre.categorieId.includes(catId)))
    }
    
    return (
        <View style={styles.main}>
            {
                CATEGORIES.map((e) => (
                    <View key={e.id} style={styles.categorie}>
                        <Button title={e.genre} color={e.couleur} onPress={() => Recherche(e.id) } />
                        {console.log(e)}
                    </View>
                ))}

            <ListeLivre liste={recherche} />
        </View>
    );
                

} 

const styles = StyleSheet.create({
    main: {
        padding: 10,
        backgroundColor: 'white',
        marginEnd: 10,
        marginBottom: 10,
        width: '95%',
        borderRadius: 10,
    },
    categorie: {
        marginBottom: 10,
        }
})