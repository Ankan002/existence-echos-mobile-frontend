import React, {useEffect, useState} from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import { userState } from '../../atom/userAtom'
import { FontAwesome } from '@expo/vector-icons'; 
import { loadingState } from '../../atom/loadingAtom'

const HomeHeader = () => {

    const [greeting, setGreeting] = useState('')
    const [user, setUser] = useRecoilState<any>(userState)
    const [isLoading, setIsLoading] = useRecoilState(loadingState)
    const navigation = useNavigation()

    const timeFinder = () => {
        const today = new Date()
        const time = today.getHours()
        console.log(time)

        if(time >= 22){
            setGreeting('Good Night')
        }
        else if(time >= 5 && time < 12){
            setGreeting('Good Morning')
        }
        else if(time >= 12 && time < 17){
            setGreeting('Good Afternoon')
        }
        else if(time >= 17 && time < 22){
            setGreeting('Good Evening')
        }
        else if(time < 5){
            setGreeting('Good Night')
        }
    }

    useEffect(() => {
        timeFinder()
    })

    const onProfileIconClick = () => {
        if(isLoading){
            return
        }
        navigation.navigate('Profile')
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
                <Text style={styles.greeting}>{greeting}</Text>
                <Text style={styles.userName}>{user.firstname}</Text>
            </View>
            <Pressable style={styles.button} onPress={onProfileIconClick}>
                <FontAwesome name="user" size={24} color="black" />
            </Pressable>
        </View>
    )
}

export default HomeHeader
