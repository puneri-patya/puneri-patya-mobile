import { Text, View } from "react-native";
import { LabelStyles } from "./LabelStyles";

interface LabelProps {
    label: string;
}

export const Label: React.FC<LabelProps> = (props: any) => {
    const { label } = props;
    return (
        <View style={LabelStyles.labelContainer}>
            <Text {...props} style={LabelStyles.labelText}>{label}</Text>
        </View>
    );
}