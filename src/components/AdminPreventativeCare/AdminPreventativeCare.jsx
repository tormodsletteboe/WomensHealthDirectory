import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

function AdminPreventativeCare() {

    const dispatch = useDispatch();

    const ageRanges = useSelector(store => store.ageRanges);

    // fetch age ranges
    useEffect(() => {
        dispatch({ type: 'FETCH_AGE_RANGES' });
    }, []);


    // fetch categories


    return (
        <>
            <p>age ranges</p>

        </>
    )
}

export default AdminPreventativeCare;