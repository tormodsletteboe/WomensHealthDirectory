import { Box, Container, InputLabel, Menu, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

function Feedback() {

    const [questions, setQuestions] =
        useState([
            'What was the most helpful feature of this website?',
            'What was the least helpful feature of this website?',
            'How do you currently get your healthcare information?',
            'What is the most confusing aspect of managing your healthcare?'
    ])

    const [[dropdownA, setDropA], [dropdownB, setDropB]] = 
    [
        useState([
            'Age-related screening recommendation',
            'Testing explanation',
            'Questions to ask my provider',
            'Resources for further info',
            'List of virtual care providers'
    ]), useState([
            'Provider/healthcare visit',
            'Call my healthcare provider',
            'Online search',
            'Friends/Family'
    ])]
    
    const [answers, setAnswers] = useState({q1: '', q2: '', q3: ''});

    console.log(answers);

    return (
        <Container>
            <h1>Thank you for using the ViFi!</h1>
            <Typography paragraph>
                If you don't mind, please answer some questions
                so we may better serve you next time.
            </Typography>
            <Box>
                <InputLabel id='feedbackQ1' sx={({ 'fontSize':'12px' })}>{questions[0]}</InputLabel>
                <Select labelId="feedbackQ1" value={answers.q1} onChange={(e) => setAnswers({...answers, q1: e.target.value})}>
                    <MenuItem value={dropdownA[0]}>{dropdownA[0]}</MenuItem>
                    <MenuItem value={dropdownA[1]}>{dropdownA[1]}</MenuItem>
                    <MenuItem value={dropdownA[2]}>{dropdownA[2]}</MenuItem>
                    <MenuItem value={dropdownA[3]}>{dropdownA[3]}</MenuItem>
                    <MenuItem value={dropdownA[4]}>{dropdownA[4]}</MenuItem>
                </Select>
            </Box>
            <Box>
            <InputLabel id='feedbackQ2' sx={({ 'fontSize':'12px' })}>{questions[1]}</InputLabel>
                <Select labelId="feedbackQ2" value={answers.q2} onChange={(e) => setAnswers({...answers, q2: e.target.value})}>
                    <MenuItem value={dropdownA[0]}>{dropdownA[0]}</MenuItem>
                    <MenuItem value={dropdownA[1]}>{dropdownA[1]}</MenuItem>
                    <MenuItem value={dropdownA[2]}>{dropdownA[2]}</MenuItem>
                    <MenuItem value={dropdownA[3]}>{dropdownA[3]}</MenuItem>
                    <MenuItem value={dropdownA[4]}>{dropdownA[4]}</MenuItem>
                </Select>
            </Box>
            <Box>
            <InputLabel id='feedbackQ3' sx={({ 'fontSize':'12px' })}>{questions[2]}</InputLabel>
                <Select labelId="feedbackQ3" value={answers.q3} onChange={(e) => setAnswers({...answers, q3: e.target.value})}>
                    <MenuItem value={dropdownB[0]}>{dropdownB[0]}</MenuItem>
                    <MenuItem value={dropdownB[1]}>{dropdownB[1]}</MenuItem>
                    <MenuItem value={dropdownB[2]}>{dropdownB[2]}</MenuItem>
                    <MenuItem value={dropdownB[3]}>{dropdownB[3]}</MenuItem>
                </Select>
            </Box>
            <Box>

            </Box>
        </Container>
    )
}

export default Feedback;