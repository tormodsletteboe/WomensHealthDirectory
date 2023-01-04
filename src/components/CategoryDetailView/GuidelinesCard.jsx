
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function GuidelinesCard ({guideline}) {
    return (
        <>
        <Card sx={{ minWidth: 275, marginBottom: 2}}>
            <CardContent>
                <Typography style = {{margin: '0.5rem'}}>
                    <b>Guideline: </b>
                </Typography>
                <Typography style = {{margin: '0.5rem'}}>
                    {guideline.name}
                </Typography>
                <Typography style = {{margin: '0.5rem'}}>
                    <b>Info: </b> 
                </Typography>
                <Typography style = {{margin: '0.5rem'}}>
                    {guideline.info}
                </Typography>
                <Typography style = {{margin: '0.5rem'}}>
                    <b>Grade:</b> {guideline.grade}
                </Typography>
                <Typography style = {{margin: '0.5rem'}}>
                    {/* TODO: format the date */}
                    <b>Last Updated:</b> {guideline.date}
                </Typography>
        
            </CardContent>
        </Card>
        </>
    );
}

export default GuidelinesCard;