import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel';

import api from '../../services/api'
import key from '../../../key'

import ListItemsCarousel from '../../components/ListItemsCarousel'
import Slide from '../../components/Slide'
import Footer from '../../components/Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const Home = ({navigation}) => {
    const carouselRef = useRef(null)
    const [slide, setSlide] = useState({})
    const [listAll, setListAll] = useState([])
    const [listDiscover, setListDiscover] = useState([])
    const [listTvTranding, setListTvTranding] = useState([])
    const [dataSlide, setDataSlide] = useState([])

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

    useEffect(() => {
        let date = (slide.release_date ? slide.release_date : slide.first_air_date)
        let newDate = []

        if (date) {
            newDate = date.split('-')
        }

        setDataSlide(newDate)
    }, [])

    return (
        <ScrollView style={{ flex: 1 }} >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={styles.container}>

                    <Slide slide={slide} />

                    <View>
                        {listAll &&
                            <>
                                <Text style={styles.listTitle}>{listAll.title}</Text>
                                <Carousel
                                    ref={carouselRef}
                                    data={listAll.items}
                                    renderItem={(items, index) => <ListItemsCarousel list={items} navigation={navigation} />}
                                    sliderWidth={screenWidth}
                                    itemWidth={200}
                                />
                            </>
                        }

                        {listDiscover &&
                            <>
                                <Text style={styles.listTitle}>{listDiscover.title}</Text>
                                <Carousel
                                    ref={carouselRef}
                                    data={listDiscover.items}
                                    renderItem={(items, index) => <ListItemsCarousel list={items} navigation={navigation} />}
                                    sliderWidth={screenWidth}
                                    itemWidth={200}
                                />
                            </>
                        }

                        {listTvTranding &&
                            <>
                                <Text style={styles.listTitle}>{listTvTranding.title}</Text>
                                <Carousel
                                    ref={carouselRef}
                                    data={listTvTranding.items}
                                    renderItem={(items, index) => <ListItemsCarousel list={items} navigation={navigation} />}
                                    sliderWidth={screenWidth}
                                    itemWidth={200}
                                />
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