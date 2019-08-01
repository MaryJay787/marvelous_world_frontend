document.addEventListener('DOMContentLoaded', setUpPage())

function setUpPage() {
    let image = document.createElement('img')
    image.className = ('logo')
    fetchComics()
}
document.addEventListener('click', handleEvents)

const quizBtn = document.querySelector('#quiz-btn')
const resultsContainer = document.getElementById('results')
const submitButton = document.getElementById('submit')

const myQuestions = [{
    question: "Who is the strongest?",
    answers: {
        a: "Superman",
        b: "The Terminator",
        c: "Waluigi, obviously"
    },
    correctAnswer: "c"
}, ]

quizBtn.addEventListener('click', handleQuizBtn)

function handleQuizBtn() {
    const quizContainer = document.getElementById('quiz')

    // hide & seek with the form
    let showQuiz = false

    showQuiz = !showQuiz
    if (showQuiz) {
        quizContainer.style.display = 'block'
        quizContainer.addEventListener('submit', buildQuiz())

        function buildQuiz() {
            // we'll need a place to store the HTML output
            const output = [];

            // for each question...
            myQuestions.forEach(
                (currentQuestion, questionNumber) => {

                    // we'll want to store the list of answer choices
                    const answers = [];

                    // and for each available answer...
                    for (letter in currentQuestion.answers) {
                        answers.push(
                            `<label>
                  <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
                </label>`
                        );
                    }

                    // add this question and its answers to the output
                    output.push(
                        `<div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join('')} </div>`
                    );
                }
            );
            quizContainer.innerHTML = output.join('');
            // quizContainer.innerHTML = `<button id="submit">Submit Quiz</button>`
            let submitButton = document.createElement('button')
            submitButton.setAttribute('id', "submit")
            submitButton.innerText = 'Submit Quiz'
            submitButton.addEventListener('click', showResults)


            quizContainer.appendChild(submitButton)

        }


        function showResults() {

            // gather answer containers from our quiz
            const answerContainers = quizContainer.querySelectorAll('.answers');

            // keep track of user's answers
            let numCorrect = 0;

            // for each question...
            myQuestions.forEach((currentQuestion, questionNumber) => {

                // find selected answer
                const answerContainer = answerContainers[questionNumber];
                const selector = 'input[name=question' + questionNumber + ']:checked';
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;

                // if answer is correct
                if (userAnswer === currentQuestion.correctAnswer) {
                    // add to the number of correct answers
                    numCorrect++;

                    // color the answers green
                    answerContainers[questionNumber].style.color = 'lightgreen';
                }
                // if answer is wrong or blank
                else {
                    // color the answers red
                    answerContainers[questionNumber].style.color = 'red';
                }
            });

            // show number of correct answers out of total
            resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
        }

    } else {
        quizContainer.style.display = 'none'
    }
}

function handleEvents(e) {
    if (e.target.className === 'comics-list') {
        fetchComicCharacters(e.target.dataset.id, listComicCharacters)
    } else if (e.target.className === 'characters-list') {
        fetchOneCharacter(e.target.dataset.id, characterCard)
    }

}

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
     let characterName = (e.target.querySelector('.comment_input').dataset.name)
      
      let newCharacter = {
        name: characterName
      }
      saveNewCharacter(newCharacter, newComment)
      function saveNewCharacter(newCharacter, newComment ){
        console.log(newComment)

        fetch('http://localhost:3000/comics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({comic: newCharacter})
        })
        .then(res => res.json())
        .then(res => saveNewComment(res, newComment))
      }
 
    function saveNewComment(charObject, newComment){
      console.log(newComment)
      console.log(charObject.id)
      fetch('http://localhost:3000/comments', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({comment: {content: newComment, comic_id: charObject.id}})
        })
        .then(res => res.json())
        .then(showNewComment)
    }

}

function showNewComment(commentObject){
  // let comments = []
  // comments.unshift(commentObject.content)
  // console.log(comments)
let ul = document.querySelector('.comment-list')
// comments.map(function(com){
  let li = document.createElement('li')
  li.innerText += commentObject.content
  ul.appendChild(li)
// })
}