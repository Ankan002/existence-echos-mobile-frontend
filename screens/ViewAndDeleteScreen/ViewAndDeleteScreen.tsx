import React,{useState} from 'react'
import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native'
import styles from './styles'
import { useNavigation, useRoute } from '@react-navigation/core'
import ViewAndDeleteHeader from '../../components/ViewAndDeleteHeader'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { userEntriesState } from '../../atom/userEntriesAtom'
import { useRecoilState } from 'recoil'
import { APP_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ViewAndDeleteScreen = () => {

    const route = useRoute<any>()
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState<any>(false)
    const [userEntries, setUserEntries] = useRecoilState<any>(userEntriesState)

    const {entry}  = route.params

    const deleteTheEntry = async () => {
        const response = await fetch(`${APP_URL}/entry/delete/${entry._id}`, {
            method: 'DELETE',
            headers: {
                'auth-token' : await AsyncStorage.getItem('auth-token'),
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        if(data?.success === false){
            Alert.alert(
                "Error",
                data.message,
                [
                  { text: "Got It", onPress: () => console.log("OK Pressed"), style: "cancel" }
                ]
            );
    
            setIsLoading(false)
    
            return
        }

        const newUserEntries = userEntries.filter((userEntry: any) => userEntry._id !== entry._id)

        setUserEntries(newUserEntries)
        setIsLoading(false)
        navigation.navigate('Home')
    }

    const onDeleteClick = () => {
        if(isLoading){
            return
        }

        setIsLoading(true)

        Alert.alert(
            "Pay Attention",
            "You really want to tear this piece of memory",
            [
              {
                text: "Cancel",
                onPress: () => {
                    setIsLoading(false)
                    return
                },
                style: "cancel"
              },
              { text: "Confirm", onPress: () => deleteTheEntry() }
            ]
          );
    }

    const onBackClick = () => {
        if(isLoading){
            return
        }
        navigation.goBack()
    }

    return (
        <View style={styles.AndroidSafeArea}>
            <ViewAndDeleteHeader createdAtDate={entry.createdAt} />
            <View style={styles.wholeViewContainer}>
                <ScrollView
                    showsVerticalScrollIndicator = {false}
                    style={styles.entryBody}
                >
                    <Text style={styles.entryBodyInput}>{entry.entrybody}</Text>
                </ScrollView>
                <ScrollView
                    showsVerticalScrollIndicator = {false}
                    style={styles.significantEvent}
                >
                    <Text style={styles.significantEventInput}>{entry.significantevent}</Text>
                </ScrollView>
            </View>
            <View style={styles.operationDiv}>
                <Pressable onPress={onBackClick}>
                    <Ionicons name="caret-back-circle-outline" size={40} color="black" />
                </Pressable>
                {
                    (isLoading) ? (
                        <ActivityIndicator size="large" color="black" />
                    ) : (
                        <Pressable onPress={onDeleteClick}>
                            <MaterialIcons name="delete" size={40} color="black" />
                        </Pressable>
                    )
                }
            </View>
        </View>
    )
}

export default ViewAndDeleteScreen
