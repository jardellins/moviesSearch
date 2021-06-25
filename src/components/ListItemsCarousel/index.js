import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ListComponents = ({ list, navigation, media }) => {

  const mediaList = list.media_type || media

  return (
    <>
      {list &&
        <TouchableOpacity onPress={() => navigation.navigate('Info', { id: list.id, media: mediaList, navigation })}>
          <View style={styles.container}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w300${list.poster_path}` }} style={styles.imageList} />
            <Text style={styles.title}>{list.title ? list.title : list.name}</Text>
          </View>
        </TouchableOpacity>
      }
    </>
  )
}

export default ListComponents;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 270,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    color: '#fff',
  },
  imageList: {
    width: 130,
    height: 190,
    borderRadius: 8,
    borderColor: '#ff8732',
    borderWidth: 2,

  }
})