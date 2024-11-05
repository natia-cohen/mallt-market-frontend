import { httpService } from '../http.service'

export const itemService = {
    query,
    getById,
    save,
    remove,
    addItemMsg
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`item`, filterBy)  // שונה מ-'car' ל-'item'
}

function getById(itemId) {
    return httpService.get(`item/${itemId}`)  // שונה מ-'carId' ל-'itemId'
}

async function remove(itemId) {
    return httpService.delete(`item/${itemId}`)  // שונה מ-'carId' ל-'itemId'
}

async function save(item) {
    var savedItem
    if (item._id) {
        savedItem = await httpService.put(`item/${item._id}`, item)  // שונה מ-'car' ל-'item'
    } else {
        savedItem = await httpService.post('item', item)  // שונה מ-'car' ל-'item'
    }
    return savedItem
}

async function addItemMsg(itemId, txt) {
    const savedMsg = await httpService.post(`item/${itemId}/msg`, {txt})  // שונה מ-'carId' ל-'itemId'
    return savedMsg
}
