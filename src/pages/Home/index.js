import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-snap-carousel';

import api from '../../services/api'
import key from '../../../key'

import ListComponents from '../../components/ListComponents/'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const Home = () => {
    const carouselRef = useRef(null)
    const [slide, setSlide] = useState({})
    const [listAll, setListAll] = useState([])

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

            setListAll(responde.data.results)

        })

    }, [])

    const renderItems = ({ items, index }) => {
        console.log(items)
        return (
            <ListComponents listAll={items} />
        )
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.container}>

                <View>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/original${slide.backdrop_path}` }} style={styles.imageBack} />

                    <LinearGradient
                        // Background Linear Gradient
                        colors={['transparent', '#141414']}
                        style={styles.backgroundTransparent}
                    />
                    <View style={styles.moreInfo}>
                        <Text style={styles.title} >{slide.title}</Text>

                        <TouchableOpacity style={styles.moreInfoButtom}>
                            <Text style={styles.moreInfoText}>Mais Info</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    {listAll.length > 0 &&
                        <Carousel
                            ref={carouselRef}
                            data={listAll}
                            renderItem={renderItems}
                            sliderWidth={screenWidth}
                            itemWidth={200}
                        />
                    }
                </View>

            </View>
        </KeyboardAvoidingView>
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
    moreInfoButtom: {
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 3,
        elevation: 3
    },
    moreInfoText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#222",
        elevation: 2
    }
})