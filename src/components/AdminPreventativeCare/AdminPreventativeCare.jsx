import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function AdminPreventativeCare() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    // reducers
    const ageRanges = useSelector(store => store.ageRanges);
    const selectedAgeRange = useSelector(store => store.selectedAgeRange);
    const healthCategories = useSelector(store => store.healthCategories);
    const selectedHealthCategory = useSelector(store => store.selectedHealthCategory);

    // state vars
    const [age, setAge] = React.useState('');
    

    useEffect(() => {

        // fetch age ranges
        dispatch({ type: 'FETCH_AGE_RANGES' });

        // fetch categories
        dispatch({ type: 'FETCH_HEALTH_CATEGORIES' });
    }, []);


    // functions
    // when a category is clicked, it will go to a detail view of the id of the button clicked
    const handleCategoryClick = (category) => {
        dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
        // history.push(`/adminprevcare/${category.id}/ages/${selectedAgeRange.id}`);
    }

    const handleAgeSelection = (event) => {
        const newAgeRange = JSON.parse(event.target.value);
        dispatch({type: 'SET_SELECTED_AGE_RANGE', payload: newAgeRange})
    }

    // MUI Breadcrumbs

    const breadcrumbs = [
        <Link underline="hover" 
        key="1" color="inherit" 
        href="/">
          Admin
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="/#/adminprevcare"
        >
          Preventative Care
        </Link>,
      ];

    return (
        <>
        {/* MUI Breadcrumbs */}
        <Stack spacing={2}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>

            <label htmlFor="ageRange"> Choose Your Age Range </label>
            <select name="ageRange" id="ageRangeSelect" 
                onChange={(event)=>handleAgeSelection(event)}>
                {ageRanges.map(ageRange => 
                (<option key={ageRange.id} 
                    value={JSON.stringify(ageRange)}
                >
                    {ageRange.low} - {ageRange.high}
                </option>))}
                
            </select>
            <section>
                <ul>
                    {healthCategories.map(category => (
                        <li key={category.id}>
                            <Button 
                                onClick={() => handleCategoryClick(category)}
                                variant="contained"  
                                style={{backgroundColor: '#8EBBA7', color: '#FFFFFF'}}>
                                    {category.category}
                            </Button>
                        </li>))}
                </ul>
            </section>
            { selectedHealthCategory.id ? 
            <Button>
                Diagnostic Tools
            </Button>
            : 
            null}
        </>
    )
}

export default AdminPreventativeCare;