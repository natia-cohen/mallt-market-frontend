import { httpService } from '../http.service'

export const storeService = {
    query,
    getById,
    save,
    remove,
    addStoreMsg
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`store`, filterBy)  // שונה מ-'car' ל-'store'
}

function getById(storeId) {
    return httpService.get(`store/${storeId}`)  // שונה מ-'carId' ל-'storeId'
}

async function remove(storeId) {
    return httpService.delete(`store/${storeId}`)  // שונה מ-'carId' ל-'storeId'
}

async function save(store) {
    var savedStore
    if (store._id) {
        savedStore = await httpService.put(`store/${store._id}`, store)  // שונה מ-'car' ל-'store'
    } else {
        savedStore = await httpService.post('store', store)  // שונה מ-'car' ל-'store'
    }
    return savedStore
}

async function addStoreMsg(storeId, txt) {
    const savedMsg = await httpService.post(`store/${storeId}/msg`, {txt})  // שונה מ-'carId' ל-'storeId'
    return savedMsg
}
