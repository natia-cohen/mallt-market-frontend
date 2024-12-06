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


async function query(filterBy = { txt: '' }) {
    var stores = await storageService.query(STORAGE_KEY)
    console.log(stores)

    if (!stores || !stores.length) {
        stores = _getStores();
    
        await storageService.post(STORAGE_KEY, stores);
      }

    // const { txt } = filterBy

    // if (txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     stores = stores.filter(store => regex.test(store.name) || regex.test(store.description)) 
    // }
    // if (minSpeed) {
    //     stores = stores.filter(store => store.speed >= minSpeed)
    // }
    // if(sortField === 'name' || sortField === 'owner'){  
    //     stores.sort((store1, store2) => 
    //         store1[sortField].localeCompare(store2[sortField]) * +sortDir)
    // }
    // if(sortField === 'price' || sortField === 'speed'){
    //     stores.sort((store1, store2) => 
    //         (store1[sortField] - store2[sortField]) * +sortDir)
    // }
    
    // stores = stores.map(({ _id, name, category, rating, deliveryTime }) => ({ _id, name, category, rating, deliveryTime  }))
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
            deliveryTime: store.deliveryTime,
            rating: store.rating,
        }
        savedStore = await storageService.put(STORAGE_KEY, storeToSave)
    } else {
        const storeToSave = {
            name: store.name,  
            category: store.category,
            rating: store.rating,
            imageUrl: "https://example.com/pizza_heaven.jpg",
            products: []
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

function _getStores() {
    return [
      {
        _id: "s1",
        name: "Pizza Heaven",
        category: "Pizza",
        rating: 4.7,
        deliveryTime: "20-30 min",
        imageUrl: "https://images.unsplash.com/photo-1601924582978-4cc7d1d8fc3b",
        products: [
          {
            id: "p1",
            name: "Margherita Pizza",
            description: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
            price: 35,
            imageUrl: "https://images.unsplash.com/photo-1564936284899-3c7b5d0b7ec5",
          },
          {
            id: "p2",
            name: "Four Cheese Pizza",
            description: "Rich pizza with mozzarella, gouda, parmesan, and blue cheese.",
            price: 45,
            imageUrl: "https://images.unsplash.com/photo-1601924737686-f6d01a2ed853",
          }
        ],
      },
      {
        _id: "s2",
        name: "Sushi World",
        category: "Sushi",
        rating: 4.9,
        deliveryTime: "15-25 min",
        imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754",
        products: [
          {
            id: "p1",
            name: "Salmon Roll",
            description: "Fresh salmon roll with avocado and cucumber.",
            price: 50,
            imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
          },
          {
            id: "p2",
            name: "Tuna Sashimi",
            description: "Thinly sliced fresh tuna sashimi.",
            price: 60,
            imageUrl: "https://images.unsplash.com/photo-1553621042-7e6e9d41a7c5",
          }
        ],
      },
      {
        _id: "s3",
        name: "Burger Hub",
        category: "Burgers",
        rating: 4.6,
        deliveryTime: "25-35 min",
        imageUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        products: [
          {
            id: "p1",
            name: "Classic Burger",
            description: "Beef burger with lettuce, tomato, and cheese.",
            price: 55,
            imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
          },
          {
            id: "p2",
            name: "Bacon Cheeseburger",
            description: "Burger with bacon, cheddar cheese, and BBQ sauce.",
            price: 65,
            imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349",
          }
        ],
      }
    ];
}

  