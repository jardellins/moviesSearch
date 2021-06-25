import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const Slide = ({slide, navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Info', {id: slide.id, media: slide.media_type})}>
            <View>
                <Image source={{ uri: `https://image.tmdb.org/t/p/original${slide.backdrop_path}` }} style={styles.imageBack} />

                <LinearGradient
                    colors={['transparent', '#141414']}
                    style={styles.backgroundTransparent}
                />
                <View style={styles.moreInfo}>
                    <Text style={styles.title} >{slide.title ? slide.title : slide.name}</Text>

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Slide;

const styles = StyleSheet.create({
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
})