import { Box, Button, Container, FormControlLabel, InputLabel, Menu, MenuItem, Pagination, Radio, RadioGroup, Select, Typography } from "@mui/material";
import { useState } from "react";

function Feedback() {

    const [questions, setQuestions] =
        useState([
            'What was the most helpful feature of this website?',
            'What was the least helpful feature of this website?',
            'How do you currently get your healthcare information?',
            'What is the most confusing aspect of managing your healthcare?',
        ])

    const [[dropdownA, setDropA], [dropdownB, setDropB], [multi, setMulti]] =
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
            ]), useState([
                'Finding a provider',
                'Knowing what I should be monitoring/managing',
                'Knowing what to ask my provider',
                'Navigating insurance',
                'Understanding how to shop for healthcare services',
                'Managing my health records'
            ])
        ]

    const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0 });

    const [[page, setPage], [radio, setRadio]] = [useState(1), useState(1)];

    const saveAnswer = (answer) => {
        setAnswers({ ...answers, ...answer });
    }

    const changePage = (update) => {
        if (page + update > 0 && page + update < 11) {
            setRadio(0);
            setPage(page + update);
        }
        multiRender();
    }

    const setRadioAnswer = (e) => {
        switch (page) {
            case 4: setAnswers({ ...answers, q4: e.target.value }); break;
            case 5: setAnswers({ ...answers, q5: e.target.value }); break;
            case 6: setAnswers({ ...answers, q6: e.target.value }); break;
            case 7: setAnswers({ ...answers, q7: e.target.value }); break;
            case 8: setAnswers({ ...answers, q8: e.target.value }); break;
            case 9: setAnswers({ ...answers, q9: e.target.value }); break;
            default: null;
        }
        
    }

    const multiRender = () => {
        switch (page) {
            case 4: multiQ = multi[0]; break;
            case 5: multiQ = multi[1]; break;
            case 6: multiQ = multi[2]; break;
            case 7: multiQ = multi[3]; break;
            case 8: multiQ = multi[4]; break;
            case 9: multiQ = multi[5]; break;
            default: null;
        }
    }

    let multiQ = '';

    console.log(answers);

    return (
        <Container>
            <Typography variant="h4" textAlign={'center'}>Thank you for using the ViFi!</Typography>
            <Typography paragraph textAlign={'center'}>
                If you don't mind, please answer some questions
                so we may better serve you next time.
            </Typography>
            {page == 1 &&
                <Box>
                    <InputLabel id='feedbackQ1' sx={({ 'fontSize': '12px' })}>{questions[0]}</InputLabel>
                    <Select labelId="feedbackQ1" value={answers.q1} onChange={(e) => saveAnswer({ q1: e.target.value })}>
                        <MenuItem value={dropdownA[0]}>{dropdownA[0]}</MenuItem>
                        <MenuItem value={dropdownA[1]}>{dropdownA[1]}</MenuItem>
                        <MenuItem value={dropdownA[2]}>{dropdownA[2]}</MenuItem>
                        <MenuItem value={dropdownA[3]}>{dropdownA[3]}</MenuItem>
                        <MenuItem value={dropdownA[4]}>{dropdownA[4]}</MenuItem>
                    </Select>
                </Box>
            }
            {page == 2 &&
                <Box>
                    <InputLabel id='feedbackQ2' sx={({ 'fontSize': '12px' })}>{questions[1]}</InputLabel>
                    <Select labelId="feedbackQ2" value={answers.q2} onChange={(e) => saveAnswer({ q2: e.target.value })}>
                        <MenuItem value={dropdownA[0]}>{dropdownA[0]}</MenuItem>
                        <MenuItem value={dropdownA[1]}>{dropdownA[1]}</MenuItem>
                        <MenuItem value={dropdownA[2]}>{dropdownA[2]}</MenuItem>
                        <MenuItem value={dropdownA[3]}>{dropdownA[3]}</MenuItem>
                        <MenuItem value={dropdownA[4]}>{dropdownA[4]}</MenuItem>
                    </Select>
                </Box>
            }
            {page == 3 &&
                <Box>
                    <InputLabel id='feedbackQ3' sx={({ 'fontSize': '12px' })}>{questions[2]}</InputLabel>
                    <Select labelId="feedbackQ3" value={answers.q3} onChange={(e) => saveAnswer({ q3: e.target.value })}>
                        <MenuItem value={dropdownB[0]}>{dropdownB[0]}</MenuItem>
                        <MenuItem value={dropdownB[1]}>{dropdownB[1]}</MenuItem>
                        <MenuItem value={dropdownB[2]}>{dropdownB[2]}</MenuItem>
                        <MenuItem value={dropdownB[3]}>{dropdownB[3]}</MenuItem>
                    </Select>
                </Box>
            }
            {page > 3 && page < 10 &&
                <Box>
                    <Typography>{questions[3]}</Typography>
                    <Typography>Please rate from 1 (most confusing) to 5 (least confusing)</Typography>
                    <Typography>{multiQ}</Typography>
                    <Box>
                        <RadioGroup row sx={({ 'justifyContent': 'space-evenly' })} onChange={(e) => setRadioAnswer(e)} value={radio}>
                            <FormControlLabel value={1} control={<Radio />} label='1' labelPlacement="top" sx={({ 'margin': 0 })} />
                            <FormControlLabel value={2} control={<Radio />} label='2' labelPlacement="top" sx={({ 'margin': 0 })} />
                            <FormControlLabel value={3} control={<Radio />} label='3' labelPlacement="top" sx={({ 'margin': 0 })} />
                            <FormControlLabel value={4} control={<Radio />} label='4' labelPlacement="top" sx={({ 'margin': 0 })} />
                            <FormControlLabel value={5} control={<Radio />} label='5' labelPlacement="top" sx={({ 'margin': 0 })} />
                        </RadioGroup>
                    </Box>
                </Box>
            }
            <Box sx={({ 'textAlign': 'center', 'paddingTop': '1em', 'paddingBottom': '1em' })}>
                <Button onClick={() => changePage(-1)} variant='outlined' sx={({ 'marginRight': '2em' })}>PREV</Button>
                <Button onClick={() => changePage(1)} variant='outlined' sx={({ 'marginLeft': '2em' })}>NEXT</Button>
            </Box>
            <Pagination count={10} page={page} onChange={(e, v) => setPage(v)} hideNextButton hidePrevButton disabled></Pagination>
        </Container>
    )
}

export default Feedback;