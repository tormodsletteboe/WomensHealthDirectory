import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function AdminPreventativeCare() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    // reducers
    const ageRanges = useSelector(store => store.ageRanges);
    const selectedAgeRange = useSelector(store => store.selectedAgeRange);
    const healthCategories = useSelector(store => store.healthCategories);

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
        console.log('in handleCategoryClick, id is', category.id);
        history.push(`./adminprevcare/${category.id}/ages/${selectedAgeRange}`);
    }

    const handleAgeSelection = (event) => {
        const newAgeRange = JSON.parse(event.target.value);
        dispatch({type: 'SET_SELECTED_AGE_RANGE', payload: newAgeRange})
    }

    return (
        <>
            <label htmlFor="ageRange"> Choose Your Age Range </label>
            <select name="ageRange" id="ageRangeSelect" 
                onChange={(event)=>handleAgeSelection(event)}>
                {ageRanges.map(ageRange => 
                (<option key={ageRange.id} 
                    value={JSON.stringify(ageRange)}
                    // value={{id: ageRange.id, text: `${ageRange.low} - ${ageRange.high}`}} 
                >
                    {ageRange.low} - {ageRange.high}
                </option>))}
                
            </select>
            <Button variant="contained" style={{backgroundColor:'#276359'}} 
                type="submit">
                Submit
            </Button>
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
            
        </>
    )
}

export default AdminPreventativeCare;