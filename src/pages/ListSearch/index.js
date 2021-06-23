import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import api from '../../services/api'
import key from '../../../key'

import ListOfProductions from '../../components/ListOfProductions';
import Footer from '../../components/Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const ListSearch = ({ route, navigation }) => {

    const [searchList, setSearchList] = useState([])
    const [genreList, setGenreList] = useState([])
    const [newList, setNewList] = useState([])

    const name = route.params.name
    const genreName = route.params.genreName
    const id = route.params.id

    useEffect(() => {

        if (name) {
            const findout = async () => {
                await api.get(`/search/multi${key}&query=${name}`).then(response => {
                    setSearchList(response.data.results)
                })
            }

            findout()
        }
    }, [name])

    useEffect(() => {

        if (genreName) {
            const findout = async () => {
                await api.get(`/discover/movie${key}&with_genres=${id}`).then(response => {
                    setGenreList(response.data.results)
                })
            }

            findout()
        }

    }, [genreName])

    useEffect(() => {
        const addMedia = () => {
            const newList = genreList && genreList.map(list => ({
                ...list,
                media_type: 'movie'
            }))

            setNewList(newList)
        }

        addMedia()

    }, [genreList])

    return (
        <View style={styles.container}>
            <ScrollView >
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

                    <MaterialIcons style={styles.arrow} name="arrow-back-ios" size={24} color="white" onPress={() => navigation.navigate('Search')} />

                    <Text style={styles.title} >{name ? `Pesquisa por ${name}` : `Filtro por ${genreName}`}</Text>

                    {searchList &&
                        <ListOfProductions listSlide={searchList} navigation={navigation} />
                    }

                    {newList &&
                        <ListOfProductions listSlide={newList} navigation={navigation} />
                    }

                    <Footer />

                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default ListSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#999',
        marginTop: 30,
        alignSelf: 'center'
    },
    arrow: {
        marginTop: 50,
        marginLeft: 25,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        width: screenWidth,
    }
})