import { useDispatch } from "react-redux";
import {useState} from 'react';

function PreventativeCare() {
    
    const dispatch = useDispatch();
    const [age, setAge] = useState('');

    const handleAgeChange  = (event) => {
        setAge(event.target.value);
    }

    const handleAgeFormSubmit = (event) => {
        console.log('in handleAgeFormSubmit');
        event.preventDefault();

        dispatchEvent({
            type: 'SEND_AGE',
            payload: age
        })

    }

    return(
    <>
    <h1>Recommended Screening Guidelines</h1>

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
    </>
    );

}

export default PreventativeCare;