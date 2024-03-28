import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const InputWithButtonStyles = StyleSheet.create({

    button: {
        height: 38,
        backgroundColor: Colors.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'MuseoModerno-Bold',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        marginVertical: 0,
    },
});