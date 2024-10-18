import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../../auth/redux/auth.context";
import { AppSharedContext } from "../../shared/redux/app-shared.context";

export const AttendanceContext = createContext({
    attendance: [],
    addAttendance: (payload: any) => { },
    fetchAttendance: () => { },
    errors: [],
    setErrors: (errors) => { },
});

function AttendanceContextProvider({ children }) {
    const authContext = React.useContext(AuthContext);
    const appSharedContext = React.useContext(AppSharedContext);
    const [attendance, setAttendance] = useState([]);
    const [errors, setErrors] = useState<any[]>([]);

    const fetchAttendance = async () => {
        try {
            console.log('im In');
            appSharedContext.toggleLoader(true);
            let dt = authContext.date?.dateString.replaceAll('-','');
            let url = `https://sanaerp.com/apexor/sanaerp69/py/get_attendance/${authContext.user.compcode}/${authContext.user.id}/${dt}`;
            console.log(url);
            const response = await axios.get(url);
            console.log(response.data);
            setAttendance(response.data.items);
            return response.data;
        } catch (error) {
            return new Error(error);
        }
        finally{
            appSharedContext.toggleLoader(false);
        }
    }
    

    const addAttendance = async (payload: any) => {
        try {
            console.log(payload);
            const response = await axios.post('https://sanaerp.com/apexor/sanaerp69/py/attendance', payload);
            console.log(response.data);
            if(response.data.status === 'SUCCESS') {
                setAttendance([...attendance, payload]);
            }
            return response.data;
        } catch (error) {
            return new Error(error);
        }
    };


    const value = {
        attendance,
        addAttendance,
        errors,
        setErrors,
        fetchAttendance
    };

    return (
        <AttendanceContext.Provider value={value}>
            {children}
        </AttendanceContext.Provider>
    );
}
export default AttendanceContextProvider;