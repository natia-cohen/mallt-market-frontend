import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadVendor, addVendorMsg } from '../store/actions/vendor.actions' 

export function VendorDetails() {

  const {vendorId} = useParams() 
  const vendor = useSelector(storeState => storeState.vendorModule.vendor)  

  useEffect(() => {
    loadVendor(vendorId)  // שונה מ-loadCar ל-loadVendor
  }, [vendorId])

  async function onAddVendorMsg(vendorId) {
    try {
        await addVendorMsg(vendorId, 'bla bla ' + parseInt(Math.random() * 10))  // שונה מ-addCarMsg ל-addVendorMsg
        showSuccessMsg(`Vendor msg added`)
    } catch (err) {
        showErrorMsg('Cannot add vendor msg')
    }        
  }

  return (
    <section className="vendor-details">  
      <Link to="/vendor">Back to list</Link> 
      <h1>Vendor Details</h1>
      {vendor && <div>
        <h3>{vendor.name}</h3>  
        <h4>${vendor.price}</h4>
        <pre> {JSON.stringify(vendor, null, 2)} </pre>
      </div>
      }
      <button onClick={() => { onAddVendorMsg(vendor._id) }}>Add vendor msg</button> 
    </section>
  )
}
