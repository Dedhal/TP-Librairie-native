import { Text, View, StyleSheet, Image, Button, Modal, TextInput } from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ListeLivre from './ListeLivre';

export default function Recherche({ navigation }) {
    const [visibilite, setVisibilite] = useState(false);
    const [livres, setLivres] = useState([]);
    const [recherche, setRecherche] = useState([]);

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
    }, [])

    const Recherche = (textInput) => {
        setRecherche(livres.filter(livre => livre.titre.includes(textInput)));
    }

    return (
        <View style={styles.main}>
            <View style={styles.card}>
                <View style={styles.inputContainer}>
                    <Button onPress={() => setVisibilite(!visibilite)} title='Catégories' />
                    <TextInput style={styles.textInput} placeholder=' Rechercher' onChangeText={textInput => Recherche(textInput)} />
                </View>
            </View>
            <ListeLivre liste={recherche} />
            
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'grey',
        padding: 20,
        paddingRight: -10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        width: '70%',
    },

    card: {
        backgroundColor: 'white',
        width: '95%',
        padding: 10,
        borderRadius: 10,
        marginRight: 15,
        marginBottom: 10,
    },
})