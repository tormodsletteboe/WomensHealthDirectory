import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

function AddEditForm() {
    
    // hooks
    const dispatch = useDispatch();

    const params = useParams();

    // selectors
    const specificResources = useSelector(store => store.specificResources);
    const resourceToEdit = useSelector(store => store.resourceToEdit);

    // update or add resource function
    function updateOrAddResource(evt) {
        evt.preventDefault();
        const updateResoursePayload = {...resourceToEdit, categoryId: params.categoryId}
        console.log(updateResoursePayload);

        if (resourceToEdit.id > specificResources[specificResources.length-1].id) {
            dispatch({ type: 'ADD_RESOURCE', payload: updateResoursePayload});
        } else {
            dispatch({ type: 'SAVE_RESOURCE_UPDATE', payload: updateResoursePayload});
        }

        dispatch({ type: 'SET_RESOURCE_TO_EDIT', payload: {}});
    }

    return(
        <form onSubmit={updateOrAddResource}
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
            <button onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: {}})}>
                Cancel
            </button>
            <button type="submit">Save</button>
        </form>
    );
}

export default AddEditForm;