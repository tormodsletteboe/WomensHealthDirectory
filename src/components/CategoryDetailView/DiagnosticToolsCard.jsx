import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function DiagnosticToolsCard ({diagTool}) {
    return (
        <>
        <Card sx={{ minWidth: 275, marginBottom: 2}}>
            <CardContent>
                <Typography>
                    <b>{diagTool.name}</b>
                </Typography>
                <Typography>
                    {diagTool.info}
                </Typography>
            </CardContent>
        </Card>
        </>
    );
}

export default DiagnosticToolsCard;