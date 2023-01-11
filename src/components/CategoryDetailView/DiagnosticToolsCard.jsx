import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function DiagnosticToolsCard({ diagTool }) {
    return (
        <>
            <Card sx={{ minWidth: 275, marginBottom: 2 }}>
                <CardContent>
                    <Typography sx={{ textAlign: 'left' }}>
                        <b>{diagTool.name}</b>
                    </Typography>
                    <Typography sx={{ textAlign: 'left' }}>
                        {diagTool.info}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default DiagnosticToolsCard;