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
import Link from "@mui/material/Link";

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
    // console.log('clicked?', isEmailListClicked)
  }

  function handleEditorClick() {
    setEditorClicked(!isEditorClicked);
    // console.log('clicked?', isEditorClicked)
  }

  const handleChange = (editorContent) => {
    setEditorState(editorContent);
    console.log(editorState);
  };

  // sunEditor handling image upload
  // currently unused
  // const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
  // 		console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
  // }

  const handleViewFeedback = () => {
    history.push("/adminfeedbackview");
  };

  function handleEditorSave() {
    console.log("in save button, content html:", editorState);
    let emailList = [];
    for (let email of newsletterEmails) {
      emailList.push(email.email);
    }
    console.log("email list is:", emailList);
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

  function handleNewsletterDemoClick() {
    console.log("clicked");
    SunEditor.defaultValue = `<h1>Welcome to the ViFi Newsletter!</h1>

		<p>Thank you for signing up! Now you will find all the latest women&apos;s health news in your inbox!</p>
		
		<div class="se-component se-image-container __se__float-none" contenteditable="false" style="">      
		  <figure style="margin: 0px;">
						<img src="https://post.healthline.com/wp-content/uploads/2020/09/Female_iPhone_Chair_1296x728-header-1296x729.jpg" alt="" data-rotate="" data-proportion="true" data-rotatex="" data-rotatey="" data-size="794px,446px" data-align="none" data-index="0" data-file-name="Female_iPhone_Chair_1296x728-header-1296x729.jpg" data-file-size="0" data-origin="," style="width: 794px; height: 446px;">
		  </figure>
		</div>
		
		<div>
		<h2>2022 Nurx Review: Is It Right for You?</h2>
		
		<p><br>
		</p>
		</div>
		<div>
		<h3>What is Nurx?</h3>
		
		<p>Nurx is a telemedicine company that offers birth control prescriptions, emergency contraception, and home testing kits. All prescriptions are written by a licensed healthcare professional in your state and delivered directly to you.</p>
		
		<h3>What services does Nurx offer?</h3>
		
		<ul>
		  <li>birth control prescriptions and fulfillment </li>
		  <li>emergency contraception</li>
		  <li>skin care treatment for acne, rosacea, and aging</li>
		  <li>migraine medications</li>
		  <li>sexual health management, including STI testing, HPV screening and treatment, and UTI treatment</li>
		  <li>UTI treatment</li>
		  <li>COVID-19 testing<br>
		  </li>
		</ul>
		</div>
		<div>
		<p>
		All prescriptions are written by a licensed healthcare professional in your state and delivered directly to you. Nurx uses an accredited lab for sample testing. It also uses licensed pharmacies, which you can double-check here.
		
		While Nurx shouldn’t replace your regular doctor, it can still be a convenient way to access basic healthcare when you need it. Here’s what else you should know about Nurx.
		</p>
		</div>
		
		<footer align="center">Copyright 2023 ViFi</footer>`;
  }

  return (
    <Container>
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
        <Grid item mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewFeedback}
          >
            View User Feedback
          </Button>
        </Grid>
        <Grid item mb={2}>
          <Link
            target="_blank"
            underline="none"
            href={
              "https://analytics.google.com/analytics/web/?utm_source=demoaccount&utm_medium=demoaccount&utm_campaign=demoaccount#/report/visitors-flow/a54516992w87479473p92320289/"
            }
          >
            <Button variant="contained">{"Google Analytics"}</Button>
          </Link>
        </Grid>
        <Grid item mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEmailClick}
          >
            {isEmailListClicked === true
              ? "Close Newsletter Sign-up Emails"
              : "View Newsletter Sign-up Emails"}{" "}
            <div className=""></div>
          </Button>
        </Grid>

        {isEmailListClicked === true ? (
          <Grid item mb={2}>
            <List>
              {newsletterEmails.map((x) => (
                <>
                  <ListItem key={x.id}>{x.email}</ListItem>
                  <Divider component="li" />
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

        {isEditorClicked === true ? (
          <Box
            margin="20px 0px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <SunEditor
              name="newsletter-editor"
              defaultValue=""
              placeholder="Newsletter editor - add your text here..."
              width="80%"
              height="400px"
              autoFocus={true}
              onChange={handleChange}
              // onImageUpload={handleImageUpload}
              setOptions={{
                buttonList: buttonList.formatting,
                plugins: [
                  font,
                  fontColor,
                  fontSize,
                  textStyle,
                  link,
                  image,
                  imageGallery,
                ],
                buttonList: [
                  ["undo", "redo", "removeFormat"],
                  ["font", "fontSize", "fontColor"],
                  [
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "subscript",
                    "superscript",
                  ],
                  ["align", "outdent", "indent"],
                  ["list", "table", "link", "image"],
                  ["codeView"],
                  ["preview", "print"],
                ],
              }}
            />
            <Stack margin={2} direction="row" spacing={12}>
              <Button variant="outlined" onClick={handleEditorClick}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleEditorSave}>
                Send to email list
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Grid>
    </Container>
  );
}

export default AdminLandingPage;
