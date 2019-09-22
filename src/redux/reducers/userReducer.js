import axios from "axios";

//initialState
const initialState = {
    user_id: null,
    username: "",
    name: ""
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
        payload: axios.post("/auth/register", newUser)
    };
};

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: axios.post("/auth/login", user)
    };
};

export function logoutUser() {
    axios.post("/auth/logout")
    return {
        type: LOGOUT_USER
    };
};

//reducer
export default function reducer(state=initialState, action) {
    const {type, payload} = action;

    switch(type) {
        default:
            return state;
    };
};