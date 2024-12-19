const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId , makeLorem} from '../util.service'

import { vendorService as local } from './vendor.service.local'
import { vendorService as remote } from './vendor.service.remote'

function getEmptyVendor() {
	return {
		name: makeId(),
        category: makeLorem(), 
		rating: getRandomIntInclusive(0, 5),
        deliveryTime: "20-30 min",
		products: [],
	}
}

function getDefaultFilter() {
    return {
        txt: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
console.log('service',service)

export const vendorService = { getEmptyVendor, getDefaultFilter, ...service }


if (DEV) window.vendorService = vendorService  
