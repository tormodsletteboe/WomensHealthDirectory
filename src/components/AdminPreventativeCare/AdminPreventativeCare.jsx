import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

function AdminPreventativeCare() {

    const dispatch = useDispatch();

    const ageRanges = useSelector(store => store.ageRanges);

    // fetch age ranges
    useEffect(() => {
        dispatch({ type: 'FETCH_AGE_RANGES' });
    }, []);


    // fetch categories


    return (
        <>
            <p>age ranges</p>

        </>
    )
}

export default AdminPreventativeCare;