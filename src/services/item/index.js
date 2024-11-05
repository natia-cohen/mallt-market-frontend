const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { itemService as local } from './item.service.local'
import { itemService as remote } from './item.service.remote'

function getEmptyItem() {
	return {
		name: makeId(),  // שונה מ-vendor ל-name כדי לשקף פריט גנרי יותר
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
export const itemService = { getEmptyItem, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.itemService = itemService  // שונה מ-carService ל-itemService
