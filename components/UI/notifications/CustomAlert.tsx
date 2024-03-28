import { Alert } from "react-native";

export const YesNoAlert = (title: string, message: string, onYes: any, onNo?: any) => {
    Alert.alert(title, message,
        [
            { text: 'No', style: 'cancel', onPress: onNo },
            { text: 'Yes', style: 'destructive', onPress: onYes }
        ]
    );
}

export const OkAlert = (title: string, message: string, onOk: any) => {
    Alert.alert(title, message,
        [
            { text: 'Ok', style: 'cancel', onPress: onOk },
        ]
    );
}