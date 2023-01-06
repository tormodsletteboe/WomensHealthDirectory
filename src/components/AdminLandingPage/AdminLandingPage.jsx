
import './AdminLandingPage.css';
import {useHistory} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from "react-csv";

import { Button, Stack, Typography, List, ListItem, Divider, Box, Container } from '@mui/material';
import SunEditor, {buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
// import editor plugins
import { align } from 'suneditor/src/plugins/submenu/align';
import list from 'suneditor/src/plugins/submenu/list';
import { font, fontColor, fontSize, textStyle, table, image, link, imageGallery} from 'suneditor/src/plugins';


function AdminLandingPage() {
	//add code comment
    // hooks
    const dispatch = useDispatch();
	const history = useHistory();

	// selectors
	const newsletterEmails = useSelector(store => store.newsletterEmails);
	
	const headers = [{ label: "Email Address", key: "email" }]
	const [heading, setHeading] = useState('Admin Landing Page');
	const [isEmailListClicked, setClicked] = useState(false);
	const [isEditorClicked, setEditorClicked] = useState(false);

	const [editorState, setEditorState] = useState('');

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

	const handleChange = (editorContent) => {
		setEditorState(editorContent)
		console.log(editorState);
	}

		// sunEditor handling image upload
		// currently unused
	// const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
	// 		console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
	// }

	function handleEditorSave() {
		console.log('in save button, content html:', editorState);
		let emailList=[];
		for (let email of newsletterEmails) {
			emailList.push(email.email);
		}
		console.log('email list is:', emailList);
		dispatch({ type: 'SEND_NEWSLETTER', payload: { htmlToSend: editorState, emailList: emailList }})
		handleEditorClick();
	}

	const handleViewFeedback = () => {
		history.push('/adminfeedbackview');
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
					width='80%' height='400px'
					autoFocus={true}
					onChange={handleChange}
					// onImageUpload={handleImageUpload}
					setOptions={{ buttonList: buttonList.formatting, 
					plugins: [
						font,
						fontColor,
    					fontSize,
						textStyle,
						link,
						image,
						imageGallery
    				], buttonList: [
						['undo', 'redo', 'removeFormat'],
						['font', 'fontSize', 'fontColor'],
						['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
						['align', 'outdent', 'indent'],
        				['table', 'link', 'image'],
						['preview', 'print']
					]
				}}
				/>
			<Stack margin={2} direction="row" spacing={12}>
				<Button variant='outlined'
				onClick={handleEditorClick}>Cancel</Button>
				<Button variant='contained'
				onClick={handleEditorSave}>Save and send to email list</Button>
			</Stack>
			</Box>
			: 
			null}	
			
		</>
	);
}

export default AdminLandingPage;


