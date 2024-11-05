import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStores, addStore, updateStore, removeStore, addStoreMsg } from '../store/actions/store.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { storeService } from '../services/store/store'
import { userService } from '../services/user'

import { StoreList } from '../cmps/StoreList'
import { StoreFilter } from '../cmps/StoreFilter'

export function StoreIndex() {

    const [ filterBy, setFilterBy ] = useState(storeService.getDefaultFilter())
    const stores = useSelector(storeState => storeState.storeModule.stores)

    useEffect(() => {
        loadStores(filterBy)
    }, [filterBy])

    async function onRemoveStore(storeId) {
        try {
            await removeStore(storeId)
            showSuccessMsg('Store removed')            
        } catch (err) {
            showErrorMsg('Cannot remove store')
        }
    }

    async function onAddStore() {
        const store = storeService.getEmptyStore()
        store.name = prompt('Store name?')
        try {
            const savedStore = await addStore(store)
            showSuccessMsg(`Store added (id: ${savedStore._id})`)
        } catch (err) {
            showErrorMsg('Cannot add store')
        }        
    }

    async function onUpdateStore(store) {
        const speed = +prompt('New speed?', store.speed)
        if(speed === 0 || speed === store.speed) return

        const storeToSave = { ...store, speed }
        try {
            const savedStore = await updateStore(storeToSave)
            showSuccessMsg(`Store updated, new speed: ${savedStore.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update store')
        }        
    }

    return (
        <main className="store-index">
            <header>
                <h2>Stores</h2>
                {userService.getLoggedinUser() && <button onClick={onAddStore}>Add an Store</button>}
            </header>
            <StoreFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <StoreList 
                stores={stores}
                onRemoveStore={onRemoveStore} 
                onUpdateStore={onUpdateStore}/>
        </main>
    )
}
