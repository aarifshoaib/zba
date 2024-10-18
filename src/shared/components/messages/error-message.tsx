import { Animated, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton } from '../../ui/buttons';
import { HeaderButton } from '../buttons';
import { theme } from '../../theme';
import { Message } from '../../ui/typography';
import LottieView from 'lottie-react-native';

const ErrorMessage = ({ title = 'Error', message = 'Error in submission your records!', isVisible = true,  navigation = null  }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const navigateToHome = () => {
        if (navigation) {
            navigation.navigate('HomeScreen');
        }
    }
    useEffect(() => {
        setModalVisible(isVisible);
    }, [isVisible]);

    const close = () => {
        setModalVisible(!modalVisible);
        navigation.navigate('HomeScreen');
    }

    return (
        <Modal
            style={{ flex: 1, backgroundColor: '#fff', zIndex: 2000, justifyContent: 'center', }}
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <Animated.View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.4)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%', maxWidth: 300, height: 250, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: theme.fontFamily, color: theme.primary, fontSize: 17 }}>{title}</Text>
                        <HeaderButton iconColor={theme.tint} onPress={close} color={theme.primary} options={undefined} icon={'close'} type={'ant'} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <LottieView source={require('../../../../assets/animations/error-animation.json')} style={{ width: 100, height: 100 }} autoPlay loop={false} />
                        <Text style={{ fontFamily: theme.fontFamily }}>{message}</Text>
                    </View>
                </View>
            </Animated.View>
        </Modal >
    )
}

export default ErrorMessage;

const styles = StyleSheet.create({})