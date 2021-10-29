import {StyleSheet, Platform, StatusBar} from 'react-native'

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "lightgrey",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})

export default styles