import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.containerFoorter}>
        <Text style={styles.textFooter}>Dados extraidos do site themoviedb.org</Text>
    </View>
    )
}

export default Footer;

const styles = StyleSheet.create({
    containerFoorter: {
        flex: 1,
        backgroundColor: '#666',
        padding: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    textFooter: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#fff',
    }
})