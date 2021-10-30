import { StyleSheet } from "react-native";

const styles= StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginVertical: 10
    },
    field: {
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 50,
        marginRight: 5
    },
    value: {
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 50,
        flexGrow: 1,
        marginRight: 5
    },
    fieldText: {
        paddingHorizontal: 10,
        fontWeight: "700"
    },
    valueText: {
        paddingHorizontal: 10
    },
    iconContainer:{
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 50,
    },
    icon: {
        paddingHorizontal: 10
    }
})

export default styles