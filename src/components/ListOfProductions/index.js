import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import ImgDefault from '../../../assets/img.png'

const ListOfProductions = ({ listSlide, navigation }) => {

    return (
        <View style={styles.containerProdiction}>

            {listSlide.map((list) => {
                let date = (list.release_date ? list.release_date : list.first_air_date)
                let newDate = []

                if (date) {
                    newDate = date.split('-')
                }
                
                return (
                    <TouchableOpacity key={list.id} style={styles.listRow} onPress={() => navigation.navigate('Info', {id: list.id, media: list.media_type, navigation})}>

                        <View>
                            <Text style={styles.textProduction}>{list.title ? list.title : list.name}</Text>

                            {newDate[0] &&
                                <Text style={styles.data} >{newDate[0]}</Text>
                            }

                            {list.poster_path ?
                                <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w300${list.poster_path}` }} />
                                :
                                <Image style={styles.image} source={ImgDefault} />
                            }

                        </View>

                    </TouchableOpacity>
                )
            })}

        </View>
    )
}

export default ListOfProductions;

const styles = StyleSheet.create({
    containerProdiction: {
        flex: 1,
        margin: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 50,
    },
    listRow: {
        width: '33%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textProduction: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    data: {
        fontSize: 8,
        fontWeight: 'bold',
        color: "#fff",
        alignSelf: 'center',
    },
    image: {
        width: 100,
        height: 150,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 8,
        borderColor: '#666',
        borderWidth: 1,
    },
})