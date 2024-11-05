import { userService } from '../services/user'
import { ItemPreview } from './ItemPreview'  // שונה מ-CarPreview ל-ItemPreview

export function ItemList({ items, onRemoveItem, onUpdateItem }) {
    
    function shouldShowActionBtns(item) {
        const user = userService.getLoggedinUser()
        
        if (!user) return false
        if (user.isAdmin) return true
        return item.owner?._id === user._id
    }

    return (
        <section>
            <ul className="list">
                {items.map(item => (
                    <li key={item._id}>
                        <ItemPreview item={item}/>  {/* שונה מ-CarPreview ל-ItemPreview */}
                        {shouldShowActionBtns(item) && (
                            <div className="actions">
                                <button onClick={() => onUpdateItem(item)}>Edit</button>
                                <button onClick={() => onRemoveItem(item._id)}>x</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
