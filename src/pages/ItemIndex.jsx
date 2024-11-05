import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadItems, addItem, updateItem, removeItem, addItemMsg } from '../store/actions/item.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { itemService } from '../services/item'
import { userService } from '../services/user'

import { ItemList } from '../cmps/ItemList'
import { ItemFilter } from '../cmps/ItemFilter'

export function ItemIndex() {

    const [ filterBy, setFilterBy ] = useState(itemService.getDefaultFilter())
    const items = useSelector(storeState => storeState.itemModule.items)

    useEffect(() => {
        loadItems(filterBy)
    }, [filterBy])

    async function onRemoveItem(itemId) {
        try {
            await removeItem(itemId)
            showSuccessMsg('Item removed')            
        } catch (err) {
            showErrorMsg('Cannot remove item')
        }
    }

    async function onAddItem() {
        const item = itemService.getEmptyItem()
        item.name = prompt('Item name?')
        try {
            const savedItem = await addItem(item)
            showSuccessMsg(`Item added (id: ${savedItem._id})`)
        } catch (err) {
            showErrorMsg('Cannot add item')
        }        
    }

    async function onUpdateItem(item) {
        const speed = +prompt('New speed?', item.speed)
        if(speed === 0 || speed === item.speed) return

        const itemToSave = { ...item, speed }
        try {
            const savedItem = await updateItem(itemToSave)
            showSuccessMsg(`Item updated, new speed: ${savedItem.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update item')
        }        
    }

    return (
        <main className="item-index">
            <header>
                <h2>Items</h2>
                {userService.getLoggedinUser() && <button onClick={onAddItem}>Add an Item</button>}
            </header>
            <ItemFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <ItemList 
                items={items}
                onRemoveItem={onRemoveItem} 
                onUpdateItem={onUpdateItem}/>
        </main>
    )
}
