import { QuestionMarkOutlined } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function DoctorQuestionsCard({ question }) {
    console.log('question is', question);
    return (
        <>
            <Card sx={{ minWidth: 275, marginBottom: 0 }}>
                <CardContent>
                    <Typography sx={{ textAlign: 'left' }}><b>{question.question_category}</b></Typography>
                    <Typography sx={{ textAlign: 'left' }}>
                        {question.question}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default DoctorQuestionsCard;