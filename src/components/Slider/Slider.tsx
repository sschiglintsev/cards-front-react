import React, { useState } from 'react'
import s from './Slider.module.css';
import Slider from '@mui/material/Slider';
import { useAppDispatch } from '../../Redux/hooks';
import { SetMinMaxAC } from '../../Redux/ProfileReducer';

const SliderComponent = () => {
    const [value, setValue] = useState<number[]>([0, 130]);
    let dispatch = useAppDispatch();

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleMouseUp = (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => {
            dispatch(SetMinMaxAC(newValue as number[]));
    }

    function valuetext(value: number) {
        return `${value}`;
    }

    return (
        <div className={s.Slider}>
            <Slider
                onChangeCommitted={handleMouseUp}
                max={130}
                min={0}
                getAriaLabel={() => 'Number of cards'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext} />
        </div>
    )
}

export default SliderComponent;