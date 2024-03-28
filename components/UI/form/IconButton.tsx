import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IconButtonProps {
    onPress: any;
    iconName: any;
    iconSize: number;
    iconColor: string;
    style?: any;
}
export const IconButton = ({ onPress, iconName, iconSize, iconColor, style }: IconButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
    );
}