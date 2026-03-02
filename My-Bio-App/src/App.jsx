import Header from './components/Header'
import About from './components/About'
import SkillsList from './components/SkillsList'
import SocialLinks from './components/SocialLinks'

function App() {
  const bioData = {
    name: "Manikandan",
    title: "Full Stack Developer",
    bio: "I build clean and thoughtful software.",
    skills: ["React", "JavaScript", "CSS", "Node.js"],
    links: [
      { label: "GitHub", url: "https://github.com" },
      { label: "LinkedIn", url: "https://linkedin.com" },
      { label: "Twitter", url: "https://twitter.com" },
    ]
  }

  return (
    <div>
      <Header name={bioData.name} title={bioData.title} />
      <About bio={bioData.bio} />
      <SkillsList skills={bioData.skills} />
      <SocialLinks links={bioData.links} />
    </div>
  )
}

export default App
