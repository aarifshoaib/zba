import React, { useContext } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AuthContext } from "../auth/redux/auth.context";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ScreenWrapper from "../shared/components/screen-wrapper";
import { appImages } from "../shared/constants/images";
import { theme } from "../shared/theme";
import AttendanceContextProvider, { AttendanceContext } from "../attendance/redux/attendance.context";
const HomeScreenWrapper = ({ navigation }) => {
    return (<AttendanceContextProvider><Home navigation={navigation}/></AttendanceContextProvider>);
}

const Home = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const attCtx = useContext(AttendanceContext);
    const authContext = useContext(AuthContext);
    React.useEffect(() => {
        console.log('date changed');
        
        attCtx.fetchAttendance();
    }, [authContext.user, authContext.project, authContext.date])

    const navigateToHistory = (screen, data = '') => {
        navigation.navigate(screen, { data });
    }

    const rrefreshing = () => {
        null;
    }

    const onRefresh = () => {
        null;
    }

    const lBalance = 0; // Define lBalance with an initial value

    return (<ScreenWrapper refreshing={refreshing} onRefresh={onRefresh}>
        <View style={{ flex: 1, }}>
            <ImageBackground source={appImages.illustration} style={{ width: '100%', height: 180, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', flex: 1 }} >
                    <TouchableOpacity onPress={() => navigateToHistory('ProjectNavigation', 'unAuth')} style={styles.tileContainer}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={appImages.vacation} style={{ width: 25, height: 25, marginRight: -5, tintColor: '#ffffffdd' }} />
                            <Text style={[styles.tileNumber]}>{authContext.project?.prj_code}</Text>
                            <Text style={[styles.tileTitle]}>{'Project\nCode'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToHistory('PCNavigation', 'unAuth')} style={styles.tileContainer}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={appImages.ibtikar} style={{ width: 25, height: 25, marginRight: -5, tintColor: '#ffffffdd' }} />
                            <Text style={[styles.tileNumber]}>{authContext.payCyle?.base_value}</Text>
                            <Text style={[styles.tileTitle]}>{'Process Cycle\nCode'}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.tileContainer}>
                        <TouchableOpacity onPress={() => navigateToHistory('AttendanceNavigation', 'auth')}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={appImages.absense} style={{ width: 25, height: 25, marginRight: -5, tintColor: '#ffffffdd' }} />
                                <Text style={[styles.tileNumber]}>{attCtx.attendance?.length}</Text>
                                <Text style={[styles.tileTitle]}>{'Attendance\nEntered'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
        <View style={{  backgroundColor: '#EDF2F6' }}>
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 0 }}>
                    <Calendar
                    current={authContext.date?.dateString}
                        onDayPress={day => {
                            console.log(day);
                            authContext.selectedDT(day)
                        }}
                        markedDates={{
                            [authContext.date?.dateString]: { selected: true, selectedColor: '#2E86C1' }
                        }}
                    />
                </View>
            </View>
        </View>

    </ScreenWrapper>);
}

export default HomeScreenWrapper;


const styles = StyleSheet.create({
    quickActionWrapper: {
        flex: 1,
    },
    homeServiceWrapper: {
        flex: 1,
    },
    requiredActionWrapper: {
        flex: 1,
        backgroundColor: theme.primary,
    },
    tileContainer: {
        paddingTop: 10,
        flex: 1,
        width: 60,
        borderRadius: 20,
        height: 130,
        backgroundColor: theme.primary,//'rgba(57,115,168,.66)',
        margin: 5,
        borderWidth: 4,
        borderColor: '#DDECF8',
        alignItems: 'center',
        shadowColor: '#000',
        justifyContent: 'center',
        flexDirection: 'column'
        // shadowOffset: { width: 0, height: 4 },
        // shadowRadius:1,
        // shadowOpacity: 0.50,
    },
    tileNumber: {
        fontSize: 25,
        color: '#fff',
        fontFamily: 'AdportsThin',
        textShadowColor: 'rgba(255,255,255,.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
        marginVertical: 5
        // backgroundColor: 'pink'
    },
    tileFontStyle: {
        color: '#e5f2fc',
        textShadowColor: 'rgba(255,255,255,.5)',
        fontFamily: 'AdportsThin',
        fontSize: 20
        // textShadowOffset: { width: 0, height: 1 },
        // textShadowRadius: 1,
    },

    tileValues: {
        fontSize: 20,
    },
    subTitleTile: {
        fontSize: 12,
        color: '#333'
    },
    tileTitle: {
        fontFamily: 'AdportsRegular',
        fontSize: 12,
        flex: 1,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 15,
    },
    activeTab: {
        backgroundColor: theme.primary,
        color: theme.tint,
        borderColor: '#fff',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
    },
    mainBox: {

    },
    unactiveTab: {
        backgroundColor: '#fff',
        color: theme.primary,
        borderColor: '#A9BED3',
        borderWidth: 1,
    }
});
