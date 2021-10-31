import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { useRecoilState } from 'recoil'
import { userState } from '../../atom/userAtom'

const CreateEntryHeader = () => {

    const [currentDate, setCurrentDate] = useState<any>('')
    const [user, setUser] = useRecoilState<any>(userState)

    useEffect(() => {
        const todayDate = new Date
        const today = todayDate.toLocaleDateString()
        setCurrentDate(today)
    }, [])

    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
                <Text style={styles.greeting}>Dear</Text>
                <Text style={styles.diaryname}>{user.diaryname}</Text>
            </View>
            <View style={styles.date}>
                <Text>{currentDate}</Text>
            </View>
        </View>
    )
}

export default CreateEntryHeader
