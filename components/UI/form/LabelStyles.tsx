import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const LabelStyles = StyleSheet.create({
    labelContainer: {
        alignSelf: 'flex-start',
        marginLeft: 2
    },
    labelText: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingVertical: 8,
        color: Colors.primary,
        fontFamily: 'MuseoModerno-SemiBold'
    },
});