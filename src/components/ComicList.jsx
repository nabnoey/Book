import { ComicCard } from "./ComicCard";

const ComicList = ({ comics }) => {
    return (
        <div className="flex">
            <div className="flex flex-wrap justify-center gap-4">
                {comics &&
                    comics.map((comic) => (
                        <ComicCard
                            key={comic._id}
                            itemId={comic._id}
                            title={comic.title}
                            author={comic.author}
                            category={comic.category}
                            publishYear={comic.publishYear}
                            isbn={comic.isbn}
                            status={comic.status}
                            coverImage={comic.coverImage}
                            description={comic.description}
                            location={comic.location}
                            addedDate={comic.addedDate}
                            itemType={comic.itemType}
                            edition={comic.edition}
                            publisher={comic.publisher}
                            pageCount={comic.pageCount}
                            language={comic.language}
                            genre={comic.genre}
                            series={comic.series}
                            volumeNumber={comic.volumeNumber}
                            illustrator={comic.illustrator}
                            colorType={comic.colorType}
                            targetAge={comic.targetAge}
                        />
                    ))}
            </div>
        </div>
    );
};
export default ComicList;