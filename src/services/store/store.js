const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { storeService as local } from './store.service.local'
import { storeService as remote } from './store.service.remote'

function getEmptyStore() {
	return {
		name: makeId(),  
		speed: getRandomIntInclusive(80, 240),
		msgs: [],
	}
}

function getDefaultFilter() {
    return {
        txt: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
console.log('VITE_LOCAL:', VITE_LOCAL);
export const storeService = { getEmptyStore, getDefaultFilter, ...service }


if (DEV) window.storeService = storeService  
