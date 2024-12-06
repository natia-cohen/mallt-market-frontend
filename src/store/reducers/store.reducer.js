export const SET_STORES = 'SET_STORES'
export const SET_STORE = 'SET_STORE'
export const REMOVE_STORE = 'REMOVE_STORE'
export const ADD_STORE = 'ADD_STORE'
export const UPDATE_STORE = 'UPDATE_STORE'
export const ADD_STORE_MSG = 'ADD_STORE_MSG'

const initialState = {
    stores: [],
    store: null
}

export function storeReducer(state = initialState, action) {
    var newState = state
    var stores 
    switch (action.type) {
        case SET_STORES:
            console.log('action.stores',action.stores)
            newState = { ...state, stores: action.stores }
            console.log('newState',newState)
            break
        case SET_STORE:
            newState = { ...state, store: action.store }
            break
        case REMOVE_STORE:
            const lastRemovedStore = state.stores.find(store => store._id === action.storeId)
            stores = state.stores.filter(store => store._id !== action.storeId)
            newState = { ...state, stores, lastRemovedStore }
            break
        case ADD_STORE:
            newState = { ...state, stores: [...state.stores, action.store] }
            break
        case UPDATE_STORE:
            stores = state.stores.map(store => (store._id === action.store._id) ? action.store : store)
            newState = { ...state, stores }
            break
        case ADD_STORE_MSG:
            newState = { ...state, store: { ...state.store, msgs: [...state.store.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const store1 = { _id: 'b101', name: 'Store ' + parseInt(Math.random() * 10), msgs: [] }
    const store2 = { _id: 'b102', name: 'Store ' + parseInt(Math.random() * 10), msgs: [] }

    state = storeReducer(state, { type: SET_STORES, stores: [store1] })
    console.log('After SET_STORES:', state)

    state = storeReducer(state, { type: ADD_STORE, store: store2 })
    console.log('After ADD_STORE:', state)

    state = storeReducer(state, { type: UPDATE_STORE, store: { ...store2, name: 'Good' } })
    console.log('After UPDATE_STORE:', state)

    state = storeReducer(state, { type: REMOVE_STORE, storeId: store2._id })
    console.log('After REMOVE_STORE:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = storeReducer(state, { type: ADD_STORE_MSG, storeId: store1._id, msg })
    console.log('After ADD_STORE_MSG:', state)

    state = storeReducer(state, { type: REMOVE_STORE, storeId: store1._id })
    console.log('After REMOVE_STORE:', state)
}
