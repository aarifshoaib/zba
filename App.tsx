import { Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from './src/auth/redux/auth.context';
import AppMain from './AppMain';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ToastProvider } from 'react-native-toast-notifications'
import SplashScreen from './src/shared/screens/splash.screen';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { AuthContext } from './src/auth/redux/auth.context';
import AppSharedContextProvider from './src/shared/redux/app-shared.context';

// Keep the splash screen visible while we fetch resources



export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [mode, setMode] = useState('dark');
  const authContext = useContext(AuthContext);

  
  const [fontsLoaded, fontError] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'AdportsBold': require('./assets/fonts/ADPortsGroup-Bold.otf'),
    'AdportsRegular': require('./assets/fonts/ADPortsGroup-Regular.otf'),
    'AdportsThin': require('./assets/fonts/ADPortsGroup-Light.otf'),

  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setTimeout(() => {
          setAppIsReady(true);
          setMode('dark');
        }, 3000);
      }
    }

    prepare();
  }, [appIsReady]);

  useEffect(() => {
    if (authContext.user != null) {
      setMode('light');
    }
  }, [authContext.user])
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      
    }
  }, [appIsReady]);


  return (
    <AuthContextProvider>
      <ToastProvider
        successColor="#78B16A"
        dangerColor="#BF5858"
        swipeEnabled={true}
        warningColor="#D99766"
        placement="top"
        duration={4000}
        animationType="slide-in"
      >
        <AppSharedContextProvider>
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1, }}>
              <BottomSheetModalProvider>
                <StatusBar style={(mode) == 'dark' ? 'light' : 'dark'} />
                {!appIsReady && <SplashScreen onLayoutRootView={onLayoutRootView} />}
                {fontsLoaded && appIsReady && <AppMain />}
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NavigationContainer>
        </AppSharedContextProvider>
      </ToastProvider>
    </AuthContextProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
