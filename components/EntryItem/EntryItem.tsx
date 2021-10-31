import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import styles from './styles'; 

export interface EntryItemProps{
    itemData : any
}

const EntryItem = (props: EntryItemProps) => {

    const {itemData} = props

    return (
        <Pressable style={styles.entryItemContainer}>
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
