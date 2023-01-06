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
            <h1>User Feedback</h1>
            <div>
                <Accordion style={{ width: '80%' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Comments and Overall Rating</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer height='90%'>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Comments</TableCell>
                                        <TableCell>Overall Rating</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {feedback.commentsAndRatings && feedback.commentsAndRatings.map(feedbackItem =>
                                        <TableRow key={feedbackItem.id}>
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

                <Accordion style={{ width: '80%' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Most Common Ratings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>

                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <div>
                    {feedback.questionsAndAnswers && feedback.questionsAndAnswers.map(questionAndAnswerItem =>
                        // {feedback.questionsAndAnswers.json_agg && feedback.questionsAndAnswers.json_agg.map(answerItem =>
                        <Accordion style={{ width: '80%' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography key={questionAndAnswerItem.id}>
                                    {questionAndAnswerItem.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer height='90%'>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Answers</TableCell>
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