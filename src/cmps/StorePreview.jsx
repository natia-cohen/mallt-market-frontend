import { Link } from 'react-router-dom'

export function StorePreview({ store }) {
    return (
        <article className="preview">
            <header>
                <Link to={`/store/${store._id}`}>{store.name}</Link>  {/* שונה מ-car.vendor ל-store.name */}
            </header>

            <p>Speed: <span>{store.speed.toLocaleString()} Km/h</span></p>
            {store.owner && <p>Owner: <span>{store.owner.fullname}</span></p>}
        </article>
    )
}
