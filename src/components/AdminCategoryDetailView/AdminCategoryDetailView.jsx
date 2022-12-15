import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

function AdminCategoryDetailView() {

    // hooks
    const dispatch = useDispatch();

    const params = useParams();

    // selectors


    useEffect(() => {
        dispatch({
            type: 'FETCH_CATEGORY_DETAIL',
            payload: {
                catId: params.catId,
                ageId: params.ageId
            }
        })
    }, [params]);

    return (
        <>
            
        </>
    );
}

export default AdminCategoryDetailView;