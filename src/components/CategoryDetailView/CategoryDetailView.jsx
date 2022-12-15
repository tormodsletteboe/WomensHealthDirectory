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


    useEffect(() => {
        dispatch({
            type: 'FETCH_CATEGORY_DETAIL',
            payload: {
                catId: params.catId,
                ageId: params.ageId
            }
        })
    },[]);

    let categoryDetails = useSelector((store)=>{
        return store.categoryDetail;
    })

    let specificresources = useSelector((store)=>{
        return store.specificresources;
    })
   

    
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
                <ListItem>{question.answer}</ListItem>
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
          <Typography>
            Render specific resources here
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    {/* <div className="accordion"> */}
        {/* <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                                <AccordionButton style={{height: 50, borderRadius: 8, backgroundColor: '#8EBBA7'}}>
                                    <Box flex ='1' textAlign='center'>
                                        Guidelines
                                    </Box>
                                   
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            <TableContainer maxHeight="200vh" overflowY='scroll'>
                                     <Table variant='simple' size='sm'>
                                         <Tbody>
                                             {categoryDetails.guidelines && categoryDetails.guidelines.map((guideline) => (
                                                 <Tr key={guideline.id}>
                                                     <Td>{guideline.name}</Td>
                                                      <Td>{guideline.info}</Td>
                                                     <Td>{guideline.grade}</Td>
                                                     <Td>{guideline.date}</Td> 
                                                 </Tr>
                                             )
                                            )
                                         }
                                          </Tbody>
                                     </Table>
 
                                 </TableContainer> 
                            </AccordionPanel>
                        </AccordionItem>
            <AccordionItem>
                            <h2>
                                <AccordionButton style={{height: 50, borderRadius: 8, backgroundColor: '#8EBBA7'}}>
                                    <Box flex='1' textAlign='center'>
                                        Diagnostic Tools
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Box maxHeight="30vh" overflowY='scroll'>
                                  render tools here

                                </Box>
                            </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                            <h2>
                                <AccordionButton style={{height: 50, borderRadius: 8, backgroundColor: '#8EBBA7'}}>
                                    <Box flex='1' textAlign='center'>
                                        FAQs
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Box maxHeight="30vh" overflowY='scroll'>
                                  render FAQs

                                </Box>
                            </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                            <h2>
                                <AccordionButton style={{height: 50, borderRadius: 8, backgroundColor: '#8EBBA7'}}>
                                    <Box flex='1' textAlign='center'>
                                        Questions to Ask your Doctor
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Box maxHeight="30vh" overflowY='scroll'>
                                  render questions here

                                </Box>
                            </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                            <h2>
                                <AccordionButton style={{height: 50, borderRadius: 8, backgroundColor: '#8EBBA7'}}>
                                    <Box flex='1' textAlign='center'>
                                        Specific resources
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Box maxHeight="30vh" overflowY='scroll'>
                                  render specific resources here

                                </Box>
                            </AccordionPanel>
            </AccordionItem>
            </Accordion>
            </div> */}

           
        
        
    </>
    );
}

export default CategoryDetailView;