import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const SkeletonListProduction = () => {
  const list = [1, 2, 3]

  return (
    <View style={{ flexDirection: 'row', marginBottom: 8, marginTop: 30}}>

      {list.map(array => {
        return (
          <View>
            <ShimmerPlaceHolder
              visible={false}
              style={styles.titleSkeleton}
            />
            <ShimmerPlaceHolder
              visible={false}
              style={styles.yearSkeleton}
            />
            <ShimmerPlaceHolder
              visible={false}
              style={styles.imageSkeleton}
            />
          </View>
        )
      })
      }
    </View>
  )
}

export default SkeletonListProduction;

const styles = StyleSheet.create({
  titleSkeleton: {
    width: 100,
    height: 14,
    margin: 10,
    alignSelf: 'center',
    borderRadius: 8,
  },
  yearSkeleton: {
    width: 25,
    height: 7,
    marginTop: 4,
    alignSelf: 'center',
    borderRadius: 8,
  },
  imageSkeleton: {
    width: 100,
    height: 140,
    marginTop: 9,
    alignSelf: 'center',
    borderRadius: 8,
  }
})