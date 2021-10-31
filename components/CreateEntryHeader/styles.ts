import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 10
    },
    leftContainer:{
        flex: 1,
        paddingHorizontal: 20
    },
    date:{
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    greeting: {
        fontSize:16,
        fontWeight: "600"
    },
    diaryname: {
        fontSize: 20,
        fontWeight: "700"
    }
})

export default styles