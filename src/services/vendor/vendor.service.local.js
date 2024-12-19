import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'vendor' 
export const vendorService = {
    query,
    getById,
    save,
    remove,
    addVendorMsg
}
window.is = vendorService  


async function query(filterBy = { txt: '' }) {

  
    var vendors = await storageService.query(STORAGE_KEY)
    console.log(vendors)

    if (!vendors || !vendors.length) {
        vendors = _getVendors();
    
        await storageService.post(STORAGE_KEY, vendors);
      }

    // const { txt } = filterBy

    // if (txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     vendors = vendors.filter(vendor => regex.test(vendor.name) || regex.test(vendor.description)) 
    // }
    // if (minSpeed) {
    //     vendors = vendors.filter(vendor => vendor.speed >= minSpeed)
    // }
    // if(sortField === 'name' || sortField === 'owner'){  
    //     vendors.sort((vendor1, vendor2) => 
    //         vendor1[sortField].localeCompare(vendor2[sortField]) * +sortDir)
    // }
    // if(sortField === 'price' || sortField === 'speed'){
    //     vendors.sort((vendor1, vendor2) => 
    //         (vendor1[sortField] - vendor2[sortField]) * +sortDir)
    // }
    
    // vendors = vendors.map(({ _id, name, category, rating, deliveryTime }) => ({ _id, name, category, rating, deliveryTime  }))
    return vendors
}

function getById(vendorId) {
    return storageService.get(STORAGE_KEY, vendorId)  
}

async function remove(vendorId) {
  console.log('remove from servis',vendorId)
    await storageService.remove(STORAGE_KEY, vendorId) 
}

async function save(vendor) {
    var savedVendor
    if (vendor._id) {
        const vendorToSave = {
            _id: vendor._id,
            deliveryTime: vendor.deliveryTime,
            rating: vendor.rating,
        }
        savedVendor = await storageService.put(STORAGE_KEY, vendorToSave)
    } else {
        const vendorToSave = {
            name: vendor.name,  
            category: vendor.category,
            rating: vendor.rating,
            imageUrl: "https://example.com/pizza_heaven.jpg",
            products: []
        }
        savedVendor = await storageService.post(STORAGE_KEY, vendorToSave)
    }
    return savedVendor
}

async function addVendorMsg(vendorId, txt) {
    const vendor = await getById(vendorId)  

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    vendor.msgs.push(msg)
    await storageService.put(STORAGE_KEY, vendor)

    return msg
}

function _getVendors() {
  return [
    {
      id: "s1", // ספק 1
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
        },
      ],
    },
    {
      id: "s2", // ספק 2
      name: "Burger Bliss",
      category: "Burgers",
      rating: 4.5,
      deliveryTime: "25-35 min",
      imageUrl: "https://images.unsplash.com/photo-1550317138-10000687a72b",
      products: [
        {
          id: "b1",
          name: "Classic Burger",
          description: "Juicy beef patty with lettuce, tomato, and house sauce.",
          price: 50,
          imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        },
        {
          id: "b2",
          name: "Cheese Lover Burger",
          description: "Beef patty loaded with cheddar and swiss cheese.",
          price: 60,
          imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        },
      ],
    },
    {
      id: "s3", // ספק 3
      name: "Sushi World",
      category: "Sushi",
      rating: 4.8,
      deliveryTime: "30-40 min",
      imageUrl: "https://images.unsplash.com/photo-1549407558-5d464242b017",
      products: [
        {
          id: "s1",
          name: "California Roll",
          description: "Crab, avocado, cucumber, and sesame seeds.",
          price: 40,
          imageUrl: "https://images.unsplash.com/photo-1583779568406-9ab61439d3b0",
        },
        {
          id: "s2",
          name: "Spicy Tuna Roll",
          description: "Fresh tuna, spicy mayo, and cucumber.",
          price: 45,
          imageUrl: "https://images.unsplash.com/photo-1576502200916-3808e07386a5",
        },
      ],
    },
  ];
}
