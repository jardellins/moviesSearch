import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const SkeletonSlide = () => {
    return (
        <>
            <ShimmerPlaceHolder
                visible={false}
                shimmerColors={["#333", "#141414", '#666']}
                style={styles.imageSkeleton}
            />

            <LinearGradient
                colors={['transparent', '#141414']}
                style={styles.backgroundTransparent}
            />

            <ShimmerPlaceHolder
                visible={false}
                shimmerColors={["#333", "#141414", '#666']}
                style={styles.titleSkeleton}
            />
        </>
    )
}

export default SkeletonSlide;

const styles = StyleSheet.create({
    imageSkeleton: {
        height: 450,
        width: screenWidth,
    },
    backgroundTransparent: {
        position: 'absolute',
        width: screenWidth,
        height: 450,
    },
    titleSkeleton: {
        width: 180,
        height: 40,
        alignSelf: 'center',
        borderRadius: 8,
    }
})