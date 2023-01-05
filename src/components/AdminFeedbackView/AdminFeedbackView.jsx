import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
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

    const feedback = useSelector((store)=> {
        return store.feedback;
    })
    console.log('feedback is', feedback);

    return(
      <>
      <h1>User Feedback</h1>
      <div>
      <Accordion style= {{width: '80%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography>Comments and Overall Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer height= '90%'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Comments</TableCell>
                        <TableCell>Overall Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {feedback.commentsAndRatings && feedback.commentsAndRatings.map(feedbackItem =>
                    <TableRow>
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
      <Accordion style= {{width: '80%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Questions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
    
          </Typography>
        </AccordionDetails>
      </Accordion>

   


      <Accordion style= {{width: '80%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Most Common Ratings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>

        </>
    );
}

export default AdminFeedbackView;