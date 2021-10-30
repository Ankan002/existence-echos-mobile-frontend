import React from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import { useNavigation } from '@react-navigation/core';

export interface ProfileInfoBlockProp {
    field: any,
    value: any,
    editable: boolean
}

const ProfileInfoBlock = (props: ProfileInfoBlockProp) => {

    const {field, value, editable} = props
    const navigation = useNavigation()

    const onEditButtonClick = () => {
        if(editable && field === 'Diary Name'){
            navigation.navigate('UpdateDiaryName')
        }
        else{
            return
        }
    }

    return (
        <View style={styles.container}>
            <View style= {styles.field}>
                <Text style={styles.fieldText} >{field}</Text>
            </View>
            <View style= {styles.value}>
                <Text style={styles.valueText}>{value}</Text>
            </View>
            <Pressable style={styles.iconContainer} onPress={onEditButtonClick}>
                {
                    (editable) ? (
                        <MaterialCommunityIcons name="pencil" size={24} color="black" style={styles.icon} />
                    ) : (
                        <MaterialCommunityIcons name="pencil-off" size={24} color="gray" style={styles.icon} />
                    )
                }
            </Pressable>
            
        </View>
    )
}

export default ProfileInfoBlock
