import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import AddEditForm from "../AdminAddEditForm/AdminAddEditForm";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TextField from '@mui/material/TextField';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

function AdminSpecificResources() {

    // hooks
    const dispatch = useDispatch();

    const params = useParams();

    // selectors
    const specificResources = useSelector(store => store.specificResources);
    const resourceToEdit = useSelector(store => store.resourceToEdit);

    // fetch specific resources
    useEffect(() => {
        dispatch({ type: 'FETCH_SPECIFIC_RESOURCES', payload: {categoryId: params.categoryId} });
        
    }, [params.categoryId]);

    // functions
    const handleAddClick = () => {
        dispatch({type: 'SET_RESOURCE_TO_EDIT', 
            payload: 
            {id: 0, 
            name: 'name', description: 'description', link: 'link url', catId: params.categoryId}})
    }

    const handleDelete = (evt, x) => {
        evt.preventDefault();
        // console.log('deleting x', x);
        dispatch({type: 'DELETE_RESOURCE', 
            payload: {id: x.id, categoryId: params.categoryId}});
        
    }

     const addEditForm =  (                   
    //     <form 
          <TableRow key={resourceToEdit.id}>
                <TableCell align="center"><TextField 
                multiline
                value={resourceToEdit.name}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_FIELD',
                    payload: {name: evt.target.value}
                })}/></TableCell>
                <TableCell align="center"><TextField 
                multiline
                value={resourceToEdit.description}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_FIELD',
                    payload: {description: evt.target.value}
                })}/></TableCell>
                <TableCell align="center"><TextField 
                multiline
                value={resourceToEdit.link}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_FIELD',
                    payload: {link: evt.target.value}
                })}/></TableCell>
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

             //* <input  */}
    //             value={resourceToEdit.name}
    //             onChange={(evt) => dispatch({
    //                 type: 'UPDATE_FIELD',
    //                 payload: {name: evt.target.value}
    //         })}/>
    //         <input 
    //             value={resourceToEdit.description}
    //             onChange={(evt) => dispatch({
    //                 type: 'UPDATE_FIELD',
    //                 payload: {description: evt.target.value}
    //         })}/>
    //         <input 
    //             value={resourceToEdit.link}
    //             onChange={(evt) => dispatch({
    //                 type: 'UPDATE_FIELD',
    //                 payload: {link: evt.target.value}
    //         })}/>
    //         <button onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: {}})}>
    //             Cancel
    //         </button>
    //         <button type="submit" onClick={updateOrAddResource}>Save</button>
    )

    function updateOrAddResource(evt) {
        evt.preventDefault();
        const updateDetailPayload = {...resourceToEdit, categoryId: params.categoryId, sectionName: params.sectionName}
        console.log(updateDetailPayload);

        if (resourceToEdit.id === 0) {
            dispatch({ type: 'ADD_RESOURCE', payload: updateDetailPayload});
        } else {
            dispatch({ type: 'SAVE_RESOURCE_UPDATE', payload: updateDetailPayload});
        }

        dispatch({ type: 'SET_RESOURCE_TO_EDIT', payload: {}});
    }

    // Breadcrumbs
    const breadcrumbs = [
        <Link underline="hover" 
        key="1" color="inherit" 
        href="/">
          Admin
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="/#/adminprevcare"
        >
          Preventative Care
        </Link>,
        <Typography key="3" color="text.primary">
            Category: Specific Resources
        </Typography>
    ];
    

    return (
        <> 
            {/* MUI Breadcrumbs */}
            <Stack spacing={2}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>

            <Typography align="center" component="h1" variant="h3">
                Specific Resources
            </Typography>
            <TableContainer>
            <TableBody className="specificResources">
                {specificResources.map(x => (
                    x.id === resourceToEdit.id ? 

                    addEditForm
                    : 
                    <TableRow key={x.id}>
                        <TableCell><a href={x.link}>{x.name}</a></TableCell>
                        <TableCell>{x.description} </TableCell> 
						<TableCell><Button variant="contained" size="small" color="primary"
						onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: x})}>
							Edit
						</Button></TableCell>
                        <TableCell><Button variant="contained" size="small" color="error"
						onClick={(evt)=>{handleDelete(evt, x)}}>
							Delete
						</Button></TableCell>
                    </TableRow>
                ))}
                
                    {/* Creates Add button
                    Clicking Add button will send a file with 3 empty lines to edit, 
                    and id will be the highest id in the specific resources reducer plus one
                    */}                    
                    {/* conditional rendering to show/not show the add form */}
                { resourceToEdit.id === 0 ? addEditForm : 
                    <TableRow> 
                    <TableCell align="center" colSpan={6}>
                    {/* Creates Add button
                    Clicking Add button will send a file with 3 empty lines to edit, 
                    and id will be zero
                    */}                    
                    <Button variant="contained" size="small"
                    onClick={(evt)=>{handleAddClick(evt)}}>
                    Add
                    </Button>
                    </TableCell>
                    </TableRow>
                }
                
            </TableBody>
            </TableContainer>
        </>
    )
}

export default AdminSpecificResources;