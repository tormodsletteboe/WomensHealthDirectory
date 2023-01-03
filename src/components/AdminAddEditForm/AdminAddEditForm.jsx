import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';


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

        if (resourceToEdit.id === 0) {
            dispatch({ type: 'ADD_CATEGORY_DETAIL', payload: updateDetailPayload});
        } else {
            dispatch({ type: 'SAVE_DETAIL_UPDATE', payload: updateDetailPayload});
        }

        dispatch({ type: 'SET_RESOURCE_TO_EDIT', payload: {}});
    }

    // const addList = (resourceToEdit) => {
    //     let inputList = [];
    //     for (const [key, value] of Object.entries(resourceToEdit)) {
    //         console.log(`${key}: ${value}`);
    //         inputList.push(<TextField 
    //             key={key}
    //             multiline
    //             value={resourceToEdit.value}
    //             onChange={(evt) => dispatch({
    //                 type: 'UPDATE_FIELD',
    //                 payload: {key: evt.target.value}
    //         })}/>)
    //         }
    //     inputList.shift();
    //     return inputList;
    // }

    return(
        <>
        <form onSubmit={updateOrAddResource}
            >
            {/* {addList(resourceToEdit)} */}
            <TableRow>
            <TableCell align="center"><TextField 
                multiline
                value={resourceToEdit.field01}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_FIELD',
                    payload: {field01: evt.target.value}
            })}/></TableCell>
            {resourceToEdit.field02 && 
                <TableCell>
                <TextField 
                    multiline   
                    value={resourceToEdit.field02}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_FIELD',
                        payload: {field02: evt.target.value}
                })}/></TableCell>
            }
            {resourceToEdit.field03 ? 
            <TableCell>
                <TextField 
                multiline
                    value={resourceToEdit.field03}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_FIELD',
                        payload: {field03: evt.target.value}
                })}/></TableCell>
            : null}
            {resourceToEdit.field04 ? 
                <TableCell>
                <TextField 
                    multiline
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
                    <Button variant="contained" size="small" type="submit">
                        Save
                    </Button>
                </TableCell>
            </TableRow>
        </form>
        </>
    );
}

export default AddEditForm;