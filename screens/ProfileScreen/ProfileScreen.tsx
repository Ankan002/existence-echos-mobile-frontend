import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useRecoilState } from 'recoil'
import { authenticatedState } from '../../atom/authenticatedAtom'
import styles from './styles'

const ProfileScreen = () => {

    const [isAuthenticated, setIsAuthenticated] = useRecoilState(authenticatedState)

    const signOut = async () => {
        try{
            await AsyncStorage.removeItem('auth-token')
            setIsAuthenticated(false)
        }
        catch(e){
            console.log(e)
        }
    }

    const onSignOutClick = () => {
        signOut()
    }

    return (
        <View>
            <Text></Text>
            <Pressable onPress={onSignOutClick}>
                <Text>Sign Out</Text>
            </Pressable>
        </View>
    )
}

export default ProfileScreen
