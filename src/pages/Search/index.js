import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'

import api from '../../services/api'
import key from '../../../key'
import Footer from '../../components/Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const Background = ({ children }) => {
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['#D6D6D6', '#141414']}
            style={styles.backgroundTransparent}
        >
            {children}
        </LinearGradient>
    )
}

const Search = () => {
    const [genreList, setGenreList] = useState([])

    useEffect(() => {
        async function listGender() {
            await api.get(`/genre/movie/list${key}`).then(response => {
                setGenreList(response.data.genres)
            })

        }
        listGender()
    }, [])

    return (
        <Background>
            <ScrollView>
                <KeyboardAvoidingView>

                    <View style={StyleSheet.containerSearch}>


                        <View style={styles.containerInput}>
                            <TextInput
                                style={styles.inputSearch}
                                placeholder={'Digite o nome do filme ou série'}
                            />
                            <TouchableOpacity>
                                <Ionicons name='search' size={20} style={styles.iconSearch} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerGenre}>
                        {genreList[0] && genreList.map((genre) => {
                            return (
                                <TouchableOpacity style={styles.listGenre}>
                                        <Text style={styles.textGenre}>
                                            {genre.name}
                                        </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    <Footer />
                </KeyboardAvoidingView>
            </ScrollView>
        </Background>
    )
}

export default Search;

const styles = StyleSheet.create({
    containerSearch: {
        flex: 1,
    },
    backgroundTransparent: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
    },
    containerInput: {
        marginTop: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 5,
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 3,
        zIndex: 3
    },
    inputSearch: {
        padding: 10,
        fontSize: 17,
        width: '90%',
    },
    iconSearch: {
        color: '#ff8732',
        fontSize: 23,
    },
    containerGenre: {
        flex: 1,
        margin: 20,
        marginTop: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        // width: screenWidth,
    },
    listGenre: {
        backgroundColor: '#DEDEDE',
        padding: 25,
        borderRadius: 8,
        width: '47%',
        margin: 5,
        alignItems: 'center',
    },
    textGenre: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'center',
    }
})