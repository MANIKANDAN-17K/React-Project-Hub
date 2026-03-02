import SkillBadge from './SkillBadge'

function SkillsList({ skills }) {
  return (
    <div>
      <h2>Skills</h2>
      {skills.map((skill) => (
        <SkillBadge key={skill} skill={skill} />
      ))}
    </div>
  )
}

export default SkillsList