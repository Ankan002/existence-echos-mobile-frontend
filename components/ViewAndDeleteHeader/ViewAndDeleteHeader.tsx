import React from 'react'
import { View, Text } from 'react-native'
import { useRecoilState } from 'recoil'
import { userState } from '../../atom/userAtom'
import styles from './styles'

export interface ViewAndDeleteHeaderProps {
    createdAtDate: string
}

const ViewAndDeleteHeader = (props: ViewAndDeleteHeaderProps) => {

    const [user, setUser] = useRecoilState<any>(userState)
    const {createdAtDate} = props
    const created = createdAtDate.substr(0,10).split("-").reverse().join("-")

    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
                <Text style={styles.greeting}>Dear</Text>
                <Text style={styles.diaryname}>{user.diaryname}</Text>
            </View>
            <View style={styles.date}>
                <Text>{created}</Text>
            </View>
        </View>
    )
}

export default ViewAndDeleteHeader
