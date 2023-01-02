import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import './Resources.css';

function Resources(){

    const virtualHealth = () => {
        history.pushState('/virtualhealth');
    }

    const medicalLinks = () => {
        history.pushState('/medicallinks');
    }

    return(
    <>
    <div className = "resourcesTitle">
        <h3>Resources</h3>
    </div>

    <div className = "resources">

    <Button className="virtualHealth" onClick = {virtualHealth} variant="contained" style={{backgroundColor:'#276359'}}>Virtual Health</Button>
    <Button className = "medicalLinks" onClick = {medicalLinks} variant="contained" style={{backgroundColor:'#276359'}}>Medical Links</Button>
    </div>
    </>
    );
}

export default Resources;