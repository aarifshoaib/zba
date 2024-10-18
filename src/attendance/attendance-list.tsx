import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AttendanceContextProvider, { AttendanceContext } from './redux/attendance.context';
import LeaveItem from './components/leaveitem';
import NoRecords from '../shared/components/no-records';
import ScreenWrapper from '../shared/components/screen-wrapper';
import SelectControl from '../shared/ui/select.control';
import { theme } from '../shared/theme';

const AttendanceWrapper = ({ navigation }) => {


    return (<AttendanceContextProvider>
        <AttendanceList />
    </AttendanceContextProvider>);
}

const AttendanceList = () => {

    const attCtx = useContext(AttendanceContext);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const flatListRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response: any = await attCtx.fetchAttendance();
        }
        fetchData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        const response: any = await attCtx.fetchAttendance();
        console.log(response);
        setData(response.items);
        setRefreshing(false);
    }

    return (
        <ScreenWrapper isScroll={true} refreshing={refreshing} onRefresh={onRefresh} >
            {<View style={[styles.container, { paddingTop: 10 }]}>

                <FlatList data={attCtx.attendance}
                    scrollEnabled={false}
                    ref={flatListRef}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(data) => <LeaveItem index={data.index} data={data.item} />}
                />
            </View>}
            {(!attCtx.attendance || attCtx.attendance.length == 0) && <View style={styles.container}>
                {!attCtx.attendance.length && <NoRecords title={'No Attendance History Found!'} />}
            </View>}
        </ScreenWrapper>
    );

}
export default AttendanceWrapper;


const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'flex-start',
    },
    date: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic'
    },
    title: {
        fontSize: 22, color: theme.primary
    },
    status: { paddingStart: 10, fontFamily: theme.fontFamily, color: theme.primary },
    statusContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }
})
