/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import { authenticatedState } from '../atom/authenticatedAtom';
import { useRecoilState } from 'recoil';
import { themeState } from '../atom/themeAtom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateDiaryNameScreen from '../screens/UpdateDiaryNameScreen';
import CreateEntryScreen from '../screens/CreateEntryScreen';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState)
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authenticatedState)

  const getAuthenticationToken = async () => {
    try{
      const value = await AsyncStorage.getItem('auth-token')
      if(value!==null){
        setIsAuthenticated(true)
      }
    }
    catch(e){
      console.log(e)
    }
  }

  const getCurrentTheme = async () => {
    try{
      const themeValue = await AsyncStorage.getItem('theme')
      if(themeValue === null){
        setCurrentTheme('light')
        await AsyncStorage.setItem('theme', 'light')
      }
      else{
        setCurrentTheme(themeValue)
      }
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    getAuthenticationToken()
    getCurrentTheme()
  }, [])

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={(currentTheme === 'dark') ? DarkTheme : DefaultTheme}>
        {
          isAuthenticated ? (
            <RootNavigator />
          ) : (
            <AuthenticationNavigator />
          )
        }
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthenticationNavigator() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
      <Stack.Screen name="UpdateDiaryName" component={UpdateDiaryNameScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateEntry" component={CreateEntryScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

