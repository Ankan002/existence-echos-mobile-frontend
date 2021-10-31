import React from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useRecoilState } from 'recoil';
import { themeState } from '../../atom/themeAtom';
import { useNavigation } from '@react-navigation/native';

const HomeFooter = () => {

    const [theme, setTheme] = useRecoilState<any>(themeState)
    const navigation = useNavigation()

    const themeAdjuster = async () => {
        if(theme === 'light'){
            setTheme('dark')
            await AsyncStorage.setItem('theme', 'dark')
        }
        else{
            setTheme('light')
            await AsyncStorage.setItem('theme', 'light')
        }
    }

    const onThemeButtonClick = () => {
        themeAdjuster()
    }

    const onCreateEntryClick = () => {
        navigation.navigate('CreateEntry')
    }

    return (
        <View style={styles.mainContainer}>
            <Pressable onPress={onThemeButtonClick}>
                {
                    (theme === 'light') ? (
                        <Feather name="moon" size={24} color="black" />
                    ) : (
                        <Feather name="sun" size={24} color="black" />
                    )
                }
            </Pressable>
            <Pressable onPress={onCreateEntryClick}>
                <FontAwesome name="plus" size={24} color="black" />
            </Pressable>
        </View>
    )
}

export default HomeFooter
