import ComicService from "../services/comic.service";

export const ComicCard = (props) => {
    const handleDelete = async (itemId) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this Comic?"
        );
        if (!isConfirmed) return;

        try {
            const response = await ComicService.deleteComic(itemId)
            if (response.status === 200) {
                alert("Comic deleted successfully!");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img src={props.coverImage
                    || "https://m.media-amazon.com/images/I/712pj+kPziL._UF1000,1000_QL80_.jpg"
                }  
                alt={props.itemType} />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{props.title}</h2>

                <p><strong>Author:</strong> {props.author} </p>
                <p><strong>Illustrator:</strong> {props.illustrator} </p>
                <p><strong>Series:</strong> {props.series} </p>
                <p><strong>Volume:</strong> {props.volumeNumber} </p>
                <p> <strong>Year:</strong> {props.publishYear} </p>
                <p> <strong>ISBN:</strong> {props.isbn} </p>
                <p> <strong>Category:</strong> {props.category} </p>
                <p> <strong>Color:</strong> {props.colorType} </p>
                <p> <strong>Target Age:</strong> {props.targetAge}</p>


                <div className="card-actions justify-end">
                    <button
                        onClick={() => handleDelete(props.itemId)}
                        className="btn btn-soft btn-error"
                    >
                        Delete
                    </button>
                    <a
                        href={"/updateComic/" + props.itemId}
                        className="btn btn-soft btn-warning"
                    >
                        Edit
                    </a>
                </div>

            </div>
        </div>
    );
};

export default ComicCard;
