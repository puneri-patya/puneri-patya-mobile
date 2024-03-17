import { Text, View } from "react-native";
import Styles from "../../constants/Styles";

export function PageTitle(props) {
    return (
        <View style={Styles.titleContainer}>
            <Text style={Styles.firstLetterPageTitle}>{props.title.substring(0, 1)}<Text style={Styles.pageTitle}>{props.title.substring(1)}</Text></Text>
        </View>
    );
}