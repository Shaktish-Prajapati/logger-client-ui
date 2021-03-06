import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {ADMIN_LOGOUT} from './constants/AdminConstants'

import {
    adminLoginReducer,
    adminRegisterReducer,
} from "./reducers/AdminReducer"

import {
    getAllProjectReducer,
    getAllLogByCodeReducer,
    createNewProjectReducer,
    getLogCountsReducer,
    getLogCountsByDateReducer
} from './reducers/ProjectReducer'



// const rootReducer = combineReducers({
//     adminLoginReducer,
//     adminRegisterReducer,
    
//     getAllProjectReducer,
//     getAllLogByCodeReducer,
//     createNewProjectReducer
// })

const appReducer = combineReducers({
    adminLoginReducer,
    adminRegisterReducer,
    
    getAllProjectReducer,
    getAllLogByCodeReducer,
    createNewProjectReducer,
    getLogCountsReducer,
    getLogCountsByDateReducer

})

const persistConf = {
    key:'root',
    storage,
}

const rootReducer = (state, action) => {
    // console.log('root reducer')
    if (action.type === ADMIN_LOGOUT) {
        // for all keys defined in your persistConfig(s)
        storage.removeItem('persist:root')
        // storage.removeItem('persist:otherKey')

        return appReducer(undefined, action);
    }
    return appReducer(state, action);
}

// const initialState = {}
const persistedReducer = persistReducer(persistConf, rootReducer)

const middleware = [thunk]

const store  = createStore(
    // rootReducer,
    persistedReducer,
    // initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)
export default store;


