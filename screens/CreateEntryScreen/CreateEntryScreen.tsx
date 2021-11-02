import React, {useState} from 'react'
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import styles from './styles'
import { useRecoilState } from 'recoil'
import { userEntriesState } from '../../atom/userEntriesAtom'
import CreateEntryHeader from '../../components/CreateEntryHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';  
import { APP_URL } from '@env'

const CreateEntryScreen = () => {

    const [userEntries, setUserEntries] = useRecoilState<any>(userEntriesState)
    const [entryBody, setEntryBody] = useState<any>('')
    const [significantEvent, setSignificantEvent] = useState<any>('')
    const [isLoading, setIsLoading] = useState<any>(false)
    const navigation = useNavigation()

    const createTheEntry = async () => {
        const response = await fetch(`${APP_URL}/entry/create`, {
            method: 'POST',
            headers: {
                'auth-token' : await AsyncStorage.getItem('auth-token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                entrybody: entryBody,
                significantevent: significantEvent
            })
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

        setUserEntries([data].concat(userEntries))
        setIsLoading(false)
        navigation.navigate('Home')
    }

    const onCreateClick = () => {
        if(isLoading){
            return
        }

        setIsLoading(true)

        if(entryBody.trim().length < 40){
            Alert.alert(
                "Invalid Entry Body",
                `The length of the Entry Body must be at least 40 characters long. Your current length is ${entryBody.trim().length}`,
                [{text: "Got it", onPress: () => console.log('Got it'), style:"cancel"}]
            )
            setIsLoading(false)
            return
        }

        if(significantEvent.trim().length > 80){
            Alert.alert(
                "Invalid Significant Event",
                `The length of the Significant Event must be at most 80 characters long. Your current length is ${significantEvent.trim().length}`,
                [{text: "Got it", onPress: () => console.log('Got it'), style:"cancel"}]
            )
            setIsLoading(false)
            return
        }

        createTheEntry()
    }

    const onBackClick = () => {
        if(isLoading){
            return
        }
        navigation.goBack()
    }

    return (
        <SafeAreaView 
            style={styles.AndroidSafeArea}
        >
            <CreateEntryHeader />
            <KeyboardAvoidingView
                style={styles.inputsContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
            >
                <TextInput
                    numberOfLines={18}
                    style={styles.entryBody}
                    multiline
                    placeholder="Enter the body here"
                    value={entryBody}
                    onChangeText={(text) => setEntryBody(text)}
                />

                <TextInput
                    style={styles.significantEvent} 
                    multiline
                    numberOfLines={9}
                    placeholder="Today's Significant Event"
                    value={significantEvent}
                    onChangeText = {(text) => setSignificantEvent(text)}
                />
            </KeyboardAvoidingView>
            <View style={styles.operationDiv}>
                <Pressable onPress={onBackClick}>
                    <Ionicons name="caret-back-circle-outline" size={40} color="black" />
                </Pressable>
                {
                    (isLoading) ? (
                        <ActivityIndicator size="large" color="black" />
                    ) : (
                        <Pressable onPress={onCreateClick}>
                            <MaterialIcons name="done" size={40} color="black" />
                        </Pressable>
                    )
                }
            </View>
        </SafeAreaView>
    )
}

export default CreateEntryScreen
