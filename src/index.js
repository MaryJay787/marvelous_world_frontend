document.addEventListener('DOMContentLoaded', setUpPage())

// const apiPublicKey = `6fe07e820cba083ae259838117ced692`
// const apiPrivateKey = `7c03c2f6964e1445638d9a0348b9a19c334d32c6`
// const charactersUrl = `https://gateway.marvel.com:443/v1/public/characters?limit=10`

function setUpPage() {
    fetchCharacters()
}

function fetchCharacters() {

    const apiPublicKey = `6fe07e820cba083ae259838117ced692`
    const apiPrivateKey = `7c03c2f6964e1445638d9a0348b9a19c334d32c6`

    fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=10&apikey=${apiPublicKey}`)
        .then(res => res.json())
        .then(data => mapCharacter(data))

}

function mapCharacter(data) {
    data.data.results.map(character => characterCard(character))
}

function characterCard(character) {
    let main = document.querySelector('.character-card')
    main.innerHTML += `<div class="card">
    <div class="image">
      <img src="${character}">
    </div>
    <div class="content">
      <a class="header">${character.name}</a>
      <div class="meta">
        <span class="date">Joined in 2013</span>
      </div>
      <div class="description">
        ${character.description}
      </div>
    </div>
    <div class="extra content">
      <a>
        <i class="user icon"></i>
        22 Friends
      </a>
    </div>
  </div>`
    console.log(character)

}