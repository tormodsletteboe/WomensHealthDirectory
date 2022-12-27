import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import AddEditForm from "../AdminAddEditForm/AdminAddEditForm";

import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

function AdminCategoryDetailView() {

    // hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    // selectors
    const selectedAgeRange = useSelector(store => store.selectedAgeRange);
    const detailContent = useSelector(store => store.categoryDetail);
	const resourceToEdit = useSelector(store => store.resourceToEdit);

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
        }
        
        // call the function
        fetchData()
        .catch(console.error);
        
    }, [params]);

    // functions
    const handleAddClick = () => {
		
		// calculate how many fields to show in the add form
		const newObjectItemsNumber = (Object.keys(detailContent[0]).length) - 1;
		console.log('new add object fields', newObjectItemsNumber);

		// create object and add in empty fields based on the above number
		let objToAdd = {id: 0};

		for (let i = 1; i <= newObjectItemsNumber; i++ ){
			let newName = 'field0' + i;
			objToAdd[newName] = "add your text";
		}

		console.log('new add object', objToAdd);

        dispatch({type: 'SET_RESOURCE_TO_EDIT', 
            payload: objToAdd})
    }

    const handleDelete = (evt, x) => {
        evt.preventDefault();
        // console.log('deleting x', x);
        dispatch({type: 'DELETE_CATEGORY_DETAIL', 
            payload: {id: x.id, catId: params.catId, ageId: params.ageId, sectionName: params.sectionName}});
        
    }

    // MUI Breadcrumbs
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
        // <Link
        //   underline="hover"
        //   key="2"
        //   color="inherit"
        //   href={`/#/adminprevcare/${params.catId}/ages/${params.ageId}`}
        // >
        //   Age Range {selectedAgeRange.low} - {selectedAgeRange.high}
        // </Link>,
		<Typography key="3" color="text.primary">
			Age Range {selectedAgeRange.low} - {selectedAgeRange.high}
		</Typography>,
        <Typography key="3" color="text.primary">
            Category: {params.sectionName}
        </Typography>,
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

        <Typography align="center" component="h1" variant="h3">{params.sectionName}</Typography>
        <section>
			<List>
				{detailContent[0] && detailContent.map(x => (
					x.id === resourceToEdit.id ? 

					// addEditForm
					<AddEditForm key={x.id} />
					: 
					<ListItem key={x.id}>
                        <Typography variant="body1">{x.field01} </Typography>
                        <Typography variant="body2">{x.field02} </Typography>
                        <Typography>{x.field03 ? x.field03 : null} </Typography>
                        <Typography>{x.field04 ? x.field04 : null}
                        </Typography>
						<Button variant="contained" size="small"
						onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: x})}>
							Edit
						</Button>
						<Button variant="contained" size="small"
						onClick={(evt)=>{handleDelete(evt, x)}}>
							Delete
						</Button>
					</ListItem>
				))}
				<li> 
                    {/* Creates Add button
                    Clicking Add button will send a file with 3 empty lines to edit, 
                    and id will be the highest id in the specific resources reducer plus one
                    */}                    
                    <Button variant="contained" size="small" align="center"
                        onClick={(evt)=>{handleAddClick(evt)}}>
                    Add
                    </Button> 
                    {/* conditional rendering to show/not show the add form */}
                { resourceToEdit.id === 0 ? <AddEditForm /> : null }
                </li>
			</List>
        </section>
        </>
    );
}

export default AdminCategoryDetailView;