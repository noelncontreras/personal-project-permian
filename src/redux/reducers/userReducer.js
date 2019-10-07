import axios from "axios";

//initialState
const initialState = {
    user_id: null,
    name: "",
    username: "",
    user_phone_number: "",
    loading: false
};

//constants
const GET_SESSION = "GET_SESSION";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_USERNAME = "UPDATE_USERNAME";
const UPDATE_USER_PHONE_NUMBER = "UPDATE_USER_PHONE_NUMBER";
const DELETE_USER = "DELETE_USER";

//action creators
export function getSession() {
    return {
        type: GET_SESSION,
        payload: axios.get("/auth/user")
    };
};

export function registerUser(newUser) {
    return {
        type: REGISTER_USER,
        payload: newUser
    };
};

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: user
    };
};

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: axios.post("/auth/logout")
    };
};

export function updateName(name) {
    return {
        type: UPDATE_NAME,
        payload: axios.put("/auth/profile/name", name)
    };
};

export function updateUsername(username) {
    return {
        type: UPDATE_USERNAME,
        payload: axios.put("/auth/profile/username", username)
    };
};

export function updateUserPhoneNumber(user_phone_number) {
    return {
        type: UPDATE_USER_PHONE_NUMBER,
        payload: axios.put("/auth/profile/number", user_phone_number)
    };
};

export function deleteUser() {
    return {
        type: DELETE_USER,
        payload: axios.delete("/auth/profile/user")
    };
};

//reducer
export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case `${GET_SESSION}_PENDING`:
            return {
                ...state,
            };
        case `${GET_SESSION}_FULFILLED`:
            return {
                ...state,
                user_id: payload.data.user_id,
                name: payload.data.name,
                username: payload.data.username,
                loading: false
            };
        case REGISTER_USER:
            return {
                ...state,
                user_id: payload.user_id,
                name: payload.name,
                username: payload.username,
            };
        // case `${REGISTER_USER}_PENDING`:
        //     return {
        //         ...state,
        //         loading: true
        //     };
        // case `${REGISTER_USER}_FULFILLED`:
        //     return {
        //         ...state,
        //         user_id: payload.data.user_id,
        //         name: payload.data.name,
        //         username: payload.data.username,
        //         loading: false
        //     };
        // case `${REGISTER_USER}_REJECTED`:
        //     return {
        //         ...state,
        //         user_id: null,
        //         name: "",
        //         username: "",
        //         loading: false
        //     };
        // case `${LOGIN_USER}_PENDING`:
        //     return {
        //         ...state,
        //         loading: true
        //     };
        // case `${LOGIN_USER}_FULFILLED`:
        //     return {
        //         ...state,
        //         user_id: payload.data.user_id,
        //         name: payload.data.name,
        //         username: payload.data.username,
        //         loading: false
        //     };
        case LOGIN_USER:
            return {
                ...state,
                user_id: payload.user_id,
                name: payload.name,
                username: payload.username,
                user_phone_number: payload.user_phone_number
            };
        // case `${LOGIN_USER}_REJECTED`:
        //     return {
        //         ...state,
        //         user_id: null,
        //         name: "",
        //         username: "",
        //         loading: false
        //     };
        case `${LOGOUT_USER}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${LOGOUT_USER}_FULFILLED`:
            return {
                ...state,
                user_id: null,
                name: "",
                username: "",
                loading: false
            };
        case `${UPDATE_NAME}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${UPDATE_NAME}_FULFILLED`:
            return {
                ...state,
                name: payload.data.name,
                loading: false
            };
        case `${UPDATE_USERNAME}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${UPDATE_USERNAME}_FULFILLED`:
            return {
                ...state,
                username: payload.data.username,
                loading: false
            };
        case `${UPDATE_USER_PHONE_NUMBER}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${UPDATE_USER_PHONE_NUMBER}_FULFILLED`:
            return {
                ...state,
                user_phone_number: payload.data.user_phone_number,
                loading: false
            };
        case `${DELETE_USER}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${DELETE_USER}_FULFILLED`:
            return {
                ...state,
                user_id: null,
                name: "",
                username: "",
                user_phone_number: "",
                loading: false
            };
        default:
            return state;
    };
};