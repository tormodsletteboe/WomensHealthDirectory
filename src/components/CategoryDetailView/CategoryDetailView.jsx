import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import OpenInNew from '@mui/icons-material/OpenInNew';
import './CategoryDetailView.css';
import FaqCard from './FaqCard';
import DiagnosticToolsCard from './DiagnosticToolsCard';
import GuidelinesCard from './GuidelinesCard';
import DoctorQuestionsCard from './DoctorQuestionsCard';
import * as React from 'react';


function CategoryDetailView(){

    const dispatch = useDispatch();
    let params = useParams();
    // console.log('params is', params);

    const selectedHealthCategory = useSelector(store => store.selectedHealthCategory);

    useEffect(() => {
        dispatch({
            type: 'FETCH_CATEGORY_DETAIL',
            payload: {
                catId: params.catId,
                ageId: params.ageId
            }
        })
        dispatch({
            type: 'FETCH_SPECIFIC_RESOURCES',
            payload: {
                categoryId: params.catId
            }
        })
    },[]);

    let categoryDetails = useSelector((store)=>{
        return store.categoryDetail;
    })
    console.log('categoryDetails is', categoryDetails);

    let specificresources = useSelector((store)=>{
        return store.specificResources;
    })
    console.log('specificresources is', specificresources);
    
    return(
    <>
    <div className="accordion">
          <Accordion style={{backgroundColor: '#8EBBA7'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon  />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography >Guidelines</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <ul style={{padding:0}} >
              {categoryDetails.guidelines && categoryDetails.guidelines.map((guideline) => (
                      <li key={guideline.id} style={{backgroundColor: '#FFFFFF'}}>
                        <GuidelinesCard guideline = {guideline} /> 
                      </li>
                    ))}
            </ul>
                                    
            </AccordionDetails>
          </Accordion>

          <Accordion style={{backgroundColor: '#8EBBA7'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography >Diagnostic Tools</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <ul style={{padding:0}} >
                {categoryDetails.diagTools && categoryDetails.diagTools.map((diagTool) => (
                      <li key={diagTool.id} style={{backgroundColor: '#FFFFFF'}}>
                        <DiagnosticToolsCard diagTool = {diagTool}/>
                      </li>
                    ))}
              </ul>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{backgroundColor: '#8EBBA7'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon  />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography >FAQs</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul style={{padding:0}} >
                    {categoryDetails.faqs && categoryDetails.faqs.map((faq) => (
                      <li key={faq.id} style={{backgroundColor: '#FFFFFF'}}>
                        <FaqCard faq={faq} />
                      </li>
                    ))}
              </ul>
          </AccordionDetails>
          </Accordion>

          <Accordion style={{backgroundColor: '#8EBBA7'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon  />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography >Questions to Ask Your Doctor</Typography>
            </AccordionSummary>
            <AccordionDetails>

            <ul style={{padding:0}} >
                  {categoryDetails.drQuestions && categoryDetails.drQuestions.map((question) => (

                      <li key={question.id} style={{backgroundColor: '#FFFFFF'}}>
                        <DoctorQuestionsCard question={question} />
                      </li>
                    ))}
            </ul>

            </AccordionDetails>
          </Accordion>

          <Accordion style={{backgroundColor: '#8EBBA7'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon  />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>{selectedHealthCategory.category} Resources</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {specificresources && specificresources.map((resource) => (
                <List key={resource.id} style={{backgroundColor: '#8EBBA7'}}>
                    <ListItem>
                        <Button 
                            variant = "contained"
                            style={{backgroundColor: '#FFFFFF', color: 'black'}} 
                            component="a"
                            href={resource.link}
                            >{<div className="linkIcon">
                                <OpenInNew />
                              </div>}
                              {resource.name}
                        </Button>
                    </ListItem>
                </List>
            ))}
            </AccordionDetails>
          </Accordion>
        </div>   
    </>
    );
}

export default CategoryDetailView;