import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

interface ButtonProps {
    onPress: any;
    iconName: any;
    iconSize: number;
    iconColor: string;
    style?: any;
    labelPosition?: 'left' | 'right';
    label: string;
    labelStyle?: TextStyle;
    containerStyle?: TextStyle;
}

export const IconButtonWithLabel = ({ label, onPress, iconName, iconColor, iconSize, style, labelPosition, containerStyle, labelStyle }: ButtonProps) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1, ...(containerStyle || style) }} onPress={onPress}>
            {labelPosition === 'left' ? <Text style={{ paddingEnd: 8, ...(labelStyle || style) }}>{label}</Text> : null}
            <IconButton onPress={onPress} iconName={iconName} iconColor={iconColor} iconSize={iconSize} />
            {labelPosition === 'right' ? <Text style={{ paddingStart: 8, ...(labelStyle || style) }}>{label}</Text> : null}
        </TouchableOpacity>
    );
}