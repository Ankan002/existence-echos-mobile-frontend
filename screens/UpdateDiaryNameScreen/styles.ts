import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#F4F9F9",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems: 'center',
    },
    heading:{
        fontSize: 25,
        marginTop: 70,
        fontWeight: "700",
        color: "#9D9D9D"
    },
    textInputs: {
        width: '80%',
        backgroundColor: 'white',
        marginVertical: 10,
        height: 50,
        borderRadius: 50,
        paddingHorizontal: 10,
        color: "#91C788",
        marginTop: 40
    },
    buttonText: {
        fontSize: 18,
        color: "#F4F9F9"
    },
    changeConfirmButton: {
        backgroundColor: "#91C788",
        width: '50%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 50
    },
    backButton: {
        backgroundColor: "#867AE9",
        width: '50%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 50,
        marginBottom: 50,
    },
    backRedirectSection: {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
})

export default styles