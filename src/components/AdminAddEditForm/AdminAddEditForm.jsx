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
    const columnNames = useSelector(store => store.columnNames);

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

    return(
        <>
            {/* {addList(resourceToEdit)} */}
            <TableRow>
            {/* <form> */}
            <TableCell align="center"><TextField 
                multiline
                label={columnNames[0]}
                fullWidth={true}
                value={resourceToEdit.field01}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_FIELD',
                    payload: {field01: "Pap smear"}
            })}/></TableCell>
                <TableCell>
                <TextField 
                    multiline   
                    fullWidth={true}
                    label={columnNames[1]}
                    value={resourceToEdit.field02}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_FIELD',
                        payload: {field02: "aka Pap screening test, a sample is collected during a speculum exam with a brush. Sample is sent to the lab and reviewed under a microscope by a cytologist."}
                })}/></TableCell>
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
                {/* </form> */}
            </TableRow>
        
        </>
    );
}

export default AddEditForm;