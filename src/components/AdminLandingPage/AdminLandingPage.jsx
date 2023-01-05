import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CSVLink, CSVDownload } from "react-csv";

import { Button, Stack } from '@mui/material';

function AdminLandingPage() {
    // hooks
    const dispatch = useDispatch();

	// selectors
	const newsletterEmails = useSelector(store => store.newsletterEmails);
	
	const headers = [{ label: "Email Address", key: "email" }]
	const [heading, setHeading] = useState('Admin Landing Page');

	useEffect(() => {
		dispatch({type: 'FETCH_NEWSLETTER_EMAILS'})
	}, []);


	return (
		<>
			<h2>{heading}</h2>
			<Stack spacing={2}>
				<Button variant="contained">
					View Newsletter Sign-up Emails
				</Button>
				<Button variant="contained">
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
