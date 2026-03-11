function IdeaCard({idea,upvoteIdea,deleteIdea}){
    return(
        <div>
            <h2>{idea.text}</h2>
            <p>{idea.votes} vote</p>
            {idea.vote > 5 && <span> Trending </span>}
            <button onClick={() => upvoteIdea(idea.id)}>upVote</button>
            <button onClick={() => deleteIdea(idea.id)}>delete</button>
        </div>
    )
}
export default IdeaCard