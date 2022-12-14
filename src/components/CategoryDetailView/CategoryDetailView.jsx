import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';


function CategoryDetailView(){
    const dispatch = useDispatch();
    let params = useParams();
    console.log('params is', params);

    useEffect(() => {
        //Todo: add in all other data 
        dispatch({
            type: 'FETCH_CATEGORY_DETAIL',
            payload: {
                catId: params.catId,
                ageId: params.ageId
            }
        })
    }, []);

    return(
    <>
    </>
    );
}

export default CategoryDetailView;