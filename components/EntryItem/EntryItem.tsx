import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import styles from './styles'; 
import { useNavigation } from '@react-navigation/core';

export interface EntryItemProps{
    itemData : any
}

const EntryItem = (props: EntryItemProps) => {

    const {itemData} = props

    const navigation = useNavigation<any>()

    const onItemPress = () => {
        navigation.navigate('ViewAndDelete', {entry: itemData})
    }

    return (
        <Pressable style={styles.entryItemContainer} onPress={onItemPress}>
            <View style={styles.leftLogoContainer}>
                <Entypo name="book" size={30} color="black" />
            </View>
            <View style={styles.rightContainer}>
                <Text>{itemData.createdAt.substr(0, 10)}</Text>
                <Text numberOfLines={1} >{itemData.entrybody}</Text>
            </View>          
        </Pressable>
    )
}

export default EntryItem
