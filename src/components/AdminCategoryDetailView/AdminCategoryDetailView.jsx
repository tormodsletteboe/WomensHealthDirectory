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
import Container from "@mui/material/Container";

import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';


function AdminCategoryDetailView() {

    // hooks
    const dispatch = useDispatch();
    const params = useParams();

    // selectors
    const selectedAgeRange = useSelector(store => store.selectedAgeRange);
    const detailContent = useSelector(store => store.categoryDetail);
	const resourceToEdit = useSelector(store => store.resourceToEdit);
    const columnNames = useSelector(store => store.columnNames);

    useEffect(() => {

        const fetchData = async () => {
            // get the data from the api
            await dispatch({type: 'FETCH_SELECTED_AGE_RANGE', payload: params.ageId});
            
            
            await dispatch({
                    type: 'FETCH_SPECIFIC_CATEGORY_DETAIL',
                    payload: {
                        catId: params.catId,
                        ageId: params.ageId,
                        sectionName: params.sectionName
                    }})
            
            await dispatch({
                type: `SET_COLUMN_NAMES_${params.sectionName}`
            })
        }
        
        // call the function
        fetchData()
        .catch(console.error);
        
    }, [params]);

    // functions
    const handleAddClick = () => {
		
		// calculate how many fields to show in the add form, based on the health category selected
		const newObjectItemsNumber = (Object.keys(detailContent[0]).length) - 1;

		// create object and add in empty fields based on the above number
		let objToAdd = {id: 0};
        let columnName = Object.keys(detailContent[0])
		for (let i = 1; i <= newObjectItemsNumber; i++ ){
            let newName = columnName[i];
			objToAdd[newName] = "";
		}

        dispatch({type: 'SET_RESOURCE_TO_EDIT', 
            payload: objToAdd})
    }

    const handleDelete = (evt, x) => {
        evt.preventDefault();
        dispatch({type: 'DELETE_CATEGORY_DETAIL', 
            payload: {id: x.id, catId: params.catId, ageId: params.ageId, 
                sectionName: params.sectionName}});
    }

    // MUI 
    // MUI theme
    const theme = createTheme({
        typography: {
          detailField01: {
            fontWeight: 'bold',
          },
        },
        palette: {
            type: 'light',
            primary: {
              main: '#8EBBA7',
            },
            secondary: {
              main: 'rgb(99, 130, 116)',
            },
            text: {
              primary: '#000000',
              secondary: '#ffffff',
            },
            error: {
              main: '#d63a2f',
            }
        }
    });
      
    // Breadcrumbs
    const breadcrumbs = [
        <Link underline="hover" 
        key="1" color="black" 
        href="/">
          Admin
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="black"
          href="/#/adminprevcare"
        >
          Preventative Care
        </Link>,
		<Typography key="3" color="text.primary">
			Age Range {selectedAgeRange.low} - {selectedAgeRange.high}
		</Typography>,
        <Typography key="3" color="text.primary">
            Category: {params.sectionName}
        </Typography>,
    ];

    return (
        <>
        <ThemeProvider theme={theme}>
        {/* MUI Breadcrumbs */}
        <Stack spacing={2} ml={5}>
            <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ color: "black", marginLeft: "10px" }}
            className="breadcrumbs"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
        <Container maxWidth="xl" sx={{marginTop:"20px"}}>
            <Typography  align="center" component="h1" variant="h3">{params.sectionName}</Typography>
            <section>
            <TableContainer>
            <TableRow>
                <TableCell><Typography variant="detailField01">{columnNames[0]} </Typography></TableCell> 
                <TableCell><Typography variant="body2">{columnNames[1]} 
                    </Typography>
                </TableCell>
                    {detailContent[0] && Object.keys(detailContent[0]).length > 3 ? <TableCell><Typography>{columnNames[2]}</Typography></TableCell> : null} 
                    {detailContent[0] && Object.keys(detailContent[0]).length > 4 ? <TableCell><Typography>{columnNames[3]}</Typography></TableCell> : null}
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
            </TableRow>
        <TableBody m={2} pt={3} sx={{border: '1px', borderColor: 'black'}}>
				{detailContent[0] && detailContent.map(x => (
					x.id === resourceToEdit.id ? 

					// addEditForm
					<AddEditForm key={x.id} />
					: 
					<TableRow key={x.id} sx={{ width: '100%' }}>
                        <TableCell><Typography variant="detailField01">{x.field01} </Typography></TableCell>
                        <TableCell><Typography variant="body2">{x.field02} </Typography></TableCell>
                        {x.field03 ? <TableCell><Typography>{x.field03}</Typography></TableCell> : null} 
						{x.field04 ? <TableCell><Typography>{x.field04}</Typography></TableCell> : null}
                        <TableCell>
                        <Button variant="contained" size="small" color="primary" 
						onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: x})}>
							Edit
						</Button></TableCell>
						<TableCell><Button variant="contained" size="small" color="error"
						onClick={(evt)=>{handleDelete(evt, x)}}>
							Delete
						</Button></TableCell>
					</TableRow>
				))}
                {/* conditional rendering to show/not show the add form */}

                { resourceToEdit.id === 0 ? <AddEditForm /> : 
                	<TableRow> 
                    <TableCell align="center" colSpan={6}>
                    {/* Creates Add button
                    Clicking Add button will send a file with empty lines to edit, 
                    and id will be zero
                    */}                    
                     <Button variant="contained" size="small"
                    onClick={(evt)=>{handleAddClick(evt)}}>
                    Add
                    </Button>
                    </TableCell>
                    </TableRow>   }
            </TableBody>
            </TableContainer>
        </section>
        </Container>
        </ThemeProvider>
        </>
    );
}

export default AdminCategoryDetailView;