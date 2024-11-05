import { legacy_createStore as createStore, combineReducers } from 'redux'

import { itemReducer } from './reducers/item.reducer'  // שינוי מ-carReducer ל-itemReducer
import { userReducer } from './reducers/user.reducer'
import { reviewReducer } from './reducers/review.reducer'
import { systemReducer } from './reducers/system.reducer'

const rootReducer = combineReducers({
    itemModule: itemReducer,  // שינוי מ-carModule ל-itemModule
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })
