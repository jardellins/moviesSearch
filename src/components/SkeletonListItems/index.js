import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const SkeletonListItems = () => {
    const list = [1, 2, 3]

    return (
        <>
            <View style={{ margin: 10 }}>
                <ShimmerPlaceHolder
                    style={styles.textSkeleton}
                />
            </View>
            <View style={styles.container}>

                {list.map(array => {
                    return (
                        <View key={array} style={{ alignItems: 'center', margin: 5, paddingLeft: 5 }}>

                            <ShimmerPlaceHolder
                                visible={false}
                                style={styles.imageSkeleton}
                            />

                            <ShimmerPlaceHolder
                                visible={false}
                                style={styles.titleSkeleton}
                            />
                        </View>
                    )
                })}
            </View>
        </>
    )
}

export default SkeletonListItems;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    textSkeleton: {
        width: 150,
        height: 25,
        borderRadius: 6,
    },
    imageSkeleton: {
        width: 130,
        height: 190,
        borderRadius: 8,
        marginTop: 8,
    },
    titleSkeleton: {
        width: 100,
        marginTop: 5,
        borderRadius: 6,
    }
})