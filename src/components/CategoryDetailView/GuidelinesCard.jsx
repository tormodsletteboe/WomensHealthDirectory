
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function GuidelinesCard ({guideline}) {
    return (
        <>
        <Card sx={{ minWidth: 275, marginBottom: 2}}>
            <CardContent>
                <Typography>
                    <b>Guideline Name: </b>
                </Typography>
                <Typography>
                    {guideline.name}
                </Typography>
                <Typography>
                    <b>Info: </b> 
                </Typography>
                <Typography>
                    {guideline.info}
                </Typography>
                <Typography>
                    <b>Grade:</b> {guideline.grade}
                </Typography>
                <Typography>
                    <b>Last Updated:</b>
                </Typography>
                <Typography>
                    {guideline.date}
                </Typography>
            </CardContent>
        </Card>
        </>
    );
}

export default GuidelinesCard;