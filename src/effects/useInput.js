import React, { useState } from 'react';
import styled from 'styled-components';

const TextInput = styled.input`
    width: 100%;
    padding: 12px 20px;
    color: black;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
`;

const useInput = ({ 
    type, 
    placeholder, 
    variant = 'rounded',
    outline = 'inherit',
    onChangeCallback = false,
    onPressEnter = false,
    inputMargin = false
}) => {
    const [value, setValue] = useState("");

    const input = (
        <TextInput 
                style={{
                    borderRadius: variant === 'rounded' ? '4px' : 0,
                    outline,
                    margin: inputMargin ? inputMargin : 0
                }}
                value={value} 
                onChange={e => {
                    const newValue = e.target.value;
                    (onChangeCallback) &&
                        onChangeCallback(newValue)
                    setValue(newValue)
                }}
                onKeyDown={e => {
                    (e.key === 'Enter' && onPressEnter) && onPressEnter()
                }}
                type={type}
                placeholder={placeholder}
            />
    )

    return [value, input, setValue];
}

export default useInput;