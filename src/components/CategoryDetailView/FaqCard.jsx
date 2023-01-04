import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function FaqCard ({faq}) {
    return (
        <>
        <Card sx={{ minWidth: 275, marginBottom: 2}}>
            <CardContent>
                <Typography sx={{textAlign:'left'}}>
                <b>{faq.question}</b>
                </Typography>
                <Typography sx={{textAlign:'left'}}>
                {faq.answer}
                </Typography>
            </CardContent>
        </Card>
        </>
    );
}

export default FaqCard;