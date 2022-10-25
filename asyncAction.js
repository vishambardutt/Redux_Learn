let redux = require('redux');
let createStore = redux.createStore;
let applyMiddleware = redux.applyMiddleware;
let thunkMiddleware = require('redux-thunk').default;
let axios = require('axios');

let initialState = {
    loading: false,
    users: [],
    error: ''
}

let USER_REQUEST = 'USER_REQUEST'
let USER_SUCCESS = 'USER_SUCCESS'
let USER_FAILURE = 'USER_FAILURE'

let UserRequest = () => {
    return {
        type: USER_REQUEST
    }
}

let UserSuccess = users => {
    return {
        type: USER_SUCCESS,
        payload: users
    }
}

let UserFailure = error => {
    return {
        type: USER_FAILURE,
        payload: error
    }
}

let reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''

            }
        case USER_FAILURE:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
    }
}

const fetchUser = () => {
    return function (dispatch) {
        dispatch(UserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                // response.data
                const users = response.data.map(user => user.id)
                dispatch(UserSuccess(users))
            })
            .catch(error => {
                // error.message
                dispatch(UserError(error.message))
            })
    }
}

let store = createStore(reducer, applyMiddleware(thunkMiddleware));
let unsubscribe = store.subscribe(() => { console.log(store.getState()) });
store.dispatch(fetchUser())


