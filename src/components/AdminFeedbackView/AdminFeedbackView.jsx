import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';



function AdminFeedbackView() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_USER_FEEDBACK'
        });
    }, []);

    const feedback = useSelector((store)=> {
        
    })



    return(
        <>
        <h1>Feedback goes here</h1>

        </>
    );
}

export default AdminFeedbackView;