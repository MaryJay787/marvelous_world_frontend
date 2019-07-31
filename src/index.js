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
    } else if (e.target.className === 'submit_btn') {
        e.preventDefault()
        commentForm(e)

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
            // console.log(comicTitle.trunc(20))

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
    console.log(charact.data.results[0])
    let div = document.querySelector('.ui-card')
    div.innerHTML = `<center><div class="image">
              <img src="${imgURL + `/` + size + `.` + jpg}">
           </div>
          <div class="content">
            <a class="header">${superhero.name}</a>
            <div class="meta">
              <span class="date">${superhero.modified}</span>
            </div>
          <div class="description">
            ${superhero.description}
          </div>
          </div>
          <div class="extra content">
            <a>
              <i class="user icon"></i>
              ${superhero.comics.available} Comics
            </a>
          </div>
          <div class="comments-div">
            <form class="comment_form">
              <input class="comment_input" type="text" name="comment" placeholder="Add Comment" />
              <input class="submit_btn" type="submit" value="Submit" />
            </form>
            <br>
          </div></center>

    `
}