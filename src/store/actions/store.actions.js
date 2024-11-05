import { storeService } from '../../services/store/store' 
import { store } from '../store'
import { ADD_STORE, REMOVE_STORE, SET_STORES, SET_STORE, UPDATE_STORE, ADD_STORE_MSG } from '../reducers/store.reducer' // כל פעולות ה-Redux שונו מ-Car ל-Store

export async function loadStores(filterBy) {
    try {
        const stores = await storeService.query(filterBy)
        store.dispatch(getCmdSetStores(stores))
    } catch (err) {
        console.log('Cannot load stores', err)
        throw err
    }
}

export async function loadStore(storeId) {
    try {
        const store = await storeService.getById(storeId)
        store.dispatch(getCmdSetStore(store))
    } catch (err) {
        console.log('Cannot load store', err)
        throw err
    }
}

export async function removeStore(storeId) {
    try {
        await storeService.remove(storeId)
        store.dispatch(getCmdRemoveStore(storeId))
    } catch (err) {
        console.log('Cannot remove store', err)
        throw err
    }
}

export async function addStore(store) {
    try {
        const savedStore = await storeService.save(store)
        store.dispatch(getCmdAddStore(savedStore))
        return savedStore
    } catch (err) {
        console.log('Cannot add store', err)
        throw err
    }
}

export async function updateStore(store) {
    try {
        const savedStore = await storeService.save(store)
        store.dispatch(getCmdUpdateStore(savedStore))
        return savedStore
    } catch (err) {
        console.log('Cannot save store', err)
        throw err
    }
}

export async function addStoreMsg(storeId, txt) {
    try {
        const msg = await storeService.addStoreMsg(storeId, txt)
        store.dispatch(getCmdAddStoreMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add store msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetStores(stores) {
    return {
        type: SET_STORES,
        stores
    }
}
function getCmdSetStore(store) {
    return {
        type: SET_STORE,
        store
    }
}
function getCmdRemoveStore(storeId) {
    return {
        type: REMOVE_STORE,
        storeId
    }
}
function getCmdAddStore(store) {
    return {
        type: ADD_STORE,
        store
    }
}
function getCmdUpdateStore(store) {
    return {
        type: UPDATE_STORE,
        store
    }
}
function getCmdAddStoreMsg(msg) {
    return {
        type: ADD_STORE_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadStores()
    await addStore(storeService.getEmptyStore()) // שונה מ-getEmptyCar ל-getEmptyStore
    await updateStore({
        _id: 'm1oC7',
        title: 'Store-Good',
    })
    await removeStore('m1oC7')
    // TODO unit test addStoreMsg
}
