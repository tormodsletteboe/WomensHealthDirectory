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
    const detailContent = useSelector(store => store.categoryDetail);

    // update or add resource function
    function updateOrAddResource(evt) {
        evt.preventDefault();
        const updateDetailPayload = {...resourceToEdit, catId: params.catId, ageId: params.ageId, sectionName: params.sectionName}
        console.log(updateDetailPayload);

        if (resourceToEdit.id > detailContent[detailContent.length-1].id) {
            dispatch({ type: 'ADD_CATEGORY_DETAIL', payload: updateDetailPayload});
        } else {
            dispatch({ type: 'SAVE_DETAIL_UPDATE', payload: updateDetailPayload});
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

export default AddEditForm;