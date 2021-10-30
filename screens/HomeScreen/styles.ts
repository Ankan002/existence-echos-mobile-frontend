import {StyleSheet, Platform, StatusBar} from 'react-native'

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "lightgrey",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    Loader: {
        flexGrow : 1,
        backgroundColor: "lightgrey",
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyImage: {
        width: 200,
        height: 200
    },
    flatListStyle: {
        margin: 10
    }
})

export default styles