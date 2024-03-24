import { StyleSheet, Text, View } from "react-native";

export function Header(props) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontFamily: "MuseoModerno-Bold",
        backgroundColor: "white",

    },
    headerTitle: {
        color: "black",
        fontSize: 18,
        fontFamily: "MuseoModerno-Bold",
    }
});