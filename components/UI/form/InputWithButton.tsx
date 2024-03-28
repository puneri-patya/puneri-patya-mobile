import { KeyboardAvoidingView, View, ViewStyle } from "react-native"
import { Input } from "./Input"
import { Button } from "./Button";
import { InputWithButtonStyles } from "./InputWithButtonStyles";
import Styles from "../../../constants/Styles";

interface InputWithButtonProps {
    placeholder: string;
    onChangeText: any;
    inputState: any;
    isLoading: boolean;
    label: string;
    variant: 'primary' | 'secondary';
    type?: string;
    onPress: any;
    style?: any
}

export const InputWithButton = (props: InputWithButtonProps) => {
    return (
        <KeyboardAvoidingView
            style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ ...Styles.column as ViewStyle, width: '85%' }}>
                <Input {...props} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            </View>
            <View style={{ ...Styles.column as ViewStyle, width: '15%' }}>
                <Button {...props} style={InputWithButtonStyles.button} />
            </View>
        </KeyboardAvoidingView>)
}