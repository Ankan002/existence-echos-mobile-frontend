import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useEffect} from 'react'
import { View, Text, Pressable } from 'react-native'
import { useRecoilState } from 'recoil'
import { authenticatedState } from '../../atom/authenticatedAtom'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { userState } from '../../atom/userAtom'
import ProfileInfoBlock from '../../components/ProfileInfoBlock'
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles'
import { userEntriesState } from '../../atom/userEntriesAtom'

const ProfileScreen = () => {

    const [isAuthenticated, setIsAuthenticated] = useRecoilState(authenticatedState)
    const [user, setUser] = useRecoilState<any>(userState)
    const [userEntries, setUserEntries] = useRecoilState<any>(userEntriesState)

    const numberOfUserEntries = userEntries.length

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

    const fields = ["First Name"]

    return (
        <View style={styles.mainContainer}>
            {/* <FontAwesome5 name="user-circle" size={80} color="black" style={{marginVertical: 40}} /> */}
            <ProfileInfoBlock field="Name" value={user.firstname+ " " + user.lastname} editable={false} />
            <ProfileInfoBlock field="Username" value={user.username} editable={false} />
            <ProfileInfoBlock field="Diary Name" value={user.diaryname} editable={true} />
            <ProfileInfoBlock field="Total Entries" value={numberOfUserEntries} editable={false} />
            <View style={styles.signOutSection}>
                <Pressable onPress={onSignOutClick}  >
                    <Ionicons name="ios-log-out-outline" size={60} color="black" styles={styles.button} />
                </Pressable>
            </View>
        </View>
    )
}

export default ProfileScreen
