import { StyleSheet, View, Image } from 'react-native';
import { useContext, useEffect, useState } from 'react'
import "core-js/stable/atob";
import { AuthContext } from './redux/auth.context';
import React from 'react';
import { appImages } from '../shared/constants/images';
import { ImageButton } from '../shared/ui/buttons';
import { theme } from '../shared/theme';
import LottieView from 'lottie-react-native';
import { appAnimations } from '../shared/constants/animations';
import Textbox from '../shared/ui/textboxes.control';
import { ButtonBlock } from '../shared/components/buttons';
import axios from 'axios';
import { Toast } from 'react-native-toast-notifications';


const LoginScreen = () => {

    const authContext = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [image, setImage] = useState('');
    const [form, setForm] = useState({
        p_user_id: '',
        p_password: ''
    });

    useEffect(() => {
        if (authContext.user) {
            setLoggedIn(true);
        }
    }, [authContext.user]);

    useEffect(() => {
        
    },[form])


    const _onLogin = async () => {
        try {
            console.log('Form', form);
            const response = await axios.post('https://sanaerp.com/apexor/sanaerp69/py/pc/1000', form);
            console.log('Response from Azure', response.data.status);
            if (response.data.status === 'SUCCESS') {
                authContext.login(response.data);
            } else{
                Toast.show('Invalid User Name or Password', {
                    type: 'danger',
                    duration: 3000,
                });
               authContext.user = null;
            }
        } catch (error) {
            console.log('Error during Azure operation', error)
        }
    };

    const _onLogout = () => {
        authContext.logout();
    };

    return (
        <View style={styles.container}>
            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    {/* <LottieView source={appAnimations['']} style={{ flexDirection: 'row', padding: 240, justifyContent: 'center', alignSelf: 'center' }} progress={1} autoPlay={false} loop={false} /> */}
                </View>
            </View >
            <View style={styles.container}>
            <Textbox form={form} isRequired={true} title='User Name' hasError={false} multiline={false} field='p_user_id' placeholder='User Name' updateForm={setForm} clear={true} />
            <Textbox form={form} isRequired={true} title='Password' hasError={false} multiline={false} field='p_password' placeholder='Password' updateForm={setForm} isPassword={true} clear={true} />
            </View>
            <View style={{ flex: 1, backgroundColor: 'pinkd', justifyContent: 'space-between', alignItems: 'center' }}>
            <ImageButton image={'azure'} onclick={_onLogin} style={styles.imageButton} />
                <Image
                    style={styles.logoImage}
                    resizeMode='stretch'
                    source={appImages['fabs']}
                />
            </View>
        </View>

    )
}


const styles = StyleSheet.create({

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
    imageButton: {
        backgroundColor: theme.primary,
        width: 200,
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 15,
        flex: 1
    },
    scrollContainer: {
        backgroundColor: '#fff', borderTopEndRadius: 30, borderTopStartRadius: 30,
        alignContent: 'center',
    }

})






export default LoginScreen;
