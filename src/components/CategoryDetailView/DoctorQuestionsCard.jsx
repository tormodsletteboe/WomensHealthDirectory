import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function DoctorQuestionsCard ({question}) {
    return (
        <>
        <Card sx={{ minWidth: 275, marginBottom: 0}}>
            <CardContent>
                <Typography>
                    {question.question}
                </Typography>
            </CardContent>
        </Card>
        </>
    );
}

export default DoctorQuestionsCard;