import React, {useEffect, useState} from 'react'
import { View, Text, SafeAreaView, ActivityIndicator, FlatList, Image } from 'react-native'
import styles from './styles'
import HomeHeader from '../../components/HomeHeader'
import { useRecoilState } from 'recoil'
import { userState } from '../../atom/userAtom'
import { APP_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadingState } from '../../atom/loadingAtom'
import { userEntriesState } from '../../atom/userEntriesAtom'
import EntryItem from '../../components/EntryItem'
import HomeFooter from '../../components/HomeFooter'
const emptyImage = require('../../assets/images/empty.png')

const homeScreen = () => {

    const [user, setUser] = useRecoilState(userState)
    const [isLoading, setIsLoading] = useRecoilState(loadingState)
    const [userEntries, setUserEntries] = useRecoilState(userEntriesState)

    const getUserFromDatabase = async () => {
        setIsLoading(true)
        const response = await fetch(`${APP_URL}/user/getuser`, {
            method: 'GET',
            headers: {
                'auth-token': (await AsyncStorage.getItem('auth-token'))?.toString(),
                'Content-Type' : 'application/json'
            }
        })

        const data = await response.json()

        setUser(data)
    }

    const getUserAllEntries = async () => {
        const response = await fetch(`${APP_URL}/entry/getentries/userid`, {
            method: 'GET',
            headers: {
                'auth-token': await AsyncStorage.getItem('auth-token'),
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        setUserEntries(data)
        setIsLoading(false)
    }

    useEffect(() => {
        getUserFromDatabase()
        getUserAllEntries()
    }, [])

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <HomeHeader />
            {
                (isLoading) ? (
                    <View style={styles.Loader}>
                        <ActivityIndicator size="large" color="black" />
                    </View>
                    
                ) : 
                (
                    <>
                    {
                        (userEntries.length === 0) ? (
                            <>
                            <View style={styles.Loader}>
                                <Image source={emptyImage} style={styles.emptyImage} />
                            </View>
                            <HomeFooter />
                            </>
                        ) : (
                            <>
                            <FlatList
                                data={userEntries}
                                renderItem={({item, index}) => <EntryItem itemData={item} key={index} />}
                                keyExtractor={(item) => item._id}
                                // showsVerticalScrollIndicator= {false}
                                style={styles.flatListStyle}
                            />
                            <HomeFooter/>
                            </>
                        )
                    }
                    </>
                )
            }
        </SafeAreaView>
    )
}

export default homeScreen
