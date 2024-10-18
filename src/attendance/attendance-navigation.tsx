import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../shared/theme';
import AppTitle from '../shared/components/app-title';
import AppBack from '../shared/components/back';
import { HeaderButton } from '../shared/components/buttons';
import AttendanceWrapper from './attendance-list';
import AddAttendanceWrapper from './attendance-screen';


const AttendanceNavigation = ({ navigation }) => {
    const Stack = createNativeStackNavigator();

    const routeToAdd = () => {
        navigation.navigate('AttendaceScreen');
    }


    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.primary }, }}>

            <Stack.Screen name="AttendanceList" options={{
                headerTitle: () => <AppTitle title={'Attendance List'} />,
                headerLeft: () => <AppBack title={'Attendance'} />,
                headerBackVisible: false,
                headerRight: () => <HeaderButton onPress={routeToAdd} icon={'plus'} type={'feather'} options={undefined}></HeaderButton>
            }} component={AttendanceWrapper} />
            <Stack.Screen name="AttendaceScreen" options={{
                headerTitle: () => <AppTitle title={'New Attendance'} />,
                headerBackVisible: false,
                headerLeft: () => <AppBack title={'Attendance'} />,
                headerRight: () => (<HeaderButton onPress={null} icon={'information-variant'} type={'material'} options={null} />)
            }} component={AddAttendanceWrapper} />

        </Stack.Navigator>
    )
}

export default AttendanceNavigation

const styles = StyleSheet.create({})

