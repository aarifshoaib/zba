import React, { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, Text, View, StyleSheet } from "react-native";
import axiosInstance from "../auth/services/axios.interceptor";
import URLs from "../shared/constants/URLs";
import ScreenWrapper from "../shared/components/screen-wrapper";

import { AppSharedContext } from "../shared/redux/app-shared.context";
import MutliSelectControl from "../shared/components/multiselect.control";
import { AuthContext } from "../auth/redux/auth.context";
import IbtikarItem from "./components/project-item";

const PCScreenWrapper = ({ navigation }) => {
    return <PCScreen navigation={navigation} />;
};

const PCScreen = ({ navigation }) => {
    const flatListRef = useRef(null);
    const [pc, setPC] = useState([]);
    const auth = React.useContext(AuthContext);
    const appSharedContext = React.useContext(AppSharedContext);
    useEffect(() => {
        fetchPc();
    }, []);

    const fetchPc = async () => {
        try {
            appSharedContext.toggleLoader(true);
            console.log(URLs.GET_PCS());
            const response = await axiosInstance.get(URLs.GET_PCS());
            if (response.data && response.data.items.length > 0) {
                console.log(response.data.items);
                setPC(response.data.items);
                return response;
            }
        } catch (error) {
            console.error('Error fetching PC:', JSON.stringify(error));
        }
        finally {
            appSharedContext.toggleLoader(false);
        }
    }

    const [form, setForm] = useState({ leaveReplacement: '' });
    const [updatedForm, setUpdatedForm] = useState(null);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onSearchUser = async (query, signal) => {
        console.log(query)
        loadUsers(query, null);
    }

    const loadUsers = async (term, signal) => {
        console.log(`https://sanaerp.com/apexor/sanaerp69/py/getEmployees/${auth.user.id}/${auth.user.compcode}/${term}`);
        const response = await axiosInstance.get(`https://sanaerp.com/apexor/sanaerp69/py/getEmployees/${auth.user.id}/${auth.user.compcode}/${term}`, {
            signal: signal
        }).then((result) => {
            console.log(result.data.items);
            setData(result.data.items);
            return result.data.items;
        }).catch((error) => {
            return [];
        });
    }

    const onRefresh = async () => {
        setRefreshing(true);
        const response = await fetchPc();
        console.log(response);
        setPC(response.data.items);
        setRefreshing(false);
    }

    return (<ScreenWrapper isScroll={true} refreshing={refreshing} onRefresh={''}>

        <View style={styles.scrollContainer}>
            <MutliSelectControl
                title={'Employee Search'}
                keyField={'emp'}
                titleField='replacementName'
                field={'leaveReplacement'}
                maxLimit={1}
                hasError={false}
                sheetTitle={'Employee Search'}
                emptyMessage='No Employees Found.'
                placeholder={'Search by typing minimum 3 chars...'}
                filterField={'emp'}
                filterQuery={onSearchUser}
                selectedData={null}
                updateSelectedData={null}
                data={data} snap={['90%']} form={form} updateForm={updatedForm}>
                {(item) => (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text>{item.emp}</Text>
                    </View>
                )}
            </MutliSelectControl>

            {pc.length > 0 &&
                <View style={{ paddingHorizontal: 0, paddingTop: 10, marginBottom: 10 }}>
                    <FlatList data={pc}
                        ref={flatListRef}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(data) => <IbtikarItem index={data.index} data={data.item} navigation={navigation} />}
                        onEndReachedThreshold={0.1}
                        scrollEnabled={false}
                        refreshControl={
                            <RefreshControl
                                enabled={true}
                                refreshing={false}
                                onRefresh={() => { fetchPc() }}
                            />
                        }
                    />
                </View>
            }
        </View>

    </ScreenWrapper>);
}

export default PCScreenWrapper;



const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    scrollContainer: {
        backgroundColor: '#fff', borderTopEndRadius: 30, borderTopStartRadius: 30,
        alignContent: 'center',
        flex: 1,
        padding: 15
    }
})