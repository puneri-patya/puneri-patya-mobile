import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import Styles from '../../../constants/Styles';
import { SeparatorStyles } from './SeparatorStyles';

interface SeparatorProps {
    varient: 'primary';
}

export const Separator = ({ varient }: SeparatorProps) => (
    <View style={Styles.row as ViewStyle}>
        <Text style={SeparatorStyles[varient]}></Text>
    </View>
);