// const redux = require('redux');
// const createStore = redux.createStore;
// const combineReducer = redux.combineReducers;
const { redux, createStore, combineReducers, applyMiddleware, } = require('redux');

// const applyMiddleware = redux.applyMiddleware;

const Buy_Chocolates = "Buy_Chocolates";
const Buy_Cakes = "Buy_Cakes";
const Buy_iceCreames = "Buy_iceCreames";

const intialStateChocolates = {
    numbersOfChocolates: 10
}
const intialStateCakes = {
    numbersOfCakes: 20
}

const intialStateiceCreames = {
    numbersOficeCreames: 24
}

// Action 1
function buy_Chocolates() {
    return {
        type: Buy_Chocolates,
        payload: "Buy Chocolate form Shop"
    }
}
// Action 2
function buy_Cakes() {
    return {
        type: Buy_Cakes,
        payload: "Buy Cakes form Cake Brakery"
    }
}
// Action 3
function buy_iceCreames() {
    return {
        type: Buy_iceCreames,
        payload: "Buy Icecreams form  Ice shop"
    }
}



// Reducers
const chocolateReducer = (state = intialStateChocolates, action) => {
    switch (action.type) {
        case "Buy_Chocolates": return {
            ...state,
            numbersOfChocolates: state.numbersOfChocolates - 1
        }
        default: return state;
    }
}

const cakesReducer = (state = intialStateCakes, action) => {
    switch (action.type) {
        case "Buy_Cakes": return {
            ...state,
            numbersOfCakes: state.numbersOfCakes - 1
        }
        default: return state;
    }
}

const iceCreamsReducer = (state = intialStateiceCreames, action) => {
    switch (action.type) {
        case "Buy_iceCreames": return {
            ...state,
            numbersOficeCreames: state.numbersOficeCreames - 1
        }
        default: return state;
    }
}
let logger = store => {
    return next => {
        return action => {
            let result = next(action);
            console.log("middleware log", result);
            return result;
        }
    }
}
// Combine Reducers
const rootReducer = combineReducers({
    Choco: chocolateReducer,
    Ice: iceCreamsReducer,
    Cake: cakesReducer
});
// let store = createStore(Reducer);
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("intial Store", store.getState());
// const unsubscribe = store.subscribe(() => { console.log('Update state Value', store.getState()) });
const unsubscribe = store.subscribe(() => {  });
store.dispatch(buy_Chocolates());
store.dispatch(buy_Cakes());
store.dispatch(buy_iceCreames());
unsubscribe();
