const redux = require('redux');
const createStore = redux.createStore;

const Buy_Books = "Buy_Books";

const intialState = {
    numbersOfBooks: 10,
    // numbersofCurd: 20
}
// Action creater wrapping single function
function buy_Books() {
    return {
        type: Buy_Books,
        info: "This is my First Redux Tutorials"
    }
}

// previousState, action = newStore;
// Reducer
const Reducer = (state = intialState, action) => {
    switch (action.type) {
        case "Buy_Books": return {
            ...state,
            numbersOfBooks: state.numbersOfBooks - 1
        }
        default: return state;
    }
}
// Pass reducer in store

const store = createStore(Reducer);
console.log("intial Store", store.getState());
const unsubscribe = store.subscribe(() => { console.log('Update state Value', store.getState())});
store.dispatch(buy_Books());
store.dispatch(buy_Books());
store.dispatch(buy_Books());
store.dispatch(buy_Books());
unsubscribe();
