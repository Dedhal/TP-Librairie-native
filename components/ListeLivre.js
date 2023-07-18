import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

export default function ListeLivre(props) {
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
        <FlatList data={props.liste} renderItem={renderLivre} keyExtractor={(item) => item.id} contentContainerStyle={{ paddingBottom: 100 }} />
        )
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