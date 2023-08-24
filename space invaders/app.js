const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0
 // code from freecodecamp tutorial 
for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}
// creates grid in the html through the js file 
const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}

draw()

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
      squares[alienInvaders[i]].classList.remove('invader')
    }
}
  

// draw shooter 
squares[currentShooterIndex].classList.add('shooter')

// move shooter in grid 

function moveShooter(e){  // moves the shooter in a line across the grid using switch 
    squares[currentShooterIndex].classList.remove('shooter')


    switch(e.keyCode){
        case 37:
            if(currentShooterIndex % width !== 0) currentShooterIndex -=1
            break
        case 39:
            if(currentShooterIndex % width <  width - 1 ) currentShooterIndex +=1
            break

    }
    squares[currentShooterIndex].classList.add('shooter')

}

document.addEventListener("keydown", moveShooter)


function moveInvaders(){ // this entire function moves the invaders side to side and downwards 
    const leftEdge = alienInvaders[0] % width === 0 
    const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1 
    remove()
    
    
    if((leftEdge && direction === -1) || (rightEdge && direction === 1 )){
        direction = width
    } else if(direction === width){
        if(leftEdge) direction = 1 
        else direction = -1  

    }


    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += width +1
          direction = -1
          goingRight = false
        }
    }
    
      if(leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += width -1
          direction = 1
          goingRight = true
        }
    }
    
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    
    draw()
    

    /*for( let i = 0 ; i <= alienInvaders.length -1 ; i++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
    for( let i = 0; i <= alienInvaders.length -1; i++){
        alienInvaders[i] += direction 
    }
    for( let i =0 ; i <= alienInvaders.length -1 ; i++){
        squares[alienInvaders[i]].classList.add('invader')
    } */

    // decide game over
    

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId) // if same index has both shooter and invader 
    }
    
      for (let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > (squares.length)) {
          resultsDisplay.innerHTML = 'GAME OVER'
          clearInterval(invadersId) //moves to the bottom
        }
    }
      if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = 'YOU WIN'
        clearInterval(invadersId) // condition of victory 
    }

} 

invadersId = setInterval(moveInvaders, 600)


function shoot(e) { // shooter function of the player 
    let laserId
    let currentLaserIndex = currentShooterIndex
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')
    
        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')
    
            setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)
    
            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultsDisplay.innerHTML = results
            console.log(aliensRemoved)
  
        }
  
    }
    switch(e.key) {
      case 'ArrowUp':
        laserId = setInterval(moveLaser, 100)
    }
}
  


document.addEventListener('keyup', shoot)




