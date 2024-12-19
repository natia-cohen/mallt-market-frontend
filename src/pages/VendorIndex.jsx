import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadVendors, addVendor, updateVendor, removeVendor, addVendorMsg } from '../store/actions/vendor.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { vendorService } from '../services/vendor/vendor'
import { userService } from '../services/user'

import { VendorList } from '../cmps/VendorList'
import { VendorFilter } from '../cmps/VendorFilter'

export function VendorIndex() {

    const vendors = useSelector(storeState => storeState.vendorModule.vendors)
    console.log("vendors useSelector ",vendors)

    // const [ filterBy, setFilterBy ] = useState(vendorService.getDefaultFilter())
    const [ filterBy, setFilterBy ] = useState('')

    useEffect(() => {
        if (vendors.length === 0) {
            loadVendors(filterBy);  
        }
    }, [filterBy, vendors.length])
 
    useEffect(() => {
        console.log("Vendors have been updated:", vendors)
    }, [vendors])


    // useEffect(() => {
    //     loadVendors(filterBy)
    // }, [vendors.length,filterBy])


    async function onRemoveVendor(vendorId) {
        try {
            await removeVendor(vendorId)
            showSuccessMsg('Vendor removed')            
        } catch (err) {
            showErrorMsg('Cannot remove vendor')
        }
    }

    // async function onAddVendor() {
    //     const vendor = vendorService.getEmptyVendor()
    //     vendor.name = prompt('Vendor name?')
    //     try {
    //         const savedVendor = await addVendor(vendor)
    //         showSuccessMsg(`Vendor added (id: ${savedVendor._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add vendor')
    //     }        
    // }

    // async function onUpdateVendor(vendor) {
    //     const speed = +prompt('New speed?', vendor.speed)
    //     if(speed === 0 || speed === vendor.speed) return

    //     const vendorToSave = { ...vendor, speed }
    //     try {
    //         const savedVendor = await updateVendor(vendorToSave)
    //         showSuccessMsg(`Vendor updated, new speed: ${savedVendor.speed}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update vendor')
    //     }        
    // }

    return (
        <main className="vendor-index">
            <header>
                <h2>Vendors</h2>
                {/* {userService.getLoggedinUser() && <button onClick={onAddVendor}>Add an Vendor</button>} */}
            </header>
            {/* <VendorFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}

            {vendors.length > 0 ? (
            <VendorList 
                vendors={vendors}
                onRemoveVendor={onRemoveVendor} 
                // onUpdateVendor={onUpdateVendor}
            />
        ) : (
            <p>No vendors available</p> // או הודעה אחרת להראות אם אין vendors
        )}
        </main>
    )
}
