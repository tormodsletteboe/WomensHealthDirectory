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
	const [isClicked, setClicked] = useState(false);;

	useEffect(() => {
		dispatch({type: 'FETCH_NEWSLETTER_EMAILS'})
	}, []);

	function handleEmailClick() {
		setClicked(!isClicked);
		console.log('clicked?', isClicked)
	}

	return (
		<>
			<Typography component="h1" variant="h3" align="center" m="20px">Welcome, Laina!</Typography>
			<Box m='10px' display='flex' 
			alignItems="center" justifyContent="center"
			flexDirection="column">
				{ isClicked === true ?

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
				{ isClicked === true ?
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
				
			</Box>
			<Box margin="20px 0px" display='flex' 
			alignItems="center" justifyContent="center"
			flexDirection="column">
				<SunEditor name='newsletter-editor' 

					width='60%'
				/>
			<Button>Cancel</Button>
			</Box>
		</>
	);
}

export default AdminLandingPage;
