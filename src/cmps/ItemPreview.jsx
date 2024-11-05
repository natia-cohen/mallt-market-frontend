import { Link } from 'react-router-dom'

export function ItemPreview({ item }) {
    return (
        <article className="preview">
            <header>
                <Link to={`/item/${item._id}`}>{item.name}</Link>  {/* שונה מ-car.vendor ל-item.name */}
            </header>

            <p>Speed: <span>{item.speed.toLocaleString()} Km/h</span></p>
            {item.owner && <p>Owner: <span>{item.owner.fullname}</span></p>}
        </article>
    )
}
