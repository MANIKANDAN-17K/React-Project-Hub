function Header({name,title = "web Developer"}) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  )
}

export default Header