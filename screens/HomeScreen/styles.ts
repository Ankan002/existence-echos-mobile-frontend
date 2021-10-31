import {StyleSheet, Platform, StatusBar} from 'react-native'

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#F4F9F9",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    Loader: {
        flexGrow : 1,
        backgroundColor: "#F4F9F9",
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyImage: {
        width: 200,
        height: 200
    },
    flatListStyle: {
        margin: 10,
        flexGrow: 1
    }
})

export default styles