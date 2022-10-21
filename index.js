const redux = require('redux');
const createStore = redux.createStore;

const Buy_Chocolates = "Buy_Chocolates";
const Buy_Cakes = "Buy_Cakes";
const Buy_iceCreams = "Buy_iceCreams";

const intialState = {
    numbersOfChocolates: 10,
    numbersOfCakes: 20,
    numbersOficeCreams:24
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
function buy_iceCreams() {
    return {
        type: Buy_iceCreams,
        payload: "Buy Icecreams form Cake Ice shop"
    }
}


// previousState, action = newStore;
// Reducer
const Reducer = (state = intialState, action) => {
    switch (action.type) {
        case "Buy_Chocolates": return {
            ...state,
            numbersOfChocolates: state.numbersOfChocolates - 1
        }
        // Second Reducer
        case "Buy_Cakes": return {
            ...state,
            numbersOfCakes: state.numbersOfCakes - 1
        }
        case "Buy_iceCreams": return {
            ...state,
            numbersOficeCreams: state.numbersOficeCreams - 2
        }
        default: return state;
    }
}
// Pass reducer in store

const store = createStore(Reducer);
console.log("intial Store", store.getState());
const unsubscribe = store.subscribe(() => { console.log('Update state Value', store.getState())});
store.dispatch(buy_Chocolates());
store.dispatch(buy_Chocolates());
store.dispatch(buy_Chocolates());
store.dispatch(buy_Chocolates());
store.dispatch(buy_Cakes());
store.dispatch(buy_Cakes());
store.dispatch(buy_iceCreams());
store.dispatch(buy_iceCreams());
unsubscribe();
