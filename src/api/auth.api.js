const login = (username, password) =>
  fetch(`https://xebiascart.herokuapp.com/users?username=${username}`)
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('loggedInUser', JSON.stringify(data[0]))
  })

export { login }
