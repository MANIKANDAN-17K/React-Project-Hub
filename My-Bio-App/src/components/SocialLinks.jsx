function SocialLinks({ links }) {
  return (
    <div>
      <h2>Social Links</h2>
      {links.map((link) => (
        <a key={link.label} href={link.url}>
          <br></br>
          {link.label}
        </a>
      ))}
    </div>
  )
}

export default SocialLinks