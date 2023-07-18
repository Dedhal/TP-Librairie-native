import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ListeLivre from './ListeLivre';


//import { LIVRES } from '../data/data';

export default function Livres({ navigation }) {
    [Livres, setLivres] = useState([]);

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('livres');
            if (value !== null) {
                setLivres(JSON.parse(value))
                console.log(value);
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        retrieveData();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            retrieveData();
        }, [])
    )

    const Item = ({ title, description, tomes, imageUrl }) => (
        <View style={styles.card}>
            <View style={styles.cardTitleView}>
                <Text style={styles.title}>{title} </Text>
                <Text>Tome {tomes} </Text>
                <Image src={imageUrl} style={{ width: 200, height: 300 }} resizeMode="contain" />
            </View>

            <Text>{description}</Text>
            
        </View>
    );

    const renderLivre = ({ item }) => (
        <Item title={item.titre} description={item.description} tomes={item.tomes} imageUrl={item.imageUrl} />
    );
    
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <ListeLivre liste={Livres} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    main: {
        backgroundColor: 'grey',
        padding: 20,
        paddingRight: -10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    card: {
        backgroundColor: 'white',
        width: '95%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },

    cardTitleView: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

});