import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#F4F9F9",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    wholeViewContainer: {
        flexGrow: 1,
        marginHorizontal: 10,
        marginTop: 30
    },
    entryBody: {
        backgroundColor: 'white',
        textAlignVertical: 'top',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        height: 220,
        fontSize: 17
    },
    significantEvent: {
        backgroundColor: 'white',
        textAlignVertical: 'top',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        fontSize: 16
    },
    entryBodyInput: {
        fontSize: 17,
    },
    significantEventInput: {
        fontSize: 16
    },
    operationDiv: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default styles