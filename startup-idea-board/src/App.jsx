import { useState } from "react";
import "./App.css"
import IdeaForm from "./components/IdeaForm"
import IdeaList from "./components/IdeaList"

function App(){
  const[ideas,setIdeas] = useState([])
  function addIdea(text){
    const newIdea = {
        id: Date.now(),
        text : text,
        vote : 0
    }
    setIdeas([...ideas,newIdea])
  }
  function upvoteIdea(id){
      setIdeas(
        ideas.map(idea => idea.id === id ? {...idea,vote:idea.vote+1} : idea)
      )
  }

  function deleteIdea(id){
    setIdeas(ideas.filter(idea => idea.id !== id))
  }
  return(
    <div>
      <h1>Startup Idea Voting Board</h1>
      <IdeaForm addIdea = {addIdea}/>
      <IdeaList 
        ideas = {ideas}
        upvoteIdea = {upvoteIdea}
        deleteIdea = {deleteIdea}
        />
    </div>
  )
}
export default App