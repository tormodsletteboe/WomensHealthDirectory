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
        dispatch({
            type: 'FETCH_SPECIFIC_CATEGORY_DETAIL',
            payload: {
                catId: params.catId,
                ageId: params.ageId,
				sectionName: params.sectionName
            }
        })
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
			objToAdd[newName] = ".";
		}

		console.log('new add object', objToAdd);

        dispatch({type: 'SET_RESOURCE_TO_EDIT', 
            payload: objToAdd})
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

        <h1>{params.sectionName}</h1>
        <section>
			<ul>
				{detailContent[0] && detailContent.map(x => (
					x.id === resourceToEdit.id ? 

					// addEditForm
					<AddEditForm key={x.id} />
					: 
					<li key={x.id}>{x.field01} | {x.field02} | {x.field03 ? x.field03 : null} | {x.field04 ? x.field04 : null}
						<button 
						onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: x})}>
							Edit
						</button>
						<button 
						onClick={(evt)=>{handleDelete(evt, x)}}>
							Delete
						</button>
					</li>
				))}
				<li> 
                    {/* Creates Add button
                    Clicking Add button will send a file with 3 empty lines to edit, 
                    and id will be the highest id in the specific resources reducer plus one
                    */}                    
                    <button type="button" onClick={(evt)=>{handleAddClick(evt)}}>
                    Add
                    </button> 
                    {/* conditional rendering to show/not show the add form */}
                { resourceToEdit.id === 0 ? <AddEditForm /> : null }
                </li>
			</ul>
        </section>
        </>
    );
}

export default AdminCategoryDetailView;