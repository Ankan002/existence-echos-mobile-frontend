import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import styles from './styles'

const homeScreen = () => {
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <Text>Hello</Text>
        </SafeAreaView>
    )
}

export default homeScreen
