import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStore, addStoreMsg } from '../store/actions/store.actions'  // שונה מ-car.actions ל-store.actions

export function StoreDetails() {

  const {storeId} = useParams()  // שונה מ-carId ל-storeId
  const store = useSelector(storeState => storeState.storeModule.store)  // שונה מ-carModule ל-storeModule

  useEffect(() => {
    loadStore(storeId)  // שונה מ-loadCar ל-loadStore
  }, [storeId])

  async function onAddStoreMsg(storeId) {
    try {
        await addStoreMsg(storeId, 'bla bla ' + parseInt(Math.random() * 10))  // שונה מ-addCarMsg ל-addStoreMsg
        showSuccessMsg(`Store msg added`)
    } catch (err) {
        showErrorMsg('Cannot add store msg')
    }        
  }

  return (
    <section className="store-details">  {/* שונה מ-car-details ל-store-details */}
      <Link to="/store">Back to list</Link>  {/* שונה מ-/car ל-/store */}
      <h1>Store Details</h1>
      {store && <div>
        <h3>{store.name}</h3>  {/* שונה מ-vendor ל-name */}
        <h4>${store.price}</h4>
        <pre> {JSON.stringify(store, null, 2)} </pre>
      </div>
      }
      <button onClick={() => { onAddStoreMsg(store._id) }}>Add store msg</button>  {/* שונה מ-car ל-store */}
    </section>
  )
}
