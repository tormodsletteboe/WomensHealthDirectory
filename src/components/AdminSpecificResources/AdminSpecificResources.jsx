import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import AddEditForm from "../AdminAddEditForm/AdminAddEditForm";


function AdminSpecificResources() {

    // hooks
    const dispatch = useDispatch();

    const params = useParams();

    // selectors
    const specificResources = useSelector(store => store.specificResources);
    const resourceToEdit = useSelector(store => store.resourceToEdit);

    // fetch specific resources
    useEffect(() => {
        dispatch({ type: 'FETCH_SPECIFIC_RESOURCES', payload: {categoryId: params.categoryId} });
        
    }, [params.categoryId]);

    // functions
    const handleAddClick = () => {
        dispatch({type: 'SET_RESOURCE_TO_EDIT', 
            payload: 
            {id: Number(specificResources[specificResources.length-1].id + 1), 
            name: '', description:'', link: ''}})
    }

    const handleDelete = (evt, x) => {
        evt.preventDefault();
        // console.log('deleting x', x);
        dispatch({type: 'DELETE_RESOURCE', 
            payload: {id: x.id, categoryId: params.categoryId}});
        
    }
    

    // const addEditForm =  (                   
    //     <form onSubmit={updateOrAddResource}
    //         key={resourceToEdit.id}>
    //         <input 
    //             value={resourceToEdit.name}
    //             onChange={(evt) => dispatch({
    //                 type: 'UPDATE_FIELD',
    //                 payload: {name: evt.target.value}
    //         })}/>
    //         <input 
    //             value={resourceToEdit.description}
    //             onChange={(evt) => dispatch({
    //                 type: 'UPDATE_FIELD',
    //                 payload: {description: evt.target.value}
    //         })}/>
    //         <input 
    //             value={resourceToEdit.link}
    //             onChange={(evt) => dispatch({
    //                 type: 'UPDATE_FIELD',
    //                 payload: {link: evt.target.value}
    //         })}/>
    //         <button onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: {}})}>
    //             Cancel
    //         </button>
    //         <button type="submit">Save</button>
    //     </form>)

    return (
        <> 
            <h1>Specific Resources</h1>
            <ul className="specificResources">
                {specificResources.map(x => (
                    x.id === resourceToEdit.id ? 

                    // addEditForm
                    <AddEditForm key={x.id} />

                    : 
                    <li key={x.id}><a href={x.link}>{x.name}</a> {x.description} 
                        <button 
                        onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: x})}>
                            Edit
                        </button>
                        <button 
                        onClick={(evt)=>{handleDelete(evt, x)}}>
                            Delete
                        </button>
                    </li>
                ))}

                <li> 
                    {/* Creates Add button
                    Clicking Add button will send a file with 3 empty lines to edit, 
                    and id will be the highest id in the specific resources reducer plus one
                    */}                    
                    <button type="button" onClick={(evt)=>{handleAddClick(evt)}}>
                    Add
                    </button> 
                    {/* conditional rendering to show/not show the add form */}
                { resourceToEdit.id && resourceToEdit.id === (specificResources[specificResources.length-1].id + 1) ? <AddEditForm /> : null }
                </li>
            </ul>
        </>
    )
}

export default AdminSpecificResources;