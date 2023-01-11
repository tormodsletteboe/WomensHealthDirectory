import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { TableRow, TableCell } from '@mui/material';


function AddEditForm() {
    
    // hooks
    const dispatch = useDispatch();
    const params = useParams();

    // selectors
    const resourceToEdit = useSelector(store => store.resourceToEdit);
    const columnNames = useSelector(store => store.columnNames);

    // update or add resource function, dispatches resourceToEdit object to either add or edit Saga
    function updateOrAddResource(evt) {
        evt.preventDefault();
        const updateDetailPayload = {...resourceToEdit, catId: params.catId, ageId: params.ageId, sectionName: params.sectionName}

        if (resourceToEdit.id === 0) {
            dispatch({ type: 'ADD_CATEGORY_DETAIL', payload: updateDetailPayload});
        } else {
            dispatch({ type: 'SAVE_DETAIL_UPDATE', payload: updateDetailPayload});
        }

        dispatch({ type: 'SET_RESOURCE_TO_EDIT', payload: {}});
    }

    return (
        <>
            <TableRow>
            <TableCell align="center">
                <TextField 
                multiline
                label={columnNames[0]}
                fullWidth={true}
                value={resourceToEdit.field01}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_FIELD',
                    payload: {field01: evt.target.value}
            })}/>
            </TableCell>
                <TableCell>
                    <TextField 
                    multiline   
                    fullWidth={true}
                    label={columnNames[1]}
                    value={resourceToEdit.field02}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_FIELD',
                        payload: {field02: evt.target.value}
                })}/>
            </TableCell>
            {/* conditional rendering for input fields 3 and 4, 
            based on number of fields in the in the resource being edited */}
            {Object.keys(resourceToEdit).length > 3 ? 
            <TableCell>
                <TextField 
                multiline
                fullWidth={true}
                label={columnNames[2]}
                    value={resourceToEdit.field03}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_FIELD',
                        payload: {field03: evt.target.value}
                })}/></TableCell>
            : null}
            {Object.keys(resourceToEdit).length > 4 ? 
                <TableCell>
                <TextField 
                    label={columnNames[3]}
                    multiline
                    fullWidth={true}
                    value={resourceToEdit.field04}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_FIELD',
                        payload: {field04: evt.target.value}
                })}/></TableCell>
            : null}
                <TableCell>
                    <Button variant="contained" size="small" 
                        onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: {}})}>
                        Cancel
                    </Button>
                </TableCell>
                <TableCell>
                    <Button variant="contained" size="small" type="submit"
                    onClick={updateOrAddResource}>
                        Save
                    </Button>
                </TableCell>
            </TableRow>
        
        </>
    );
}

export default AddEditForm;