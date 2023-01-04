
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function GuidelinesCard ({guideline}) {
    return (
        <>
        <Card sx={{ minWidth: 275, marginBottom: 2}}>
            <CardContent>
                <Typography style = {{margin: '0.5rem'}} sx={{textAlign:'left'}}>
                    <b>Guideline: </b>
                </Typography>
                <Typography style = {{margin: '0.5rem'}} sx={{textAlign:'left'}}>
                    {guideline.name}
                </Typography>
                <Typography style = {{margin: '0.5rem'}} sx={{textAlign:'left'}}>
                    <b>Info: </b> 
                </Typography>
                <Typography style = {{margin: '0.5rem'}} sx={{textAlign:'left'}}>
                    {guideline.info}
                </Typography>
                <Typography style = {{margin: '0.5rem'}} sx={{textAlign:'left'}}>
                    <b>Grade:</b> {guideline.grade}
                </Typography>
                <Typography style = {{margin: '0.5rem'}} sx={{textAlign:'left'}}>
                    {/* TODO: format the date */}
                    <b>Last Updated:</b> {guideline.date}
                </Typography>
        
            </CardContent>
        </Card>
        </>
    );
}

export default GuidelinesCard;