document.addEventListener('DOMContentLoaded', setUpPage())

// const apiPublicKey = `6fe07e820cba083ae259838117ced692`
// const apiPrivateKey = `7c03c2f6964e1445638d9a0348b9a19c334d32c6`

function setUpPage() {
    fetchCharacters()
}

function fetchCharacters() {
    const apiPublicKey = `6fe07e820cba083ae259838117ced692`
    const apikey = `&apikey=`
    const charactersUrl = `https://gateway.marvel.com:443/v1/public/characters?limit=10`

    fetch(charactersUrl + apikey + apiPublicKey)
        .then(res => res.json())
        .then(data => mapCharacter(data))

}

function mapCharacter(data) {
    data.data.results.map(character => characterCard(character))
}

function characterCard(character) {
    const size = 'standard_large'
    const imgURL = character.thumbnail.path
    const jpg = character.thumbnail.extension
    console.log(character.thumbnail.extension)
    let main = document.querySelector('.character-card')
    main.innerHTML += `<div class="card">
    <div class="image">
      <img src="${imgURL + `/` + size + `.` + jpg}">
    </div>
    <div class="content">
      <a class="header">${character.name}</a>
      <div class="meta">
        <span class="date">${character.modified}</span>
      </div>
      <div class="description">
        ${character.description}
      </div>
    </div>
    <div class="extra content">
      <a>
        <i class="user icon"></i>
        Included in ${character.stories.available} Stories
      </a>
    </div>
    <br>
    <br>
  </div>`
    console.log(character)

}