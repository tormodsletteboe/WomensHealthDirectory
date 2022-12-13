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
    <h2>Recommended Screening Guidelines</h2>

    <form onSubmit={handleAgeFormSubmit}>
                <select onChange={handleAgeChange}>
                    <option defaultValue="0">Select Age</option>
                    <option value="31" >30</option>
                    <option value="32" >31</option>
                    <option value="33" >32</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                </select>
                <button type="submit">Submit</button>
    </form>
    
    {healthCategories.map(category => (
    <ul key={category.id}>
        <li><Button variant="contained" onClick={() => handleCategoryClick(category)} style={{backgroundColor: '#8EBBA7', color: '#FFFFFF' }}>{category.category}</Button></li>
    </ul>
    ))}
    

    </>
    );

}

export default PreventativeCare;