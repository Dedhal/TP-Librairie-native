import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { CATEGORIES } from '../data/data'

import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Ajout({ navigation }) {

    const [selected, setSelected] = useState(CATEGORIES[0].id)
    const [titre, setTitre] = useState('')
    const [description, setDescription] = useState('')
    const [nbTomes, setNbTomes] = useState('')
    const [image, setImage] = useState('')

    const Ajouter = async () => {
        if (titre === '' || description === '' || nbTomes === '') {
            return null
        }
        try {
            const value = await AsyncStorage.getItem('livres');

            let newArray = JSON.parse(value);
            newArray.push({
                id: newArray.length + 1,
                titre: titre,
                description: description,
                nbTomes: nbTomes,
                image: image,
                categorieId: selected,
            })

            try {
                await AsyncStorage.setItem('livres', JSON.stringify(newArray));
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error)
        }

        navigation.navigate('Livres')
    }
    
    return (
        <View style={styles.main}>
            <Text style={styles.header}>Ajouter un livre</Text>
            <Text style={{ marginBottom: 10 }}>Titre</Text>
            <TextInput value={titre} style={styles.input} onChangeText={(text) => setTitre(text) } />
            <Text style={{ marginBottom: 10 }}>Description</Text>
            <TextInput style={styles.input} onChangeText={(text) => setDescription(text)} />
            <Text style={{ marginBottom: 10 }}>Nombre de tomes</Text>
            <TextInput style={styles.input} onChangeText={(text) => setNbTomes(text)} />
            <Text style={{ marginBottom: 10 }}>Image</Text>
            <TextInput style={styles.input} onChangeText={(text) => setImage(text)} />
            <Text style={{ marginBottom: 10 }}>Catégorie</Text>
            <Picker style={styles.input} selectedValue={selected} onValueChange={(itemValue) => setSelected(itemValue)}>
                {
                    CATEGORIES.map((categorie, index) => {
                        return (
                            <Picker.Item key={index} label={categorie.genre} value={categorie.id} />
                        )
                    })
                }
            </Picker>
            <Button title="Ajouter" onPress={() => Ajouter()} />
        </View>
    )
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

    header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    input: {
        backgroundColor: 'white',
        width: '95%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
});