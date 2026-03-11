import IdeaCard from "./IdeaCard"
function IdeaList({ideas,upvoteIdea,deleteIdea}){
    return(
        <div>
            {ideas.map(idea => (<IdeaCard key = {idea.id} idea = {idea} upvoteIdea={upvoteIdea} deleteIdea = {deleteIdea}/>))}
        </div>
    )
}

export default IdeaList