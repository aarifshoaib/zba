import { StyleSheet, Text, View } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import LoginNavigation from './src/auth/login-navigation';
import { AuthContext } from './src/auth/redux/auth.context';
import React from 'react';
import AppSharedContextProvider, { AppSharedContext } from './src/shared/redux/app-shared.context';
import LottieView from 'lottie-react-native';
import { appAnimations } from './src/shared/constants/animations';
import { setUpAxiosInterceptors } from './src/auth/services/axios.interceptor';
import DrawerNavigation from './src/drawer/drawer-navigation';


const AppMain = () => {

    const authContext = useContext(AuthContext);
    const {logout} = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const appContext = useContext(AppSharedContext);

    useEffect(() => {
        setIsLoading(appContext.loader);
    }, [appContext.loader]);

    useEffect(() => {
        setUpAxiosInterceptors(logout);
    },[logout])


    useEffect(() => {
        console.log(authContext.user, 'The user is logged in from AppMain');
        setUser(authContext.user);
        if (authContext.user != null) {
            console.log(authContext.user.mail, 'The user is logged in');
        }
    }, [authContext.user])

    return (

        <View style={styles.container}>
            {user ? <DrawerNavigation/> : <LoginNavigation />}
            {isLoading && <View style={{ flex: 1, backgroundColor: 'rgba(190,190,190,.5)', position: 'absolute', justifyContent: 'center', top: 0, right: 0, left: 0, bottom: 0, zIndex: 1 }}>
                
            </View>}
        </View>
    )
}

export default AppMain

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})