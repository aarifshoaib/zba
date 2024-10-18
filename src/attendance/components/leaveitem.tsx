import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from "react-native";
import moment from "moment";
import { lightenColor, darkenColor, theme } from "../../shared/theme";
import AppIcon from "../../shared/ui/icons";
import { appImages } from "../../shared/constants/images";
import { mainStyle } from "../../shared/main-style";
import Flag from 'react-native-flags';
import { IconButton } from "../../shared/ui/buttons";

const LeaveItem = ({ data, index, children = <></> }) => {
   
    
    return (
        <View style={[styles.container, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <View>
                <View style={[1==1 ? styles.weekday : styles.weekend, styles.calendarDay]}>
                    <Text style={styles.weekdayTextDay}>{data.tot}</Text>
                    <Text style={styles.weekdayTextMonth}>Hours</Text>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <View style={[mainStyle.row, { justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row' }}>
                        {<><Text style={styles.title}>{data.empcode} - {data.emp_name}</Text></>}
                        
                       
                    </View>
                    <View style={{ alignItems: 'flex-end', }}><Text style={{ fontSize: 11, color: '#6F6F6F' }}>{data?.project}</Text></View>
                </View>
                <View style={[mainStyle.row, { justifyContent: 'space-between' }]}>
                    <View style={mainStyle.row}>
                        <Image source={appImages.absense} style={styles.calendarIcon} />
                        <Text style={{ fontSize: 11, color: '#5D5757', fontFamily: theme.fontFamilyMedium }}>{data.date}</Text>
                    </View>
                    
                        <View>
                            <View>
                                <Text style={{ bottom: 4, position: 'relative' }} >WH: {data.whrs} ;  OT : {data.othrs} </Text>
                            </View>
                        </View>
                    
                </View>
            </View>
        </View>
    );
}



export default LeaveItem;

const styles = StyleSheet.create({
    container: {
        
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        marginBottom: 10
    },
    title: {
        fontFamily: theme.fontFamilyMedium,
        color: darkenColor(theme.primary, 0.1),
        fontSize: 13,
        marginEnd: 5
    },
    status: {
        marginStart: 5,
        fontFamily: theme.fontFamily,
        fontSize: 10,
        color: '#727272',
        textTransform: 'capitalize'
    },
    evenRow: {
        backgroundColor: '#F5FBFF',
        borderColor: '#DDECFC',
    },
    oddRow: {
        backgroundColor: '#fff',
        borderColor: '#D4E6F4',
    },
    punchingRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    weekday: {
        backgroundColor: theme.primary,
        borderColor: '#D5E7FC'
    },
    weekdayTextDay: {
        color: '#fff',
        fontSize: 20
    },
    weekdayTextMonth: {
        color: '#fff',
        fontSize: 12,
        // textTransform: 'capitalize',
        marginBottom: 2

    },
    weekdayTextYear: {
        color: '#fff',
        fontSize: 15
    },
    weekend: {
        backgroundColor: '#A7A7A7',
        borderColor: '#C3C3C3'
    },
    calendarDay: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 10,
        borderWidth: 3,
    },
    calendarIcon: {
        marginEnd: 5,
        width: 17,
        height: 19,
        tintColor: theme.primary
    },
    approvedStatus: {
        backgroundColor: '#a0d468',
    },
    rejectedStatus: {
        backgroundColor: '#f7b2b2',

    },
    defaultStatus: {
        backgroundColor: '#ccc',
    }

})