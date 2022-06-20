import React from 'react';
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";

export const Test = () => {
    return (
        <div>
            <SuperInputText placeholder={'Text'}/>
            <SuperButton>Button</SuperButton>
            <SuperCheckbox/>
        </div>
    );
};
