import { userService } from '../services/user'
import { VendorPreview } from './VendorPreview' 

export function VendorList({ vendors, onRemoveVendor, onUpdateVendor }) {
    console.log('vendors from VendorList:', vendors);
    if (!vendors || vendors.length === 0) return <p>No vendors available</p>;
    
    function shouldShowActionBtns(vendor) {
        return true
        // const user = userService.getLoggedinUser()
        
        // if (!user) return false
        // if (user.isAdmin) return true
        // return vendor.owner?._id === user._id
    }

    return (
        <section>
            <ul className="list">
                {vendors.map((vendor,index) => (
                    <li key={vendor._id || index}>
                        <VendorPreview vendor={vendor}/>  
                        {shouldShowActionBtns(vendor) && (
                            <div className="actions">
                                {/* <button onClick={() => onUpdateVendor(vendor)}>Edit</button> */}
                                <button onClick={() => onRemoveVendor(vendor._id)}>x</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
