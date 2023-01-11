import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './PreventativeCare.css';

function PreventativeCare() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [age, setAge] = useState('');
    const healthCategories = useSelector((store) => {
        return store.healthCategories;
    })
    const ageRanges = useSelector((store) => {
        return store.ageRanges;
    })


    useEffect(() => {
        dispatch({
            type: 'FETCH_USER_AGE'
        });
        dispatch({
            type: 'FETCH_AGE_RANGES'
        })
    }, []);


    const handleAgeChange = (event) => {
        setAge(event.target.value);
        dispatch({
            type: 'FETCH_HEALTH_CATEGORIES'
        })
    }

    //Fetch health categories based on age range clicked
    const handleAgeFormSubmit = (event) => {
        event.preventDefault();

        dispatch({
            type: 'FETCH_HEALTH_CATEGORIES'
        })

    }

    //When a health category button is clicked, display a detail view of that health category
    const handleCategoryClick = (category) => {
        history.push(`./preventativecare/${category.id}/ages/${age}`);
    }

    return (
        <>
            <Box textAlign='center'>
                <h4>Screening Recommended by Age</h4>

                <form onSubmit={handleAgeFormSubmit}>
                    <select name="agerange" id="ageRangeSelect" onChange={handleAgeChange}>
                        <option defaultValue="Choose Your Age Range">Choose Your Age Range</option>
                        {/* drop down list of age ranges for user to select from */}
                        {ageRanges.map(ageRange =>
                        (<option key={ageRange.id} value={ageRange.id}>
                            {ageRange.low} - {ageRange.high}
                        </option>
                        ))}
                    </select>
                </form>
            </Box>

            <Box textAlign='center' marginRight='3rem'>
                {/* render health category buttons */}
                {healthCategories.map(category => (
                    <ul key={category.id}>
                        <li>
                            <Button
                                variant="contained"
                                onClick={() => handleCategoryClick(category)}
                                style={{ backgroundColor: '#8EBBA7' }}>
                                {category.category}
                            </Button>
                        </li>
                    </ul>
                ))}
            </Box>
        </>
    );

}

export default PreventativeCare;