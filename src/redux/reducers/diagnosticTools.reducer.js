const diagnosticTools = (state = [], action) => {

    if (action.type === 'SET_DIAGNOSTIC_TOOLS') {
        return action.payload;
    }
    return state;
};

export default diagnosticTools;