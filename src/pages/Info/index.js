import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import NumberFormat from 'react-number-format';

import api from '../../services/api'
import key from '../../../key'

import ImageDefault from '../../../assets/img.png'
import Footer from '../../components/Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const Info = ({ route }) => {
    const [getInfo, setGetInfo] = useState({})
    const [minutes, setMinutes] = useState(0)
    const [dateNew, setDateNew] = useState('')

    useEffect(() => {
        const handleGetApi = async () => {

            await api.get(`/${route.params.media}/${route.params.id}${key}`).then(responde => {
                setGetInfo(responde.data)
            }
            )
        }

        handleGetApi()
    }, [])

    useEffect(() => {
        const handleMinute = () => {
            if (!getInfo.runtime === false) {
                setMinutes(getInfo.runtime)
            } else {
                if (!getInfo.episode_run_time === false) {
                    setMinutes(getInfo.episode_run_time[0])
                }
            }
        }

        const handleDate = () => {
            if (getInfo.release_date) {
                const dateArray = getInfo.release_date.split('-')

                setDateNew(`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`)
            } else {
                if (getInfo.first_air_date) {
                    const dateArray = getInfo.first_air_date.split('-')

                    setDateNew(`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`)
                }
            }
        }

        handleMinute()
        handleDate()
    }, [getInfo])

    console.log(getInfo)

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                
                <View>
                    {getInfo.backdrop_path ?
                        <Image source={{ uri: `https://image.tmdb.org/t/p/original${getInfo.backdrop_path}` }} style={styles.imageBack} />
                        :
                        <Image source={ImageDefault} style={styles.imageBack} />
                    }

                    <View style={styles.moreInfo}>
                        <Text style={styles.title} >{getInfo.title ? getInfo.title : getInfo.name}</Text>
                    </View>

                    <LinearGradient
                        // Background Linear Gradient
                        colors={['transparent', '#141414']}
                        style={styles.backgroundTransparent}
                    />
                </View>

                <View style={styles.containerInfo}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w300${getInfo.poster_path}` }} style={styles.imagePoster} />

                    {getInfo.networks &&
                        getInfo.networks.map((stream) => <Image key={stream.name} source={{ uri: `https://image.tmdb.org/t/p/w200/${stream.logo_path}` }} style={styles.logo} />)
                    }

                    <View style={styles.overview} >
                        <Text style={styles.tagline}>{getInfo.tagline}</Text>
                        <Text>Sinopse</Text>
                        <Text>{getInfo.overview}</Text>
                    </View>

                    <View>
                        {getInfo.origin_country &&
                            <Text>
                                {getInfo.origin_country.length > 1 ? 'Paises de origem: ' : 'País de origem: '}
                                {getInfo.origin_country.map(country => (
                                    country + ' '))
                                }
                            </Text>
                        }

                        {getInfo.production_countries &&
                            <Text>
                                {getInfo.production_countries &&  'Filmagens: '}
                                {getInfo.production_countries.map(country => (
                                    country.iso_3166_1 + ' '))
                                }
                            </Text>
                        }

                        {/* {getInfo.budget > 0 &&
                            <Text>Orçamento: 
                                <NumberFormat value={getInfo.budget} displayType={'text'} thousandSeparator={true} prefix={' $'} />
                            </Text>
                        }

                        {getInfo.revenue > 0 &&
                            <Text>Arrecadação: 
                                <NumberFormat value={getInfo.revenue} displayType={'text'} thousandSeparator={true} prefix={' $'} />
                            </Text>
                        } */}

                        {getInfo.number_of_seasons &&
                            (getInfo.number_of_seasons === 1 ?
                                <Text>{getInfo.number_of_seasons} Temporada</Text>
                                :
                                <Text>{getInfo.number_of_seasons} Temporadas</Text>
                            )
                        }

                        {getInfo.number_of_episodes > 1 &&
                            <Text>{getInfo.number_of_episodes} episódios</Text>
                        }


                        <Text>Duração: {minutes} min</Text>
                    </View>

                </View>

                <Footer />

            </ScrollView>
        </View>
    )
}

export default Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    moreInfo: {
        position: 'relative',
        alignSelf: 'center',
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white'
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
    containerInfo: {
        backgroundColor: '#fff',
        margin: 30,
        flex: 1,
        height: 'auto',
        maxHeight: screenHeight,
        borderRadius: 8
    },
    imagePoster: {
        width: 120,
        height: 180,
        alignSelf: 'center',
        margin: 8,
    },
    overview: {
        fontSize: 16,
        color: '#333',
        margin: 12,
        alignItems: 'center'
    },
    tagline: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#0c1a60',
        marginBottom: 10,
    }
})