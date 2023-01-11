import "./AdminLandingPage.css";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import {
  Button,
  Stack,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  Container,
} from "@mui/material";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
// import editor plugins
import { align } from "suneditor/src/plugins/submenu/align";
import list from "suneditor/src/plugins/submenu/list";
import {
  font,
  fontColor,
  fontSize,
  textStyle,
  table,
  image,
  link,
  imageGallery,
} from "suneditor/src/plugins";
import Swal from "sweetalert2";
import { Grid } from "@mui/material";

function AdminLandingPage() {
	//add code comment
	// hooks
	const dispatch = useDispatch();
	const history = useHistory();

	// selectors
	const newsletterEmails = useSelector((store) => store.newsletterEmails);

	const headers = [{ label: "Email Address", key: "email" }];
	const [heading, setHeading] = useState("Admin Landing Page");
	const [isEmailListClicked, setClicked] = useState(false);
	const [isEditorClicked, setEditorClicked] = useState(false);

	const [editorState, setEditorState] = useState("");

	useEffect(() => {
		dispatch({ type: "FETCH_NEWSLETTER_EMAILS" });
	}, []);

	function handleEmailClick() {
		setClicked(!isEmailListClicked);
	}

	function handleEditorClick() {
		setEditorClicked(!isEditorClicked);
	}

	const handleChange = (editorContent) => {
		setEditorState(editorContent);
	};

	const handleViewFeedback = () => {
		history.push('/adminfeedbackview');
	}

	// sends newsletter to email list
	function handleEditorSave() {
		let emailList = [];
		for (let email of newsletterEmails) {
		  emailList.push(email.email);
		}
		dispatch({
		  type: "SEND_NEWSLETTER",
		  payload: { htmlToSend: editorState, emailList: emailList },
		});
		Swal.fire({
		  icon: "success",
		  title: "Emails have been sent!",
		  showConfirmButton: false,
		  timer: 1500,
		});
		handleEditorClick();
	  }

  return (
    <Container >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
		columnSpacing={2}
      >
        <Grid item>
          <Typography component="h1" variant="h3" align="center" m="20px">
            Welcome, Admin!
          </Typography>
        </Grid>
		<Grid item mb={2} >
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewFeedback}
        >
          View User Feedback
        </Button>
		</Grid>
        <Grid item mb={2}>
          <Button variant="contained" color="primary" onClick={handleEmailClick}>
            {isEmailListClicked === true
              ? "Close Newsletter Sign-up Emails"
              : "View Newsletter Sign-up Emails"} <div className=""></div>
          </Button>
        </Grid>
        {isEmailListClicked === true ? (
			<Grid item mb={2}>
          <List>
            {newsletterEmails.map((x) => (
              <>
                <ListItem key={x.id}>{x.email}</ListItem>
                <Divider  component="li" />
              </>
            ))}
          </List>
		  </Grid>
        ) : null}
		<Grid item mb={2}>
        <Button variant="contained" color="primary">
          <CSVLink
            data={newsletterEmails}
            headers={headers}
            filename={"newsletter-emails.csv"}
          >
            Download Newsletter Emails Addresses
          </CSVLink>
        </Button>
		</Grid>

        {isEditorClicked === false ? (
          <Grid item mb={2}>
		  <Button variant="contained" onClick={handleEditorClick}>
            Write Newsletter
          </Button>
		  </Grid>
        ) : null}

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
        				['list', 'table', 'link', 'image'],
						['codeView'],
						['preview', 'print']
					]
				}}
				/>
			<Stack margin={2} direction="row" spacing={12}>
				<Button variant='outlined'
				onClick={handleEditorClick}>Cancel</Button>
				<Button variant='contained'
				onClick={handleEditorSave}>Send to email list</Button>
			</Stack>
			</Box>
         : null }
      </Grid>
    </Container>
  );
}

export default AdminLandingPage;
