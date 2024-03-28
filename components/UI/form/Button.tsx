import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ButtonStyles } from './ButtonStyles';
import Colors from '../../../constants/Colors';
interface ButtonProps {
    isLoading: boolean;
    label: string;
    variant: 'primary' | 'secondary';
    type?: string;
    onPress: any;
    style?: any;
    round?: boolean;
}

export const Button: React.FC<ButtonProps> = (props: any) => {
    const { isLoading, onPress, label, round } = props;
    const t = props.type || 'button';
    const r = round ? ButtonStyles.rounded : {};

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...ButtonStyles.container, ...(ButtonStyles[props.variant as keyof typeof ButtonStyles]), ...r, ...props.style }}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={t === 'button' ? ButtonStyles.text : ButtonStyles.blackText}>{label}</Text>
            )}
        </TouchableOpacity>
    );
};
