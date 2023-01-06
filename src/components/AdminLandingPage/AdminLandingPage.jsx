import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CSVLink } from "react-csv";

import { Button, Stack, Typography, List, ListItem, Divider, Box, Container } from '@mui/material';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

function AdminLandingPage() {
    // hooks
    const dispatch = useDispatch();

	// selectors
	const newsletterEmails = useSelector(store => store.newsletterEmails);
	
	const headers = [{ label: "Email Address", key: "email" }]
	const [heading, setHeading] = useState('Admin Landing Page');
	const [isEmailListClicked, setClicked] = useState(false);
	const [isEditorClicked, setEditorClicked] = useState(false);

	useEffect(() => {
		dispatch({type: 'FETCH_NEWSLETTER_EMAILS'})
	}, []);

	function handleEmailClick() {
		setClicked(!isEmailListClicked);
		// console.log('clicked?', isEmailListClicked)
	}

	function handleEditorClick() {
		setEditorClicked(!isEditorClicked);
		// console.log('clicked?', isEditorClicked)
	}

	return (
		<>
			<Typography component="h1" variant="h3" align="center" m="20px">Welcome, Laina!</Typography>
			<Box m='10px' display='flex' 
			alignItems="center" justifyContent="center"
			flexDirection="column">
				{ isEmailListClicked === true ?

					<Button variant="contained" color="primary" buttontext="white" marginBottom='10px'
					sx={{width: '400px', }}
					onClick={handleEmailClick}
					> 
						Close Newsletter Sign-up Emails
					</Button>
				:
				
					<Button variant="contained" color="primary"
					sx={{width: '400px'}}
					onClick={handleEmailClick}
					> 
						View Newsletter Sign-up Emails
					</Button> 
				
				}
				{ isEmailListClicked === true ?
				<List>
				{ newsletterEmails.map(x => (
					<>
					<ListItem key={x.id}>{x.email}</ListItem>
					<Divider variant="inset" component="li" />
					</>
				))}
				</List>
				: null }
				
				<Button variant="contained" color="primary" 
				sx={{width: '400px'}}>
					<CSVLink 
						data={newsletterEmails} 
						headers={headers} 
						filename={"newsletter-emails.csv"}
					>
					Download Newsletter Emails Addresses
					</CSVLink>
				</Button>
			{ isEditorClicked === false ?
				<Button variant="contained" sx={{width: '400px'}}
				onClick={handleEditorClick}>Write Newsletter</Button> 
				: null}
			</Box>
			{ isEditorClicked === true ?
			<Box margin="20px 0px" display='flex' 
			alignItems="center" justifyContent="center"
			flexDirection="column">
				<SunEditor name='newsletter-editor' 
					defaultValue=""
					placeholder="Newsletter editor - add your text here..."
					width='60%' height='400px'
					autoFocus={true}
				/>
			<Button variant='outlined'
			onClick={handleEditorClick}>Cancel</Button>
			</Box>
			: 
			null}	
			
		</>
	);
}

export default AdminLandingPage;
