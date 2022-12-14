import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

function AdminSpecificResources() {

    // hooks
    const dispatch = useDispatch();

    const params = useParams();

    // selectors
    const specificResources = useSelector(store => store.specificResources);
    const resourceToEdit = useSelector(store => store.resourceToEdit);

    // fetch specific resources
    useEffect(() => {
        dispatch({ type: 'FETCH_SPECIFIC_RESOURCES', payload: params.categoryId });
    }, [params.categoryId]);

    // functions
    const updateResource = (evt) => {
        evt.preventDefault();
        dispatch({ type: 'SAVE_RESOURCE_UPDATE', payload: resourceToEdit});
        alert('edit submitted');
        dispatch({ type: 'SET_RESOURCE_TO_EDIT', payload: {}});
    }

    return (
        <>
            <h1>Specific Resources</h1>
            <ul className="specificResources">
                {specificResources.map(x => (
                    x.id === resourceToEdit.id ? 
                    
                    <form onSubmit={updateResource}
                    key={resourceToEdit.id}>
                    <input 
                        value={resourceToEdit.name}
                        onChange={(evt) => dispatch({
                            type: 'UPDATE_FIELD',
                            payload: {name: evt.target.value}
                    })}/>
                    <input 
                        value={resourceToEdit.description}
                        onChange={(evt) => dispatch({
                            type: 'UPDATE_FIELD',
                            payload: {description: evt.target.value}
                    })}/>
                    <input 
                        value={resourceToEdit.link}
                        onChange={(evt) => dispatch({
                            type: 'UPDATE_FIELD',
                            payload: {link: evt.target.value}
                    })}/>
                    <button onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: {}})}>Cancel</button>
                    <button type="submit">Save</button>
                </form>

                    : 
                    <li key={x.id}><a href={x.link}>{x.name}</a> {x.description} 
                        <button 
                        onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: x})}>
                        Edit
                        </button>
                    </li>
                ))}
            </ul>

        </>
    )
}

export default AdminSpecificResources;