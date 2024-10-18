import React, { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import axiosInstance from "../auth/services/axios.interceptor";
import URLs from "../shared/constants/URLs";
import ScreenWrapper from "../shared/components/screen-wrapper";
import { theme } from "../shared/theme";
import { IconButton } from "../shared/ui/buttons";
import Textbox from "../shared/ui/textboxes.control";
import IbtikarItem from "./components/project-item";
import { AppSharedContext } from "../shared/redux/app-shared.context";

const ProjectScreenWrapper = ({navigation}) => {
    return <ProjectScreen navigation={navigation} />;
};

const ProjectScreen = ({ navigation }) => {
    const flatListRef = useRef(null);
    const [project, setProject] = useState([]);
    const appSharedContext = React.useContext(AppSharedContext);
    useEffect(() => {
        fetchProject();
    }, []);

    const fetchProject = async () => {
        try {
            appSharedContext.toggleLoader(true);
            console.log(URLs.GET_PROJECTS());
            const response = await axiosInstance.get(URLs.GET_PROJECTS());
            if (response.data && response.data.items.length > 0) {
                console.log(response.data.items);
                setProject(response.data.items);
            }
        } catch (error) {
            console.error('Error fetching project:', JSON.stringify(error));
        }
        finally {
            appSharedContext.toggleLoader(false);
        }   
    }

    return (<ScreenWrapper isScroll={false} refreshing={''} onRefresh={''}>

        {project.length > 0 &&
            <View style={{ paddingHorizontal: 15, paddingTop: 10, marginBottom: 70 }}>
                <FlatList data={project}
                    ref={flatListRef}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(data) => <IbtikarItem index={data.index} data={data.item} navigation={navigation} />}
                    onEndReachedThreshold={0.1}
                    refreshControl={
                        <RefreshControl
                            enabled={true}
                            refreshing={false}
                            onRefresh={() => { fetchProject() }}
                        />
                    }
                />
            </View>
        }
    </ScreenWrapper>);
}

export default ProjectScreenWrapper;


