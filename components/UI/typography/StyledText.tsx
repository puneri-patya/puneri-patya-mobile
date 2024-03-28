import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Styles from '../../../constants/Styles';
import { StyledTextStyles } from './StyledTextStyles';

interface StyledTextProps {
    text: string;
    varient: 'title' | 'subTitle' | 'primarySubTitle' | 'smallTitle' | 'smallSubTitle' | 'normal';
    style?: ViewStyle;
    children?: any;
}

export const StyledText = ({ text, varient, style, children }: StyledTextProps) => (
    <View style={{ ...Styles.row, ...style } as ViewStyle}>
        <Text style={StyledTextStyles[varient]}>{text}{children}</Text>
    </View>
);