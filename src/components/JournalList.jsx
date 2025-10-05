import { JournalCard } from "./JournalCard";

const JournalList = ({ journals }) => {
    return (
        <div className="flex">
            <div className="flex flex-wrap justify-center gap-4">
                    {journals.map((journal) => (
                    <JournalCard
                        key={journal._id}
                        itemId={journal._id}
                        coverImage={journal.coverImage}
                        title={journal.title}
                        author={journal.author}
                        category={journal.category}
                        publishYear={journal.publishYear}
                        issn={journal.issn}
                        volume={journal.volume}
                        issue={journal.issue}
                        description={journal.description}
                        publicationFrequency={journal.publicationFrequency}
                        itemType={journal.itemType}
                        edition={journal.edition}
                        publisher={journal.publisher}
                        pageCount={journal.pageCount}
                        language={journal.language}
                        genre={journal.genre}
                    />
                    ))}
            </div>
        </div>
    );
};
export default JournalList;