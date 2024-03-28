import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const InputStyles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary,
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputContainerActive: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.heartColor,
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        shadowColor: Colors.heartColor,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    inputContainerActiveRed: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    inputs: {
        height: 36,
        marginLeft: 10,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        paddingRight: 10,
        textAlignVertical: 'top',
        fontFamily: 'MuseoModerno-Light',
    },

    multilineInput: {
        height: 90,
        marginLeft: 10,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        paddingRight: 10,
        marginTop: 8,
        textAlignVertical: 'top',
        fontFamily: 'MuseoModerno-Light',
    },
});