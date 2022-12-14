import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

function AdminSpecificResources() {

    // hooks
    const dispatch = useDispatch();

    const params = useParams();

    // selectors
    const specificResources = useSelector(store => store.specificResources);

    // fetch specific resources
    useEffect(() => {
        dispatch({ type: 'FETCH_SPECIFIC_RESOURCES', payload: params.categoryId });
    }, []);

    return (
        <>
            params: {params.categoryId}

            <ul className="specificResources">
                {specificResources.map(x => (
                    <li key={x.id}><a href={x.link}>{x.name}</a> {x.description} </li>
                ))}
            </ul>
        </>
    )
}

export default AdminSpecificResources;