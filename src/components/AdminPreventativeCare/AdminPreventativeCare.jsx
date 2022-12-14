import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AdminPreventativeCare() {

    const dispatch = useDispatch();
    const history = useHistory();

    // stores
    const ageRanges = useSelector(store => store.ageRanges);

    // state vars
    const [age, setAge] = React.useState('');

    const params = useParams();
    console.log(params);
    
    // fetch age ranges
    useEffect(() => {
        dispatch({ type: 'FETCH_AGE_RANGES' });
    }, []);

    // fetch categories
    useEffect(() => {
        dispatch({ type: 'FETCH_HEALTH_CATEGORIES' });
    }, []);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <label htmlFor="ageRange"> Choose Your Age Range </label>
            <select name="ageRange" id="ageRangeSelect" onChange={handleChange}>
                {ageRanges.map(ageRange => 
                (<option key={ageRange.id} value={`${ageRange.low} - ${ageRange.high}`} 
                // onClick={(handleChange)}
                // onClick={(event)=>setAge(ageRange.low)}
                >
                    {ageRange.low} - {ageRange.high}
                </option>))}
            </select>
            <button type="submit">Submit</button>

            <h2>{age}</h2>
            
        </>
    )
}

export default AdminPreventativeCare;