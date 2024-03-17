import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";

export function TabBarButton(props) {
    return (
        <TouchableOpacity
            style={styles.tabBarButtonContainer}
            onPress={props.onPress}
        >
            <View style={props.accessibilityState.selected ? styles.activeTabBarButton : styles.tabBarButton}>
                {props.children}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tabBarButtonContainer: {
        marginBottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    activeTabBarButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: 4,
        borderRadius: 80,
        width: 80,
        marginTop: 0
    }
});
