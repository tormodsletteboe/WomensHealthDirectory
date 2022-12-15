import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import './CategoryDetailView.css';


function CategoryDetailView(){

    const dispatch = useDispatch();
    let params = useParams();
    console.log('params is', params);


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

    let specificresources = useSelector((store)=>{
        return store.specificResources;
    })
    console.log('specificresources is', specificresources);
   

    
    return(
    <>

<div className="accordion">
      <Accordion style={{backgroundColor: '#8EBBA7'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Guidelines</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer style = {{backgroundColor: '#FFFFFF'}}>
        <Table variant='simple' size='sm'>
                <TableHead>
                    <TableRow>
                        <TableCell>Guideline Name</TableCell>
                        <TableCell>Info</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Last Updated</TableCell>
                    </TableRow>
                </TableHead>
                                         <TableBody>
                                             {categoryDetails.guidelines && categoryDetails.guidelines.map((guideline) => (
                                                 <TableRow key={guideline.id}>
                                                     <TableCell>{guideline.name}</TableCell>
                                                      <TableCell>{guideline.info}</TableCell>
                                                     <TableCell>{guideline.grade}</TableCell>
                                                     <TableCell>{guideline.date}</TableCell> 
                                                 </TableRow>
                                             )
                                            )
                                         }
                                          </TableBody>
                                     </Table>
                            </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{backgroundColor: '#8EBBA7'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Diagnostic Tools</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {categoryDetails.diagTools && categoryDetails.diagTools.map((diagTool) => (
            <List key={diagTool.id} style={{backgroundColor: '#FFFFFF'}}>
                <ListItem>{diagTool.name}</ListItem>
                <ListItem>{diagTool.info}</ListItem>
            </List>
        ))}

        </AccordionDetails>
      </Accordion>

      <Accordion style={{backgroundColor: '#8EBBA7'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>FAQs</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {categoryDetails.faqs && categoryDetails.faqs.map((faq) => (
            <List key={faq.id} style={{backgroundColor: '#FFFFFF'}}>
                <ListItem>{faq.question}</ListItem>
                <ListItem>{faq.answer}</ListItem>
            </List>
        ))}
        </AccordionDetails>
      </Accordion>

      <Accordion style={{backgroundColor: '#8EBBA7'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Questions to Ask Your Doctor</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {categoryDetails.drQuestions && categoryDetails.drQuestions.map((question) => (
            <List key={question.id} style={{backgroundColor: '#FFFFFF'}}>
                <ListItem>{question.question}</ListItem>
            </List>
        ))}
        </AccordionDetails>
      </Accordion>

      <Accordion style={{backgroundColor: '#8EBBA7'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Resources</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {specificresources && specificresources.map((resource) => (
            <List key={resource.id} style={{backgroundColor: '#FFFFFF'}} overflowX = 'scroll'>
                <ListItem><a href={resource.link}>{resource.name}</a></ListItem>
            </List>
        ))}
        </AccordionDetails>
      </Accordion>
    </div>   
    </>
    );
}

export default CategoryDetailView;