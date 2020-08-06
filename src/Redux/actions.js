export const setLoginResult = (userInfo = {}) => {
    return {
        type: "SET_RESULT",
        payload: userInfo,
        isFetching: false
    }
}

export const login = () => {
    return {
        type: "SIGN_IN",
        isFetching: true
    }
}

export const setProfile = () => {
    return {
        type: "UPDATE_PROFILE",
        isFetching: true
    }
}

export const setProfileResult = (userInfo = {}, error = "") => {
    return {
        type: "UPDATE_PROFILE_RESULT",
        result: userInfo,
        error: error,
        isFetching: false
    }
}

export const setError = () => {
    return {
        type: "SET_ERROR",
        error:"Wrong username or password",
        isFetching: false
    }
}