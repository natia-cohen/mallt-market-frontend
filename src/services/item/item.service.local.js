import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'item'  // שונה מ-'car' ל-'item'

export const itemService = {
    query,
    getById,
    save,
    remove,
    addItemMsg
}
window.is = itemService  // שונה מ-cs ל-is (itemService)


async function query(filterBy = { txt: '', price: 0 }) {
    var items = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        items = items.filter(item => regex.test(item.name) || regex.test(item.description))  // שונה מ-'vendor' ל-'name'
    }
    if (minSpeed) {
        items = items.filter(item => item.speed >= minSpeed)
    }
    if(sortField === 'name' || sortField === 'owner'){  // שונה מ-'vendor' ל-'name'
        items.sort((item1, item2) => 
            item1[sortField].localeCompare(item2[sortField]) * +sortDir)
    }
    if(sortField === 'price' || sortField === 'speed'){
        items.sort((item1, item2) => 
            (item1[sortField] - item2[sortField]) * +sortDir)
    }
    
    items = items.map(({ _id, name, price, speed, owner }) => ({ _id, name, price, speed, owner }))  // שונה מ-'vendor' ל-'name'
    return items
}

function getById(itemId) {
    return storageService.get(STORAGE_KEY, itemId)  // שונה מ-'carId' ל-'itemId'
}

async function remove(itemId) {
    await storageService.remove(STORAGE_KEY, itemId)  // שונה מ-'carId' ל-'itemId'
}

async function save(item) {
    var savedItem
    if (item._id) {
        const itemToSave = {
            _id: item._id,
            price: item.price,
            speed: item.speed,
        }
        savedItem = await storageService.put(STORAGE_KEY, itemToSave)
    } else {
        const itemToSave = {
            name: item.name,  // שונה מ-'vendor' ל-'name'
            price: item.price,
            speed: item.speed,
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedItem = await storageService.post(STORAGE_KEY, itemToSave)
    }
    return savedItem
}

async function addItemMsg(itemId, txt) {
    const item = await getById(itemId)  // שונה מ-'carId' ל-'itemId'

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    item.msgs.push(msg)
    await storageService.put(STORAGE_KEY, item)

    return msg
}
