import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native'

import api from '../../services/api'
import key from '../../../key'

import Slide from '../../components/Slide';
import ListOfProductions from '../../components/ListOfProductions';
import Footer from '../../components/Footer';

const Movie = ({navigation}) => {
    const [slide, setSlide] = useState([])
    const [listOfMovies, setListOfMovies] = useState([])
    const [newList, setNewList] = useState([])

    useEffect(() => {

        const response = async () => {
            const list = await api.get(`/discover/tv${key}`)
            const redonNumber = Math.floor(Math.random() * (list.data.results.length - 1))
            const choose = list.data.results[redonNumber]

            setSlide({ ...choose, media_type: 'tv' })
        }

        response()

    }, [])

    useEffect(() => {
        const getMovies = async () => {
            await api.get(`/discover/tv${key}`).then(responde => {
                setListOfMovies(responde.data.results)
            })
        }

        getMovies()
    }, [])

    useEffect(() => {
        const addMedia = () => {
            const newData = listOfMovies.map(list => ({
                ...list,
                media_type: 'tv'
            }))

            setNewList(newData)
        }

        addMedia()

    }, [listOfMovies])

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }} >
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

                    <Slide slide={slide} navigation={navigation}/>

                    <View>
                        <Text style={styles.textTitle}>Séries</Text>
                    </View>

                    {newList &&
                        <ListOfProductions listSlide={newList} navigation={navigation} />
                    }

                    <Footer />

                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}


export default Movie;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414'
    },
    textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#999',
        alignSelf: 'center',
        marginBottom: 20,
    }
})