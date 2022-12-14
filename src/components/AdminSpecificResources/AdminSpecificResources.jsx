import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

function AdminSpecificResources() {

    const dispatch = useDispatch();

    const params = useParams();


    // fetch specific resources
    useEffect(() => {
        dispatch({ type: 'FETCH_SPECIFIC_RESOURCES', payload: params.categoryId });
    }, []);

    return (
        <>
            params: {params.categoryId}
        </>
    )
}

export default AdminSpecificResources;