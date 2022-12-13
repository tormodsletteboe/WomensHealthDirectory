import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AdminPreventativeCare() {

    const dispatch = useDispatch();

    // stores
    const ageRanges = useSelector(store => store.ageRanges);

    // state vars
    const [age, setAge] = React.useState('');

    // fetch age ranges
    useEffect(() => {
        dispatch({ type: 'FETCH_AGE_RANGES' });
    }, []);

    // fetch categories


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <label for="ageRange"> Choose Your Age Range </label>
            <select name="ageRange" id="ageRangeSelect">
                {ageRanges.map(ageRange => 
                (<option key={ageRange.id} value={`{ageRange.low} - {ageRange.high}`}>
                    {ageRange.low} - {ageRange.high}
                </option>))}
            </select>
        </>
    )
}

export default AdminPreventativeCare;