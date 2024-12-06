import { userService } from '../services/user'
import { StorePreview } from './StorePreview' 

export function StoreList({ stores, onRemoveStore, onUpdateStore }) {
    console.log('stors from list',stores)
    
    // function shouldShowActionBtns(store) {
    //     const user = userService.getLoggedinUser()
        
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return store.owner?._id === user._id
    // }

    return (
        <section>
            <ul className="list">
                {stores.map((store,index) => (
                    <li key={store._id || index}>
                        <StorePreview store={store}/>  
                        {/* {shouldShowActionBtns(store) && (
                            <div className="actions">
                                <button onClick={() => onUpdateStore(store)}>Edit</button>
                                <button onClick={() => onRemoveStore(store._id)}>x</button>
                            </div>
                        )} */}
                    </li>
                ))}
            </ul>
        </section>
    )
}
