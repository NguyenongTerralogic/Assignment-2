const initialState = {
    userInfo: {},
    isFetching: false
}
export default function reducer(state = initialState, action){
    console.log(action)
    switch(action.type) {
        case "SIGN_IN":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SET_RESULT":
            const userInfo = action.payload;
            localStorage.setItem('token', userInfo.token);           
            localStorage.setItem('key', JSON.stringify(userInfo));
            return {
                ...state,
                userInfo: action.payload,
                isFetching: action.isFetching
            }
        case "UPDATE_PROFILE":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "UPDATE_PROFILE_RESULT":        
            return {
                ...state,
                userInfo: action.result,
                isFetching: action.isFetching,
                error: action.error
            }   
        case "SET_ERROR":
            return {
                ...state,
                isFetching: action.isFetching
            }
        default: return state;
    }
}