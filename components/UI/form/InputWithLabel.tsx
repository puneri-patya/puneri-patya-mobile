import React, { useState } from "react";
import { Label } from "./Label";
import { Input } from "./Input";

interface InputWithLabelProps {
    placeholder: string;
    onChangeText: any;
    inputState: any;
    label: string;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = (props: any) => {
    const { label } = props;
    return (
        <>
            <Label label={label} />
            <Input {...props} />
        </>
    );
};