export const SET_VENDORS = 'SET_VENDORS'
export const SET_VENDOR = 'SET_VENDOR'
export const REMOVE_VENDOR = 'REMOVE_VENDOR'
export const ADD_VENDOR = 'ADD_VENDOR'
export const UPDATE_VENDOR = 'UPDATE_VENDOR'
export const ADD_VENDOR_MSG = 'ADD_VENDOR_MSG'

const initialState = {
    vendors: [],
    vendor: null
}

export function vendorReducer(state = initialState, action) {
    var newState = state
    var vendors 
    switch (action.type) {
        case SET_VENDORS:
            console.log('action.vendors',action.vendors)
            newState = { ...state, vendors: action.vendors }
            console.log('newState',newState)
            break
        case SET_VENDOR:
            newState = { ...state, vendor: action.vendor }
            break
        case REMOVE_VENDOR:
            const lastRemovedVendor = state.vendors.find(vendor => vendor._id === action.vendorId)
            vendors = state.vendors.filter(vendor => vendor._id !== action.vendorId)
            newState = { ...state, vendors, lastRemovedVendor }
            break
        case ADD_VENDOR:
            newState = { ...state, vendors: [...state.vendors, action.vendor] }
            break
        case UPDATE_VENDOR:
            vendors = state.vendors.map(vendor => (vendor._id === action.vendor._id) ? action.vendor : vendor)
            newState = { ...state, vendors }
            break
        case ADD_VENDOR_MSG:
            newState = { ...state, vendor: { ...state.vendor, msgs: [...state.vendor.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const vendor1 = { _id: 'b101', name: 'Vendor ' + parseInt(Math.random() * 10), msgs: [] }
    const vendor2 = { _id: 'b102', name: 'Vendor ' + parseInt(Math.random() * 10), msgs: [] }

    state = vendorReducer(state, { type: SET_VENDORS, vendors: [vendor1] })
    console.log('After SET_VENDORS:', state)

    state = vendorReducer(state, { type: ADD_VENDOR, vendor: vendor2 })
    console.log('After ADD_VENDOR:', state)

    state = vendorReducer(state, { type: UPDATE_VENDOR, vendor: { ...vendor2, name: 'Good' } })
    console.log('After UPDATE_VENDOR:', state)

    state = vendorReducer(state, { type: REMOVE_VENDOR, vendorId: vendor2._id })
    console.log('After REMOVE_VENDOR:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = vendorReducer(state, { type: ADD_VENDOR_MSG, vendorId: vendor1._id, msg })
    console.log('After ADD_VENDOR_MSG:', state)

    state = vendorReducer(state, { type: REMOVE_VENDOR, vendorId: vendor1._id })
    console.log('After REMOVE_VENDOR:', state)
}
