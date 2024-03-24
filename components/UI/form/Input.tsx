import { TextInput, View } from "react-native";
import { InputStyles } from "./InputStyles";
import { useState } from "react";

interface InputProps {
    placeholder: string;
    onChangeText: any;
    inputState: any;
}

export const Input: React.FC<InputProps> = (props: any) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const { placeholder, onChangeText, inputState } = props;
    const [state] = inputState;
    return (
        <View style={isInputFocused ? InputStyles.inputContainerActive : InputStyles.inputContainer}>
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