import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LabelValueControl from '../../../shared/ui/label-value.control'
import CopyClipBoard from '../../../shared/components/copy-clipboard'
import { theme } from '../../../shared/theme'
import ScreenWrapper from '../../../shared/components/screen-wrapper'

const BasicInformation = ({ navigation }) => {
    return (
        <ScreenWrapper refreshing={undefined} onRefresh={undefined}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title={'Date of Birth'} value={'21-Jan-1982'} />
                    <LabelValueControl style={styles.lastColumn} title={'Marital Status'} value={'Married'} />
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title='Gender' value={'Male'} />
                    <LabelValueControl style={styles.lastColumn} title='Nationality' value={'Jordanian'} />
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title='Date of Join' value={'17-Aug-2015'} />
                    <LabelValueControl style={styles.lastColumn} title='Position' value={'Senior Developer'} />
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title='Personal Email' value={'omar.aljaber@gmail.com'} >
                        <CopyClipBoard color={theme.primary} text='' />
                    </LabelValueControl>
                    <LabelValueControl style={styles.label} title='Mobile' value={'+971557512019'} />
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title='Address' value={'Abu Dhabi - Al Bateen'} />
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title='Line Manager' value={'Mohamed Aslam'} />
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default BasicInformation

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    container: {
        margin: 0,
        padding:15
    },
    label: {
        justifyContent: 'flex-start',
        width: '48%',
        marginHorizontal: '2%'
    },
    firstColumn: {
        width: '60%',
        marginHorizontal: '2%'
    },
    lastColumn: {
        width: '35%',
        marginHorizontal: '2%'
    }
})