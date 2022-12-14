import { useDispatch, useSelector } from "react-redux";
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import './PreventativeCare.css';

function PreventativeCare() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [age, setAge] = useState('');
    const healthCategories = useSelector((store)=>{
        return store.healthCategories;
    })
    const ageRanges = useSelector((store)=>{
        return store.ageRanges;
    })
    console.log('age ranges is', ageRanges);

    
    useEffect(() => {
        dispatch({
            type: 'FETCH_USER_AGE'
        });
        dispatch({
            type: 'FETCH_AGE_RANGES'
        })
    }, []);

    const handleAgeChange  = (event) => {
        setAge(event.target.value);
    }
    console.log('age is', age);

    const handleAgeFormSubmit = (event) => {
        console.log('in handleAgeFormSubmit');
        event.preventDefault();

        dispatch({
            type: 'FETCH_HEALTH_CATEGORIES'
        })

    }
    
    //When a category is clicked, it will go to a detail view of the id of the button clicked
    const handleCategoryClick = (category) => {
        console.log('in handleCategoryClick, id is',category.id);
        history.push(`./preventativecare/${category.id}/ages/${age}`);

    }

    return(
    <>
    <h4>Recommended Screening Guidelines</h4>

    <form onSubmit={handleAgeFormSubmit}>
            <select name="agerange" id="ageRangeSelect" onChange={handleAgeChange}>
                <option defaultValue="Choose Your Age Range">Choose Your Age Range</option>
            {ageRanges.map(ageRange =>
                (<option key={ageRange.id} value={ageRange.id}>
                    {ageRange.low} - {ageRange.high}
                </option>
                 ))}
            </select>
            <Button variant="contained" style={{backgroundColor:'#276359'}} type="submit">Submit</Button>
    </form>
    
    {healthCategories.map(category => (
    <ul key={category.id}>
        <li><Button variant="contained" onClick={() => handleCategoryClick(category)} style={{backgroundColor: '#8EBBA7', color: '#FFFFFF'}}>{category.category}</Button></li>
    </ul>
    ))}
    </>
    );

}

export default PreventativeCare;