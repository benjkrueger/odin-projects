
export default function Card({id, name, image_url, onClick}) {
    return (<div className="card" onClick={onClick}>
        <h2>{name}</h2>
        <img src={image_url}></img>
    </div>)
} 