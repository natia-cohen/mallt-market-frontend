const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId , makeLorem} from '../util.service'

import { storeService as local } from './store.service.local'
import { storeService as remote } from './store.service.remote'

function getEmptyStore() {
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

export const storeService = { getEmptyStore, getDefaultFilter, ...service }


if (DEV) window.storeService = storeService  
