import { StyleSheet, Text, View, Image, ImageBackground, Pressable, Dimensions } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { theme } from '../theme';
import { AuthContext } from '../../auth/redux/auth.context';
import { IconButton } from '../ui/buttons';

const Profile = ({ navigation }) => {
    const authContext = useContext(AuthContext);
    const user = authContext.user;
    const windowWidth = Dimensions.get('window').width;

    const toggleDrawer = () => {
        navigation.toggleDrawer();
    };


    return (
        <View style={styles.profileInnerWrapper}>
            <View style={{ marginStart: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton name={'three-bars'} size={28} color={theme.tint} type={'octIcon'} onclick={toggleDrawer} />
                <Text style={styles.headerText}>Welcome {authContext?.user.name} &#128512; </Text>
            </View>
            <View style={{display:'flex', alignItems:'flex-end', flexDirection:'row'}}>
                <IconButton name={'bell'} size={22} color={theme.tint} type={'octIcon'} onclick={toggleDrawer} />
                <Image style={styles.image} source={{ uri: authContext?.profileImage }} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    profileInnerWrapper: {
        flex: 1,
        backgroundColor: theme.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        alignItems: 'flex-end'
    },
    headerText: {
        color: theme.tint,
        fontSize: 20,
        marginStart: 25,
        fontFamily: 'Poppins',
        textTransform: 'capitalize'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 100,
        zIndex: 1000,
        marginLeft: 20,
        borderWidth: 2,
        marginRight: 20,
        marginTop: 5,
        borderColor: theme.tint,
        alignSelf: 'flex-end',
        position: 'relative',
        top: 5,
        padding: 10
    }
})

export default Profile
