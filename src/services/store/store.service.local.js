import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'store' 
export const storeService = {
    query,
    getById,
    save,
    remove,
    addStoreMsg
}
window.is = storeService  


async function query(filterBy = { txt: '', price: 0 }) {
    var stores = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stores = stores.filter(store => regex.test(store.name) || regex.test(store.description))  // שונה מ-'vendor' ל-'name'
    }
    if (minSpeed) {
        stores = stores.filter(store => store.speed >= minSpeed)
    }
    if(sortField === 'name' || sortField === 'owner'){  
        stores.sort((store1, store2) => 
            store1[sortField].localeCompare(store2[sortField]) * +sortDir)
    }
    if(sortField === 'price' || sortField === 'speed'){
        stores.sort((store1, store2) => 
            (store1[sortField] - store2[sortField]) * +sortDir)
    }
    
    stores = stores.map(({ _id, name, price, speed, owner }) => ({ _id, name, price, speed, owner }))  // שונה מ-'vendor' ל-'name'
    return stores
}

function getById(storeId) {
    return storageService.get(STORAGE_KEY, storeId)  
}

async function remove(storeId) {
    await storageService.remove(STORAGE_KEY, storeId) 
}

async function save(store) {
    var savedStore
    if (store._id) {
        const storeToSave = {
            _id: store._id,
            price: store.price,
            speed: store.speed,
        }
        savedStore = await storageService.put(STORAGE_KEY, storeToSave)
    } else {
        const storeToSave = {
            name: store.name,  
            price: store.price,
            speed: store.speed,
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedStore = await storageService.post(STORAGE_KEY, storeToSave)
    }
    return savedStore
}

async function addStoreMsg(storeId, txt) {
    const store = await getById(storeId)  

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    store.msgs.push(msg)
    await storageService.put(STORAGE_KEY, store)

    return msg
}
