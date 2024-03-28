import { View, Image, ActivityIndicator, ImageStyle, ViewStyle, ImageSourcePropType } from "react-native";
import Colors from "../../../constants/Colors";
import { useState } from "react";
import Styles from "../../../constants/Styles";

interface CustomImageProps {
    source: ImageSourcePropType;
    containerStyle?: ViewStyle;
    style?: ImageStyle;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
    alt?: string;
    onImageError?: any;
}

export const CustomImage = ({ source, containerStyle, style, resizeMode, alt, onImageError }: CustomImageProps) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    return (
        <View style={[Styles.row as ViewStyle, containerStyle]} >
            <Image
                style={style}
                source={source}
                onLoad={() => setIsImageLoading(false)}
                alt={alt}
                onError={onImageError}
            />
            <ActivityIndicator
                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                animating={isImageLoading}
                size='large'
                color={Colors.primary}
            />
        </View>
    );
}