import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigation from '../home/home-navigation';
import AppDrawer from '../shared/layout/drawer';
import AppIcon from '../shared/ui/icons';
import React from 'react';
import ProfileScreen from './profile/profile-screen';
import NotificationsScreen from './notifications/notifications-screen';
import SettingsScreen from './settings/settings-screen';
import { theme } from '../shared/theme';
import ProfileHeader from './profile/profile-header';
import ProfileNavigation from './profile/profile-navigation';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator drawerContent={props => <AppDrawer {...props} />}>
            <Drawer.Screen options={{ drawerActiveBackgroundColor: theme.tint, drawerLabelStyle: styles.drawerLabel, headerShown: false, title: 'Home', drawerIcon: () => <AppIcon name="home-outline" color={theme.primary} size={25} type={'ionic'} /> }} name="HomeNavigation" component={HomeNavigation} />
            <Drawer.Screen options={
                {
                    headerShown: false,
                    headerStyle: { backgroundColor: theme.primary, height: 40 },
                    drawerActiveBackgroundColor: theme.tint,
                    drawerLabelStyle: styles.drawerLabel,
                    drawerIcon: () => <AppIcon name="user" color={theme.primary} size={25} type={'ant'} />
                }} name="Profile" component={ProfileNavigation} />
            <Drawer.Screen options={{ drawerActiveBackgroundColor: theme.tint, drawerLabelStyle: styles.drawerLabel, drawerIcon: () => <AppIcon name="notifications-outline" color={theme.primary} size={25} type={'ionic'} /> }} name="Notifications" component={NotificationsScreen} />
            <Drawer.Screen options={{ drawerActiveBackgroundColor: theme.tint, drawerLabelStyle: styles.drawerLabel, drawerIcon: () => <AppIcon name="settings-outline" color={theme.primary} size={25} type={'ionic'} /> }} name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({
    drawerLabel: {
        color: theme.primaryDark,
        fontFamily: theme.fontFamily,
        fontSize: 18
    },
    activeLabel: {
        color: theme.primary,
        fontFamily: theme.fontFamily,
        fontSize: 18,
        backgroundColor: theme.tint
    },
    header: {
        backgroundColor: theme.primary,
    },
    drawerTrigger: {
        paddingTop: 60,
        paddingLeft: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 70,
        backgroundColor: 'white',
        marginTop: 0
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginTop: 10
    },
    subtitle: {
        color: 'white',
        fontSize: 16,
        marginVertical: 10
    }
})