import { Link } from 'react-router-dom'

export function StorePreview({ store }) {
    return (
        <article className="preview">
               <pre>{JSON.stringify(store, null, 2)}</pre>
             {/* <header>
                <Link to={`/store/${store._id}`}>{store.name}</Link>  
            </header> */}

{/* 

           <p>Category: {store.category}</p>
            <p>Rating: {store.rating}</p>
            <p>Delivery Time: {store.deliveryTime}</p>
            <img src={store.imageUrl} alt={`${store.name} image`} style={{ width: "150px", height: "auto" }} /> */}

            {/* <p>Rating: <span>{store.rating} </span></p>
            {store.owner && <p>Owner: <span>{store.owner.fullname}</span></p>} */}
        </article>
    )
}
