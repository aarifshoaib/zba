import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenWrapper from '../home/home-screen';
import { theme } from '../shared/theme';
import React from 'react';
import AppHeader from '../shared/components/header';
import AppTitle from '../shared/components/app-title';
import AppBack from '../shared/components/back';
import ProjectScreenWrapper from '../projects/project-screen';
import PCScreenWrapper from '../paycycles/pc-screen';
import AttendanceNavigation from '../attendance/attendance-navigation';

const AppServicesNavigation = ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.primary, }, headerShadowVisible: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreenWrapper} options={{ header: () => <AppHeader navigation={navigation} /> }} />
            <Stack.Screen name="ProjectNavigation"
                options={{
                    title: 'Projects', headerTitle: () => <AppTitle title={'Projects'} />,
                    headerLeft: () => <AppBack title={'Projects'} />,
                    headerBackVisible: false,
                }} component={ProjectScreenWrapper} />
            <Stack.Screen name="PCNavigation"
                options={{
                    title: 'Pay Cycles', headerTitle: () => <AppTitle title={'Pay Cycles'} />,
                    headerLeft: () => <AppBack title={'Pay Cycles'} />,
                    headerBackVisible: false,
                }} component={PCScreenWrapper} />
            <Stack.Screen name="AttendanceNavigation" options={{ headerShown: false }} component={AttendanceNavigation} />
        </Stack.Navigator>

    )
}

export default AppServicesNavigation

const styles = StyleSheet.create({})