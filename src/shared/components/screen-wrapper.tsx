import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { theme } from '../theme'
import { RefreshControl } from 'react-native-gesture-handler'

const ScreenWrapper = ({ children, isScroll = true, refreshing, onRefresh }) => {
    return (
        <View style={{ flex: 1, backgroundColor: theme.primary, paddingTop: 10}}>
            <View style={{ ...styles.scrollContainer, flex: 1, paddingBottom: 10}}>
                {isScroll && <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {children}
                </ScrollView>
                }
                {!isScroll && children}
            </View>
        </View>
    )
}

export default ScreenWrapper

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#fff', borderTopEndRadius: 15, borderTopStartRadius: 15,
        alignContent: 'center',
        overflow: 'hidden',

    }
})