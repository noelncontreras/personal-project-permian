import axios from "axios";

//initialState
const initialState = {
    user_id: null,
    name: "",
    username: "",
    loading: false
};

//constants
const GET_SESSION = "GET_SESSION";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

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

//reducer
export default function reducer(state=initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case `${GET_SESSION}_PENDING`:
            return {
                ...state,
            }
        case `${GET_SESSION}_FULFILLED`:
            return {
                ...state,
                user_id: payload.data.user_id,
                name: payload.data.name,
                username: payload.data.username,
                loading: false
            }
            case REGISTER_USER:
                    return {
                        ...state,
                        user_id: payload.user_id,
                        name: payload.name,
                        username: payload.username,
                    }
        // case `${REGISTER_USER}_PENDING`:
        //     return {
        //         ...state,
        //         loading: true
        //     }
        // case `${REGISTER_USER}_FULFILLED`:
        //     return {
        //         ...state,
        //         user_id: payload.data.user_id,
        //         name: payload.data.name,
        //         username: payload.data.username,
        //         loading: false
        //     }
        // case `${REGISTER_USER}_REJECTED`:
        //     return {
        //         ...state,
        //         user_id: null,
        //         name: "",
        //         username: "",
        //         loading: false
        //     }
        // case `${LOGIN_USER}_PENDING`:
        //     return {
        //         ...state,
        //         loading: true
        //     }
        // case `${LOGIN_USER}_FULFILLED`:
        //     return {
        //         ...state,
        //         user_id: payload.data.user_id,
        //         name: payload.data.name,
        //         username: payload.data.username,
        //         loading: false
        //     }
        case LOGIN_USER:
            return {
                ...state,
                user_id: payload.user_id,
                name: payload.name,
                username: payload.username,
            }
        // case `${LOGIN_USER}_REJECTED`:
        //     return {
        //         ...state,
        //         user_id: null,
        //         name: "",
        //         username: "",
        //         loading: false
        //     }
        case `${LOGOUT_USER}_PENDING`:
            return {
                ...state,
                loading: true
            }
        case `${LOGOUT_USER}_FULFILLED`:
            return {
                ...state,
                user_id: null,
                name: "",
                username: "",
                loading: false
            }
        default:
            return state;
    };
};