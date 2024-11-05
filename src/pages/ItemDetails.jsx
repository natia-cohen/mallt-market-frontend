import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadItem, addItemMsg } from '../store/actions/item.actions'  // שונה מ-car.actions ל-item.actions

export function ItemDetails() {

  const {itemId} = useParams()  // שונה מ-carId ל-itemId
  const item = useSelector(storeState => storeState.itemModule.item)  // שונה מ-carModule ל-itemModule

  useEffect(() => {
    loadItem(itemId)  // שונה מ-loadCar ל-loadItem
  }, [itemId])

  async function onAddItemMsg(itemId) {
    try {
        await addItemMsg(itemId, 'bla bla ' + parseInt(Math.random() * 10))  // שונה מ-addCarMsg ל-addItemMsg
        showSuccessMsg(`Item msg added`)
    } catch (err) {
        showErrorMsg('Cannot add item msg')
    }        
  }

  return (
    <section className="item-details">  {/* שונה מ-car-details ל-item-details */}
      <Link to="/item">Back to list</Link>  {/* שונה מ-/car ל-/item */}
      <h1>Item Details</h1>
      {item && <div>
        <h3>{item.name}</h3>  {/* שונה מ-vendor ל-name */}
        <h4>${item.price}</h4>
        <pre> {JSON.stringify(item, null, 2)} </pre>
      </div>
      }
      <button onClick={() => { onAddItemMsg(item._id) }}>Add item msg</button>  {/* שונה מ-car ל-item */}
    </section>
  )
}
