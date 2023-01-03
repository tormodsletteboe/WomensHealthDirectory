import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import './Resources.css';

function Resources(){
    const history = useHistory();

    const virtualHealth = () => {
        history.push('/virtualhealth');
    }

    const medicalLinks = () => {
        history.push('/medicallinks');
    }

    return(
    <>
    <div className = "resourcesTitle">
        <h3>Resources</h3>
    </div>

    <div className = "resources">
    <Button 
        className="virtualHealth" 
        onClick = {virtualHealth} 
        variant="contained" 
        style={{
            backgroundColor:'#276359', 
            width: '12rem', 
            margin: 'auto',
            borderRadius: '8px'
            }}>Virtual Health
    </Button>
    <Button 
        className = "medicalLinks" 
        onClick = {medicalLinks} 
        variant="contained" 
        style={{
            backgroundColor:'#276359', 
            width: '12rem', 
            margin: 'auto', 
            borderRadius: '8px',
            marginTop: '1rem'}}
            >Medical Links
    </Button>
    </div>
    </>
    );
}

export default Resources;