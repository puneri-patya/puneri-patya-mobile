import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const ButtonStyles = StyleSheet.create({
    container: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
        width: '100%',
        backgroundColor: 'transparent',
    },
    rounded: {
        borderRadius: 8,
    },
    button: {
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        elevation: 10,
    },
    roundedShadow: {
        shadowRadius: 12.35,
    },
    primary: {
        backgroundColor: Colors.primary,
    },
    secondary: {
        backgroundColor: Colors.secondary,
    },
    text: {
        color: 'white',
        fontFamily: 'MuseoModerno-SemiBold'
    },

    blackText: {
        color: 'black',
        fontFamily: 'MuseoModerno-SemiBold'
    },
});