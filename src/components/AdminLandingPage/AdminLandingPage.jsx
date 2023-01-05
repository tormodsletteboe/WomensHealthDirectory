import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CSVLink } from "react-csv";

import { Button, Stack, Typography, List, ListItem, Divider } from '@mui/material';

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

			<Typography component="h1" variant="h3">Welcome, Laina!</Typography>
			<Stack spacing={2}>
				{ isClicked === true ?
				<List>
					<Button variant="contained" color="primary"
					onClick={handleEmailClick}
					> 
						Close Newsletter Sign-up Emails
					</Button>
				{ newsletterEmails.map(x => (
					<>
					<ListItem key={x.id}>{x.email}</ListItem>
					<Divider variant="inset" component="li" />
					</>
				))}
				</List>
				:
					<Button variant="contained" color="primary"
					onClick={handleEmailClick}
					> 
						View Newsletter Sign-up Emails
					</Button> 
				}
				<Button variant="contained" color="primary">
					<CSVLink 
						data={newsletterEmails} 
						headers={headers} 
						filename={"newsletter-emails.csv"}
					>
					Download Newsletter Emails Addresses
					</CSVLink>
				</Button>
			</Stack>
		</>
	);
}

export default AdminLandingPage;
