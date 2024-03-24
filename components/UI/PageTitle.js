import { Image, StyleSheet, Text, View } from "react-native";
import Styles from "../../constants/Styles";

export function PageTitle(props) {
    return <>

        <View style={Styles.titleContainer}>
            {props.title === 'Puneri Patya.com' ? <Image source={require('../../assets/logo.png')} style={styles.logo} /> :
                <Text style={Styles.firstLetterPageTitle}>{props.title.substring(0, 1)}<Text style={Styles.pageTitle}>{props.title.substring(1)}</Text></Text>}
        </View>
    </>;
}

const styles = StyleSheet.create({
    logo: {
        width: 145,
        height: 50,
        resizeMode: 'contain',
        marginLeft: -10,
        marginTop: -15
    },
});