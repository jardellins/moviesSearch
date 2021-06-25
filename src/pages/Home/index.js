import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native'

import api from '../../services/api'
import key from '../../../key'

import ListItemsCarousel from '../../components/ListItemsCarousel'
import Slide from '../../components/Slide'
import Footer from '../../components/Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const Home = ({ navigation }) => {
    const [slide, setSlide] = useState({})
    const [listAll, setListAll] = useState({})
    const [listDiscover, setListDiscover] = useState({})
    const [listTvTranding, setListTvTranding] = useState({})

    useEffect(() => {

        const response = async () => {
            const list = await api.get(`/discover/movie${key}`)
            const redonNumber = Math.floor(Math.random() * (list.data.results.length - 1))
            const choose = list.data.results[redonNumber]

            setSlide({ ...choose, media_type: 'movie' })
        }

        response()

    }, [])

    useEffect(() => {
        api.get(`/trending/all/week${key}`).then(responde => {
            const items = responde.data.results

            setListAll({
                items,
                title: "Destaques"
            })

        })

    }, [])

    useEffect(() => {
        api.get(`/discover/movie${key}`).then(responde => {
            const items = responde.data.results

            setListDiscover({
                items,
                media_type: 'movie',
                title: "Novidades"
            })
        })

    }, [])

    useEffect(() => {
        api.get(`/tv/popular${key}`).then(responde => {
            const items = responde.data.results

            setListTvTranding({
                items,
                media_type: 'tv',
                title: "Séries em Destaques"
            })
        })

    }, [])

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={styles.container}>

                    <Slide slide={slide} navigation={navigation} />

                    <View>
                        {Object.keys(listAll).length > 0 &&
                            <>
                                <Text style={styles.listTitle}>{listAll.title}</Text>
                                <View style={styles.containerList}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                        {listAll.items.map((list) => {
                                            return (
                                                <ListItemsCarousel key={list.id} list={list} navigation={navigation} />
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                            </>
                        }

                        {Object.keys(listDiscover).length > 0 &&
                            <>
                                <Text style={styles.listTitle}>{listDiscover.title}</Text>
                                <View style={styles.containerList}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                        {listDiscover.items.map((list) => {
                                            return (
                                                <ListItemsCarousel key={list.id} list={list} navigation={navigation} media={listDiscover.media_type} />
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                            </>
                        }

                        {Object.keys(listTvTranding).length > 0 &&
                            <>
                                <Text style={styles.listTitle}>{listTvTranding.title}</Text>
                                <View style={styles.containerList}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                        {listTvTranding.items.map((list) => {
                                            return (
                                                <ListItemsCarousel key={list.id} list={list} navigation={navigation} media={listTvTranding.media_type} />
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                            </>
                        }
                    </View>


                    <Footer />
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414'
    },
    imageBack: {
        alignSelf: 'center',
        width: screenWidth,
        height: 450,
    },
    backgroundTransparent: {
        position: 'absolute',
        width: screenWidth,
        height: 450,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'center',
        color: '#fff',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 60
    },
    containerList: {
        width: screenWidth,
        marginTop: 15,
    },
    dataYear: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
        top: 10,
    },
    moreInfoButtom: {
        alignSelf: 'center',
        padding: 10,
        marginTop: 10,
        backgroundColor: '#eee',
        borderRadius: 3,
        elevation: 3
    },
    moreInfoText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#222",
        elevation: 2
    },
    listTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        padding: 10,
        color: '#fff',
        marginTop: 50,
    }
})