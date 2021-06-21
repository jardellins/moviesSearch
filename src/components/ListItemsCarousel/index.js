import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ListComponents = ({ list, name }) => {

  return (
    <>
      {list &&
        <TouchableOpacity>
          <View>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w300${list.item.poster_path}` }} style={styles.imageList} />
            <Text style={styles.title}>{list.item.title ? list.item.title : list.item.name}</Text>
          </View>
        </TouchableOpacity>
      }
    </>
  )
}

export default ListComponents;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    color: '#fff',
  },
  imageList: {
    width: 200,
    height: 300,
    borderRadius: 8,
    borderColor: '#ff8732',
    borderWidth: 2,

  }
})