document.addEventListener('DOMContentLoaded', setUpPage())

// const apiPublicKey = `6fe07e820cba083ae259838117ced692`
// const apiPrivateKey = `7c03c2f6964e1445638d9a0348b9a19c334d32c6`

function setUpPage() {
    let image = document.createElement('img')
    image.className = ('logo')
    fetchComics()
}
document.addEventListener('click', handleEvents)
    // document.addEventListener('submit', handleSumbitEvents)

// function handleSumbitEvents(e) {
//     e.preventDefault()
//     console.log(e.target.idName === 'comment_input')
// }



function handleEvents(e) {
    if (e.target.className === 'comics-list') {
        fetchComicCharacters(e.target.dataset.id, listComicCharacters)
    } else if (e.target.className === 'characters-list') {
        fetchOneCharacter(e.target.dataset.id, characterCard)
    }

}

// function commentForm(e) {
//     // let ul = document.querySelector('.comment-list')
//     // let li = document.createElement('li')
//     console.log(e.target)
// }

function fetchOneCharacter(id, callback) {
    // console.log(id)
    const apiPublicKey = `6fe07e820cba083ae259838117ced692`
    const apikey = `&apikey=`
    fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?${apikey}${apiPublicKey}`)
        .then(res => res.json())
        .then(callback)
}

function fetchComicCharacters(id, callback) {
    const apiPublicKey = `6fe07e820cba083ae259838117ced692`
    const apikey = `&apikey=`
    fetch(`https://gateway.marvel.com:443/v1/public/comics/${id}/characters?${apikey}${apiPublicKey}`)
        .then(res => res.json())
        .then(callback)

}

function listComicCharacters(characters) {
    characters.data.results.map(function(character) {
        const size = 'portrait_medium'
        const imgURL = character.thumbnail.path
        const jpg = character.thumbnail.extension
            // console.log(comic)
        let div = document.querySelector('.comicsscrollmenu')

        let aTag = document.createElement('a')
        aTag.innerText = character.name

        let image = document.createElement('IMG')
        image.setAttribute('class', 'characters-list')
        image.dataset.id = character.id
        image.src = imgURL + `/` + size + `.` + jpg
        let br = document.createElement('br')
        aTag.innerHTML += ''

        div.appendChild(aTag)
        aTag.appendChild(br)

        aTag.appendChild(image)

    })

}

function fetchComics() {
    const apiPublicKey = `6fe07e820cba083ae259838117ced692`
    const apikey = `&apikey=`
    const charactersUrl = `https://gateway.marvel.com:443/v1/public/comics?format=digital%20comic&formatType=comic&noVariants=true&hasDigitalIssue=true&limit=100`

    fetch(charactersUrl + apikey + apiPublicKey)
        .then(res => res.json())
        .then(data => mapComics(data))

}

function mapComics(data) {
    data.data.results.map(comic => comicsCard(comic))
}

function comicsCard(comic) {
    // console.log(comic)
    String.prototype.trunc = String.prototype.trunc ||
        function(n) {
            return (this.length > n) ? this.substr(0, n - 1) + ' ...' : this;
        }
    let comicTitle = comic.title

    const size = 'portrait_medium'
    const imgURL = comic.thumbnail.path
    const jpg = comic.thumbnail.extension
        // console.log(character.thumbnail.extension)
    let div = document.querySelector('.scrollmenu')

    let aTag = document.createElement('a')
    aTag.innerText = comicTitle.trunc(15)
        // console.log(comicTitle.trunc(20))

    let image = document.createElement('IMG')
    image.setAttribute('class', 'comics-list')
    image.dataset.id = comic.id
    image.src = imgURL + `/` + size + `.` + jpg
    let br = document.createElement('br')

    div.appendChild(aTag)
    aTag.appendChild(br)
    aTag.appendChild(image)


}

function characterCard(charact) {
    let superhero = charact.data.results[0]
    const size = 'portrait_incredible'
    const imgURL = superhero.thumbnail.path
    const jpg = superhero.thumbnail.extension
        // console.log(charact.data.results[0])
    let div = document.querySelector('.ui-card')
    div.innerHTML = `<center><div class="image">
              <img src="${imgURL + `/` + size + `.` + jpg}">
           </div>
          <div class="content">
            <h1>${superhero.name}</h1>
            <div class="meta">
              <h2 class="date">${superhero.modified}</h2>
            </div>
          <div class="description">
            ${superhero.description}
          </div>
          </div>
          <div class="extra content">
            <h2>
              ${superhero.comics.available} Comics
            </h2>
          </div>
          <div class="comments-div">
            
            <br>
          </div></center>

    `
    let formDiv = document.querySelector('.comments-div')
    // console.log(formDiv)
    let form = document.createElement('form')
    form.setAttribute('class', 'comment_form')
    let input = document.createElement('input')
    input.setAttribute('class', 'comment_input')
    input.dataset.id = superhero.id
    input.setAttribute('data-name', `${superhero.name}`)
    input.setAttribute('type', 'text')
    input.setAttribute('name', 'words')
    input.setAttribute('placeholder', 'Add Comment')
    
    let inputSubmit = document.createElement('input')
    inputSubmit.setAttribute('class', 'submit_btn')
    inputSubmit.setAttribute('type', 'submit')
    inputSubmit.setAttribute('value', 'Submit')

    form.appendChild(input)
    form.appendChild(inputSubmit)
    formDiv.appendChild(form)

    form.addEventListener('submit', handleSubmit)
    

}
function handleSubmit(e){
  e.preventDefault()
     let newComment = (e.target.querySelector('.comment_input').value)
     let characterId = (e.target.querySelector('.comment_input').dataset.id)
     let characterName = (e.target.querySelector('.comment_input').dataset.name)
      let ul = document.querySelector('.comment-list')
      let li = document.createElement('li')
      let h3 = document.createElement('h3')
      h3.innerText = newComment

      li.appendChild(h3)
      ul.appendChild(li)
      let newCharacter = {
        name: characterName
      }
      console.log(newCharacter)
      saveNewCharacter()
      function saveNewCharacter(newCharacter){
        fetch('http://localhost:3000/comics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(newCharacter)
        })
        .then(res => res.json())
        .then(saveNewComment)
      }
  // let saveComment = {
  //   content: newComment,
  //   comic_id: characterId
  // }

    function saveNewComment(charObject, newComment){
      console.log(charObject.id)
      fetch('http://localhost:3000/comments', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({content: newComment, comic_id: charObject.id})
        })
        .then(res => res.json())
        .then(console.log)
    }

  // debugger;
}