import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';


function CategoryDetailView(){

    const dispatch = useDispatch();
    let params = useParams();


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

    let categoryDetails = useSelector((store)=>{
        return store.categoryDetail;
    })
    console.log('categorydetails is', categoryDetails);

    return(
    <>
    </>
    );
}

export default CategoryDetailView;