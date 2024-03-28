import { Text, View, ViewStyle } from "react-native";
import { LabelStyles } from "./LabelStyles";

interface LabelProps {
    label: string;
    varient?: string;
}

export const Label: React.FC<LabelProps> = (props: any) => {
    const { label } = props;
    const v = props.varient || 'primary';
    const style = (v === 'secondary' ? LabelStyles.secondary : LabelStyles.primary);
    return (
        <View style={LabelStyles.labelContainer}>
            <Text {...props} style={[LabelStyles.labelText, style as ViewStyle]}>{label}</Text>
        </View>
    );
}