const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const initialState = {
    loading: false,
    user: [],
    error: ''
}

const USER_REQUEST = 'USER_REQUEST';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_ERROR = 'USER_ERROR';

const userRequest = (request) => {
    return {
        type: USER_REQUEST,

    }
}

const userSuccess = (users) => {
    return {
        type: USER_SUCCESS,
        payload: users
    }
}

const userError = (error) => {
    return {
        type: USER_ERROR,
        payload: error
    }
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case "USER_REQUEST": return {
            ...state, loading: true
        }
        case "USER_SUCCESS": return {
            loading: false, users: action.payload, error: ''
        }
        case "USER_ERROR": return {
            loading: false, users: [], error: action.payload
        }
    }
}
const fetchUser = () => {
    return function (dispatch) {
        dispatch(userRequest())
        axios.get('https://jsonplaceholder.tyicode.users')
            .then(response => {
                // response code
                const users = response.data.map(user => user.name)
                dispatch(userSuccess(users))
            }).catch(error => {
                dispatch(userError(error.message))

            })
    }
}
const store = createStore(Reducer, applyMiddleware(thunkMiddleware));
store.subscribe = (() => { console.log(store.getState()) });
store.dispatch(fetchUser());


