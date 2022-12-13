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

    //fetch user's age on page load to autofill form with user's age
    //TODO: update database (add user_id foreign key to healthcategory table), create new saga function and reducer
    //add GET router to user router
    useEffect(() => {
        dispatch({
            type: 'FETCH_USER_AGE'
        });
    }, []);

    const handleAgeChange  = (event) => {
        setAge(event.target.value);
    }

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
        history.push(`./preventativecare/${category.id}`);
    }

    return(
    <>
    <h4>Recommended Screening Guidelines</h4>

    <form onSubmit={handleAgeFormSubmit}>
                <select onChange={handleAgeChange}>
                    <option defaultValue="0">Select Age</option>
                    <option value="15-19" >15-19</option>
                    <option value="20-24" >20-24</option>
                    <option value="25-29" >25-29</option>
                    <option value="30-34">30-34</option>
                    <option value="35-39">35-39</option>
                    <option value="40-44">40-44</option>
                    <option value="45-49">45-49</option>
                    <option value="50-54">50-54</option>
                    <option value="55-59">55-59</option>
                    <option value="60-64">60-64</option>
                    <option value="65-69">65-69</option>
                    <option value="">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
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