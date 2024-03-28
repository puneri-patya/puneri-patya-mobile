import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const StyledTextStyles = StyleSheet.create({
    title: {
        fontFamily: 'MuseoModerno-SemiBold',
        fontSize: 16,
    },
    subTitle: {
        fontFamily: 'MuseoModerno-Light',
        fontSize: 13,
        color: "#888",
        display: 'flex',
        marginVertical: 5,
        marginTop: -2,
    },
    primarySubTitle: {
        fontFamily: 'MuseoModerno-Light',
        fontSize: 13,
        color: Colors.primary,
        display: 'flex',
        marginVertical: 5,
        marginTop: -2,
    },
    smallTitle: {
        fontFamily: 'MuseoModerno-SemiBold',
        fontSize: 13,
    },
    smallSubTitle: {
        fontSize: 11,
        color: "#505050",
        fontFamily: 'MuseoModerno-Light',
        marginTop: -5,
    },
    normal: {
        fontFamily: 'MuseoModerno-Regular',
        fontSize: 14,
        marginTop: 8
    },

});