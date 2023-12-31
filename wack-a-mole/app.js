const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
let hitPosition; 
let result = 0 ; 
let currentTime = timeLeft.textContent;
// for where the mole should go in the grid in a random way 
function randomSquare(){
    square.forEach(className =>{
        className.classList.remove('mole');
    })

    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')


    hitPosition = randomPosition.id
}

// for when you click on the mole 
square.forEach(id =>{
    id.addEventListener('mouseup', () =>{
        if(id.id === hitPosition){
            result = result + 1 
            score.textContent = result
        }
    })
})
// how fast the mole should move 
function moveMole(){
    let timerID = null;
    timerID = setInterval(randomSquare, 900)
}

moveMole()
//when the game is over the final score is displayed 
function countdown(){
    currentTime--
    timeLeft.textContent = currentTime;

    if(currentTime === 0){
        clearInterval(timerID)
        
        alert('GAME OVER!! Your  final score is ' + result)
    }
}


let timerID = setInterval(countdown, 1000)

