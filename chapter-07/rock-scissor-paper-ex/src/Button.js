function Button ({ children, onClick }) {
  return <button className="App-reset" onClick={onClick}>{children}</button>
}

export default Button;