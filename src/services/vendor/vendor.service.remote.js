import { httpService } from '../http.service'

export const vendorService = {
    query,
    getById,
    save,
    remove,
    addVendorMsg
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`vendor`, filterBy)  // שונה מ-'car' ל-'vendor'
}

function getById(vendorId) {
    return httpService.get(`vendor/${vendorId}`)  // שונה מ-'carId' ל-'vendorId'
}

async function remove(vendorId) {
    return httpService.delete(`vendor/${vendorId}`)  // שונה מ-'carId' ל-'vendorId'
}

async function save(vendor) {
    var savedVendor
    if (vendor._id) {
        savedVendor = await httpService.put(`vendor/${vendor._id}`, vendor)  // שונה מ-'car' ל-'vendor'
    } else {
        savedVendor = await httpService.post('vendor', vendor)  // שונה מ-'car' ל-'vendor'
    }
    return savedVendor
}

async function addVendorMsg(vendorId, txt) {
    const savedMsg = await httpService.post(`vendor/${vendorId}/msg`, {txt})  // שונה מ-'carId' ל-'vendorId'
    return savedMsg
}
