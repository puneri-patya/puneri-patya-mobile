import { TextInput, View, ViewStyle } from "react-native";
import { InputStyles } from "./InputStyles";
import { useState } from "react";

interface InputProps {
    placeholder: string;
    onChangeText: any;
    inputState: any;
    style: ViewStyle;
}

export const Input: React.FC<InputProps> = (props: any) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const { placeholder, onChangeText, inputState, style } = props;
    const [state] = inputState;
    return (
        <View style={[isInputFocused ? InputStyles.inputContainerActive : InputStyles.inputContainer, style]}>
            <TextInput
                {...props}
                style={props.multiline ? InputStyles.multilineInput : InputStyles.inputs}
                placeholder={placeholder}
                underlineColorAndroid="transparent"
                value={state}
                onChangeText={onChangeText}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            />
        </View>
    );
}