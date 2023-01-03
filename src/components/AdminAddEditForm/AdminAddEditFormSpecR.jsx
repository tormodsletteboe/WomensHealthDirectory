import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

function AddEditFormSpecR() {
    
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
        <>
        <form onSubmit={updateOrAddResource}
            key={resourceToEdit.id}>
            <input 
                value={resourceToEdit.field01}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_FIELD',
                    payload: {field01: evt.target.value}
            })}/>
            {resourceToEdit.field02 ? 
                <input 
                    value={resourceToEdit.field02}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_FIELD',
                        payload: {field02: evt.target.value}
                })}/>
            : null}
            {resourceToEdit.field03 ? 
                <input 
                    value={resourceToEdit.field03}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_FIELD',
                        payload: {field03: evt.target.value}
                })}/>
            : null}
            {resourceToEdit.field04 ? 
                <input 
                    value={resourceToEdit.field04}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_FIELD',
                        payload: {field04: evt.target.value}
                })}/>
            : null}
            
            <button onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: {}})}>
                Cancel
            </button>
            <button type="submit">Save</button>
        </form>
        </>
    );
}

export default AddEditFormSpecR;