import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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


function AdminFeedbackView() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_USER_FEEDBACK'
        });
    }, []);

    const feedback = useSelector((store) => {
        return store.feedback;
    })
    console.log('feedback is', feedback);

    return (
        <>
            <div>
                <Typography textAlign='center' fontSize = '32px'>User Feedback</Typography>
                <Accordion style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#8EBBA7', color: '#FFFFFF'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{color: '#FFFFFF'}} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography textAlign= 'center' fontSize = '18px'>Comments and Overall Rating</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer height='90%' style = {{backgroundColor: '#FFFFFF'}}>
                            <Table>
                                <TableHead>
                                    <TableRow style={{fontSize: '18px'}}>
                                        <TableCell>Comments</TableCell>
                                        <TableCell>Overall Rating</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {feedback.commentsAndRatings && feedback.commentsAndRatings.map(feedbackItem =>
                                        <TableRow style={{fontSize: '18px'}} key={feedbackItem.id}>
                                            <TableCell>
                                                {feedbackItem.comment}
                                            </TableCell>
                                            <TableCell>
                                                {feedbackItem.rating}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#8EBBA7', color: '#FFFFFF'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{color: '#FFFFFF'}} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography fontSize = '18px'>Most Common Ratings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>

                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <div>
                    {feedback.questionsAndAnswers && feedback.questionsAndAnswers.map(questionAndAnswerItem =>
                        <Accordion style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#8EBBA7', color: '#FFFFFF'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{color: '#FFFFFF'}} />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography key={questionAndAnswerItem.id} fontSize = '18px'>
                                    {questionAndAnswerItem.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer height='90%' style = {{backgroundColor: '#FFFFFF'}}>
                                    <Table>
                                        <TableHead>
                                            <TableRow style={{fontSize: '18px'}}>
                                                <TableCell>
                                                        Answers
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {questionAndAnswerItem.json_agg.map(answer =>
                                                <TableRow>
                                                    <TableCell>
                                                        {answer}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminFeedbackView;