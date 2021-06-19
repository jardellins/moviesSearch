import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListComponents = (listAll) => {
    // console.log(listAll)
  return (
    <View>
        <Text style={styles.title}>{listAll.title}</Text>
        <Text style={styles.title}>Teste</Text>
    </View>
  )
}

export default ListComponents;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#fff',
    }
})