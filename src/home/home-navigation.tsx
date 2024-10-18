import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../shared/theme';
import React from 'react';
import AppIcon from '../shared/ui/icons';
import AppServicesNavigation from '../app-services/app-services.navigation';

const HomeNavigation = ({ navigation }) => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    const drawIcon = (color, size, icon, type = 'ant') => {
        return (
            <AppIcon name={icon} color={color} size={size} type={type} />
        )
    }
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={AppServicesNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default HomeNavigation

const styles = StyleSheet.create({})

