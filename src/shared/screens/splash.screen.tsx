import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import React from 'react'
import { appImages } from '../constants/images';
import LottieView from 'lottie-react-native';
import { appAnimations } from '../constants/animations';

const SplashScreen = ({ onLayoutRootView }) => {


    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onLayout={onLayoutRootView}>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <LottieView source={appAnimations['loader']} style={{ flexDirection: 'row', padding: 100, justifyContent: 'center', alignSelf: 'center' }} autoPlay loop={false} />
            </View>
            <View style={{ flex: 1, backgroundColor: 'pinkd', justifyContent: 'flex-end' }}>
                <Image
                    style={styles.logoImage}
                    resizeMode='stretch'
                    source={appImages['fabs']}
                />
            </View>
        </View >
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 50,
        width: 250,
        height: 87
    },
    logoImage: {
        height: 30,
        width: 162,
        marginBottom: 50
    },
})