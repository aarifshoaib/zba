import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/redux/auth.context';
import ErrorMessage from '../shared/components/messages/error-message';
import DatepickerControl from '../shared/ui/datepicker.control';
import AttendanceContextProvider, { AttendanceContext } from './redux/attendance.context';
import ScreenWrapper from '../shared/components/screen-wrapper';
import Textbox from '../shared/ui/textboxes.control';
import CustomRadioButton from '../shared/ui/custom-radio.control';
import LabelControl from '../shared/ui/label.control';
import { ButtonBlock } from '../shared/components/buttons';
import * as yup from 'yup';
import { FormValidation } from '../shared/utils/form.validation';
import { useFocusEffect } from '@react-navigation/native';
import { Toast } from 'react-native-toast-notifications';
import { theme } from '../shared/theme';

const AddAttendanceWrapper = ({ navigation }) => {
    return (
        <AttendanceContextProvider>
            <AttendanceScreen navigation={navigation} />
        </AttendanceContextProvider>
    )
}


const AttendanceScreen = ({ navigation }) => {
    const [form, setForm] = useState({empcode: ''});
    const [error, setError] = useState(false);
    const [maxhours, setMaxHours] = useState([]);
    const [selectedSortValue, setSelectedSortValue] = useState({ value: 8 });
    const [maxOThours, setMaxOTHours] = useState([]);
    const [selectedSortOTValue, setSelectedSortOTValue] = useState({ value: 0 });
    const [clear, setClear] = useState(false);
    
    const authContext = useContext(AuthContext);
    const attendanceContext = useContext(AttendanceContext);
    let hours = [];
    let othours = [];


    const formSchema = yup.object().shape({
        empcode: yup.string().required('Employee Code is Required')
    });
    const clearSearch = () => {
        setClear(true);
      }
    useEffect(() => {
        if (authContext.date == null || authContext.project == null || authContext.payCyle == null) {
            setError(true);
        } else {
            for (let i = 0; i < parseInt(authContext.payCyle?.hours_per_day) + 1; i++) {
                hours.push({ label: i, value: i });
            }
            for (let i = 0; i < parseInt(authContext.payCyle?.max_ot2_hrs) + 1; i++) {
                othours.push({ label: i, value: i });
            }
            console.log(hours, 'Hours');
            setMaxHours(hours);
            setMaxOTHours(othours);
        }
        console.log(error, 'Error');
    }, [authContext.payCyle, authContext.project]);

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            return () => {
                setForm(null);
                attendanceContext.setErrors({});
            };
        }, [])
    );

    useEffect(() => {
        if (form && form?.empcode === '') {
            setClear(false);
          }
    },[clear]);


    const save = async () => {
        try {
            console.log(form, 'Form');
            await formSchema.validate(form, { abortEarly: false });
            let data = { ...form, whrs: selectedSortValue.value, date:authContext.date?.dateString, compcode: authContext.user?.compcode, othrs: selectedSortOTValue.value, user:authContext.user?.id, pc: authContext.payCyle?.process_cycle, project: authContext.project?.prj_code };
            const resp: any = await attendanceContext.addAttendance(data);
            if(resp.status === 'SUCCESS') {
                setClear(false);
                form.empcode = '';
                Toast.show('Attendance Added Successfully', {
                    type: 'success',
                    duration: 3000,
                });
            }
            console.log(resp);
        } catch (err) {
            const errr = FormValidation(err);
            if (errr) {
                attendanceContext.setErrors(errr);
                console.log(errr);
            }
        }
    }

    return (
        <ScreenWrapper refreshing={undefined} onRefresh={undefined}>
            <View style={[styles.scrollContainer, styles.container]}>
                <Textbox form={form} isRequired={true} onclear={clearSearch} clear={clear} iconClearOptions={{ icon: 'x-circle', size: 20, color: theme.primary }} title='Employee Code' hasError={attendanceContext.errors['empcode']} multiline={false} field='empcode' placeholder='Employee Code' updateForm={setForm} />
                <LabelControl title={'Working Hours'} />
                <View style={styles.radioContainer}>
                    {maxhours.length > 0 && maxhours.map((item, index) => {
                        return (
                            <CustomRadioButton
                                key={index}
                                label={item.label}
                                icon={{ type: item.type, name: item.icon }}
                                selected={selectedSortValue.value === item.value}
                                onSelect={() => setSelectedSortValue({ value: item.value })}
                            />
                        )
                    })
                    }
                </View>
                <LabelControl title={'OT Hours'} />
                <View style={styles.radioContainer}>
                    {maxOThours.length > 0 && maxOThours.map((item, index) => {
                        return (
                            <CustomRadioButton
                                key={index}
                                label={item.label}
                                icon={{ type: item.type, name: item.icon }}
                                selected={selectedSortOTValue.value === item.value}
                                onSelect={() => setSelectedSortOTValue({ value: item.value })}
                            />
                        )
                    })
                    }
                </View>
                <View style={{ flexDirection: 'row', padding: 5, display: 'flex', marginTop: 20, paddingHorizontal: 0 }}>
                    <View style={{ width: '50%', marginEnd: 5 }} >
                        <ButtonBlock text='Submit' action={() => { save() }} />
                    </View>
                    <View style={{ width: '50%' }} >
                        <ButtonBlock borderColor={'#eee'} textColor={'#666'} color={'#cdcdcd'} text='Verify Employee' action={() => { }} />
                    </View>
                </View>
                {error && <ErrorMessage navigation={navigation} message={'Please Select Date, Paycycle and Project'} title={'Error'} />}
            </View>
        </ScreenWrapper>
    );
}
export default AddAttendanceWrapper;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    scrollContainer: {
        backgroundColor: '#fff', borderTopEndRadius: 30, borderTopStartRadius: 30,
        alignContent: 'center',
    },
    radioContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})