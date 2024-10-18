import { StyleSheet, Image } from 'react-native'
import React, { useContext, useEffect, useState, useMemo } from 'react'
import { AuthContext } from '../../auth/redux/auth.context';


const UserImage = ({ email, width = 50 }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);




    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    useEffect(() => {
        try {
            const fetchUserImage = async () => {
               
            }
            fetchUserImage();
        }
        catch (error) {
            console.error('Error fetching user image:' + email, JSON.stringify(error));
            setError(error);
        }
    }, [authCtx.user]);

    return (
        <Image
            style={{ ...styles.image, width: width, height: width }}
            source={{ uri: image }}
        />
    );
}

export default UserImage;

const styles = StyleSheet.create({
    image: {
        borderRadius: 1000,
        zIndex: 1000,
        borderWidth: 4,
        borderColor: '#CAD8E5',
        alignSelf: 'flex-end',
    }
});