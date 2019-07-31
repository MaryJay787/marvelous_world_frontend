document.addEventListener('DOMContentLoaded', setUpPage())

// const apiPublicKey = `6fe07e820cba083ae259838117ced692`
// const apiPrivateKey = `7c03c2f6964e1445638d9a0348b9a19c334d32c6`

function setUpPage() {
    let image = document.createElement('img')
    image.className = ('logo')
    fetchCharacters()
}
document.addEventListener('click', handleEvents)

function handleEvents(e) {
    if (e.target.className === 'character-list') {
        fetchOneCharacter(e.target.dataset.id, listCharacterComics)
    } else if (e.target.className === 'comics-list') {
        fetchOneComic(e.target.dataset.id, comicCard)
    }
}

function fetchOneComic(id, callback) {
    const apiPublicKey = `6fe07e820cba083ae259838117ced692`
    const apikey = `&apikey=`
    fetch(`https://gateway.marvel.com:443/v1/public/comics/${id}?${apikey}${apiPublicKey}`)
        .then(res => res.json())
        .then(callback)
}

function fetchOneCharacter(id, callback) {
    const apiPublicKey = `6fe07e820cba083ae259838117ced692`
    const apikey = `&apikey=`
    fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?format=comic&hasDigitalIssue=true${apikey}${apiPublicKey}`)
        .then(res => res.json())
        .then(callback)

}

function listCharacterComics(comics) {
    comics.data.results.map(function(comic) {
                const size = 'standard_large'
                const imgURL = comic.thumbnail.path
                const jpg = comic.thumbnail.extension
                    // console.log(comic)
                let div = document.querySelector('.comicsscrollmenu')
                div.innerHTML = `
        <a>${comic.title}
        <br>
        <img class="comics-list" data-id=${comic.id} src="${imgURL + `/` + size + `.` + jpg}" >
        </a>
        
      `

    })

}

function fetchCharacters() {
    const apiPublicKey = `6fe07e820cba083ae259838117ced692`
    const apikey = `&apikey=`
    const charactersUrl = `https://gateway.marvel.com:443/v1/public/characters?limit=100`

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
    // console.log(character.thumbnail.extension)
    let div = document.querySelector('.scrollmenu')
    // console.log(div)
    div.innerHTML += `
    <a>${character.name}
    <br>
    <img class="character-list" data-id=${character.id} src="${imgURL + `/` + size + `.` + jpg}" >
    </a>
    
  `
        //   main.innerHTML += `<div class="card">
        //   <div class="image">
        //     <img src="${imgURL + `/` + size + `.` + jpg}">
        //   </div>
        //   <div class="content">
        //     <a class="header">${character.name}</a>
        //     <div class="meta">
        //       <span class="date">${character.modified}</span>
        //     </div>
        //     <div class="description">
        //       ${character.description}
        //     </div>
        //   </div>
        //   <div class="extra content">
        //     <a>
        //       <i class="user icon"></i>
        //       Included in ${character.stories.available} Stories
        //     </a>
        //   </div>
        //   <br>
        //   <br>
        // </div>`
    // console.log(character)

}

function comicCard(comic) {
  let one = comic.data.results[0]
  const size = 'portrait_xlarge'
  const imgURL = one.thumbnail.path
  const jpg = one.thumbnail.extension
  console.log(comic.data.results[0])
  let div = document.querySelector('.ui-card')
  let form = document.querySelector('#comment_form')
  console.log(form)
  div.innerHTML = `<div class="image">
      <img src="${imgURL + `/` + size + `.` + jpg}">
   </div>
  <div class="content">
    <a class="header">${one.title}</a>
    <div class="meta">
      <span class="date">${one.modified}</span>
    </div>
  <div class="description">
    ${one.description}
  </div>
  </div>
  <div class="extra content">
    <a>
      <i class="user icon"></i>
      ${one.characters.available} Characters
    </a>
  </div>
`
form.innerHTML += `<input id="comment_input" type="text" name="comment" placeholder="Add Comment" />
<input type="submit" value="Submit" />`
  
}